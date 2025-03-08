import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MorphoStrategy, IERC20 } from "../typechain-types";

describe("MorphoStrategy", function () {
  async function deployFixture() {
    const [admin, controller, user] = await ethers.getSigners();

    // Get the Morpho Blue addresses from forked network
    const MORPHO_BLUE = process.env.MORPHO_BLUE_ADDRESS;
    const MARKET_ID = process.env.MORPHO_MARKET_ID;
    const USDC = process.env.USDC_CONTRACT_ADDRESS;

    const MorphoStrategy = await ethers.getContractFactory("MorphoStrategy");
    const strategy = await upgrades.deployProxy(
      MorphoStrategy,
      [MORPHO_BLUE, MARKET_ID, USDC, admin.address, controller.address],
      { kind: "uups", initializer: "initialize" }
    );

    const usdc = await ethers.getContractAt("IERC20", USDC);

    return { strategy, usdc, admin, controller, user };
  }

  describe("Initialization", function () {
    it("Should set the correct initial values", async function () {
      const { strategy, admin, controller } = await loadFixture(deployFixture);

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
    it("Should deposit USDC into Morpho Blue", async function () {
      const { strategy, usdc, controller, user } = await loadFixture(
        deployFixture
      );
      const amount = ethers.utils.parseUnits("1000", 6); // 1000 USDC

      // Fund the user with USDC (using hardhat_setBalance or similar)
      // Approve strategy to spend user's USDC
      await usdc.connect(user).approve(strategy.address, amount);

      const beforeBalance = await strategy.totalValue();
      await strategy.connect(controller).deposit(amount);
      const afterBalance = await strategy.totalValue();

      expect(afterBalance.sub(beforeBalance)).to.equal(amount);
    });
  });

  describe("Withdrawals", function () {
    it("Should withdraw USDC from Morpho Blue", async function () {
      const { strategy, usdc, controller, user } = await loadFixture(
        deployFixture
      );
      const amount = ethers.utils.parseUnits("1000", 6);

      // First deposit
      await usdc.connect(user).approve(strategy.address, amount);
      await strategy.connect(controller).deposit(amount);

      const beforeBalance = await usdc.balanceOf(user.address);
      await strategy.connect(controller).withdraw(amount, user.address);
      const afterBalance = await usdc.balanceOf(user.address);

      expect(afterBalance.sub(beforeBalance)).to.equal(amount);
    });
  });

  describe("Access Control", function () {
    it("Should prevent non-controller from depositing", async function () {
      const { strategy, user } = await loadFixture(deployFixture);
      await expect(strategy.connect(user).deposit(100)).to.be.revertedWith(
        "AccessControl:"
      );
    });
  });
});
