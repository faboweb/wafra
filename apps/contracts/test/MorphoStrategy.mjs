import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("MorphoVaultStrategy", function () {
  async function deployFixture() {
    const [admin, controller, user] = await ethers.getSigners();

    // Mock USDC and Vault tokens
    const MockToken = await ethers.getContractFactory("MockERC20");
    const usdc = await MockToken.deploy("USDC", "USDC", 6);
    const vaultShares = await MockToken.deploy(
      "Morpho Vault Shares",
      "mvUSDC",
      18
    );

    // Mock Morpho Vault
    const MockMorphoVault = await ethers.getContractFactory("MockMorphoVault");
    const mockVault = await MockMorphoVault.deploy(
      await usdc.getAddress(),
      await vaultShares.getAddress()
    );

    // Deploy strategy
    const MorphoVaultStrategy = await ethers.getContractFactory(
      "MorphoVaultStrategy"
    );
    const strategy = await upgrades.deployProxy(
      MorphoVaultStrategy,
      [
        await mockVault.getAddress(),
        await usdc.getAddress(),
        admin.address,
        controller.address,
      ],
      { kind: "uups", initializer: "initialize" }
    );

    // Fund the user with some USDC
    await usdc.mint(user.address, ethers.parseUnits("10000", 6));

    return {
      strategy,
      mockVault,
      usdc,
      vaultShares,
      admin,
      controller,
      user,
    };
  }

  describe("Initialization", function () {
    it("Should set the correct initial values", async function () {
      const { strategy, usdc, mockVault, admin, controller } =
        await loadFixture(deployFixture);

      expect(await strategy.usdc()).to.equal(await usdc.getAddress());
      expect(await strategy.vault()).to.equal(await mockVault.getAddress());
      expect(await strategy.hasRole(await strategy.ADMIN_ROLE(), admin.address))
        .to.be.true;
      expect(
        await strategy.hasRole(
          await strategy.CONTROLLER_ROLE(),
          controller.address
        )
      ).to.be.true;
    });
  });

  describe("Deposits", function () {
    it("Should deposit USDC and receive vault shares", async function () {
      const { strategy, usdc, controller, user } = await loadFixture(
        deployFixture
      );

      const depositAmount = ethers.parseUnits("1000", 6);
      await usdc.connect(user).approve(strategy.address, depositAmount);

      const beforeShares = await mockVault.balanceOf(strategy.address);
      await strategy.connect(controller).deposit(depositAmount);
      const afterShares = await mockVault.balanceOf(strategy.address);

      expect(afterShares).to.be.gt(beforeShares);
    });

    it("Should respect max deposit limit", async function () {
      const { strategy, usdc, controller, user } = await loadFixture(
        deployFixture
      );
      const maxDeposit = await strategy.vault().maxDeposit(strategy.address);
      const tooMuch = maxDeposit.add(1);

      await usdc.connect(user).approve(strategy.address, tooMuch);
      await expect(
        strategy.connect(controller).deposit(tooMuch)
      ).to.be.revertedWith("Deposit exceeds limit");
    });
  });

  describe("Withdrawals", function () {
    it("Should withdraw USDC correctly", async function () {
      const { strategy, usdc, controller, user } = await loadFixture(
        deployFixture
      );

      // First deposit
      const depositAmount = ethers.parseUnits("1000", 6);
      await usdc.connect(user).approve(strategy.address, depositAmount);
      await strategy.connect(controller).deposit(depositAmount);

      // Then withdraw
      const beforeBalance = await usdc.balanceOf(user.address);
      await strategy.connect(controller).withdraw(depositAmount, user.address);
      const afterBalance = await usdc.balanceOf(user.address);

      expect(afterBalance.sub(beforeBalance)).to.equal(depositAmount);
    });

    it("Should respect max withdraw limit", async function () {
      const { strategy, controller, user } = await loadFixture(deployFixture);
      const maxWithdraw = await strategy.vault().maxWithdraw(strategy.address);
      const tooMuch = maxWithdraw.add(1);

      await expect(
        strategy.connect(controller).withdraw(tooMuch, user.address)
      ).to.be.revertedWith("Withdraw exceeds limit");
    });
  });

  describe("Emergency Functions", function () {
    it("Should allow admin to emergency withdraw", async function () {
      const { strategy, usdc, mockVault, controller, admin, user } =
        await loadFixture(deployFixture);

      // First deposit
      const depositAmount = ethers.parseUnits("1000", 6);
      await usdc.connect(user).approve(strategy.address, depositAmount);
      await strategy.connect(controller).deposit(depositAmount);

      // Emergency withdraw
      await strategy.connect(admin).emergencyWithdraw();

      expect(await usdc.balanceOf(strategy.address)).to.equal(0);
      expect(await mockVault.balanceOf(strategy.address)).to.equal(0);
    });

    it("Should prevent non-admin from emergency withdraw", async function () {
      const { strategy, user } = await loadFixture(deployFixture);
      await expect(
        strategy.connect(user).emergencyWithdraw()
      ).to.be.revertedWith("AccessControl:");
    });
  });

  describe("Value Tracking", function () {
    it("Should correctly report total value", async function () {
      const { strategy, usdc, controller, user } = await loadFixture(
        deployFixture
      );

      const depositAmount = ethers.parseUnits("1000", 6);
      await usdc.connect(user).approve(strategy.address, depositAmount);
      await strategy.connect(controller).deposit(depositAmount);

      const totalValue = await strategy.totalValue();
      expect(totalValue).to.be.gte(depositAmount);
    });
  });
});
