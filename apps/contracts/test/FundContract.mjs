import { expect } from "chai";
import hre from "hardhat";
const ethers = hre.ethers;

describe("FundContract - processRedemptionsBatch", function () {
  let deployer,
    user1,
    user2,
    treasury,
    fundContract,
    usdc,
    wfrToken,
    strategy,
    strategy2;
  const initialDeposit = ethers.parseUnits("1000", 6); // 1000 USDC
  const redemptionAmount1 = ethers.parseUnits("200", 6); // 200 USDC
  const redemptionAmount2 = ethers.parseUnits("300", 6); // 300 USDC
  const protocolFee = 10; // 10% fee

  beforeEach(async function () {
    [deployer, user1, user2, treasury] = await ethers.getSigners();

    // Deploy mock USDC token
    const USDC = await ethers.getContractFactory("MockERC20");
    usdc = await USDC.deploy("USD Coin", "USDC", 6);
    await usdc.waitForDeployment();

    // Deploy mock WFR token
    const WFRToken = await ethers.getContractFactory("MockWFRToken");
    wfrToken = await WFRToken.deploy();
    await wfrToken.waitForDeployment();

    // Deploy mock strategy
    const MockStrategy = await ethers.getContractFactory("MockStrategy");
    strategy = await MockStrategy.deploy(usdc.target);
    await strategy.waitForDeployment();
    strategy2 = await MockStrategy.deploy(usdc.target);
    await strategy2.waitForDeployment();

    // Deploy the FundContract
    const FundContract = await ethers.getContractFactory("FundContract");
    fundContract = await FundContract.deploy();
    await fundContract.waitForDeployment();

    // Initialize the contract
    await fundContract.initialize(usdc.target, wfrToken.target);
    await fundContract.setTreasuryManager(deployer.address);
    await fundContract.updateTreasury(treasury.address);
    await fundContract.addStrategy(strategy.target, 10);
    await fundContract.addStrategy(strategy2.target, 5);
    await fundContract.setWhitelist(deployer.address, true);

    // Mint and approve USDC to users
    await usdc.mint(user1.address, initialDeposit);
    await usdc.mint(user2.address, initialDeposit);
    await usdc.connect(user1).approve(fundContract.target, initialDeposit);
    await usdc.connect(user2).approve(fundContract.target, initialDeposit);

    // Users deposit into the fund
    await fundContract.connect(user1).deposit(initialDeposit, "");
    await fundContract.connect(user2).deposit(initialDeposit, "");

    // Verify fund balance
    expect(await usdc.balanceOf(fundContract.target)).to.equal(
      initialDeposit * BigInt(2)
    );
    expect(await wfrToken.totalSupply()).to.equal(initialDeposit * BigInt(2));

    // Users request redemptions
    await wfrToken
      .connect(user1)
      .approve(fundContract.target, redemptionAmount1);
    await fundContract.connect(user1).requestRedemption(redemptionAmount1);
    await wfrToken
      .connect(user2)
      .approve(fundContract.target, redemptionAmount2);
    await fundContract.connect(user2).requestRedemption(redemptionAmount2);
  });

  it("should collect protocol fees correctly", async function () {
    const totalSupplyBefore = await wfrToken.totalSupply();
    // increase value of strategy
    usdc
      .connect(deployer)
      .approve(strategy.target, ethers.parseUnits("100", 6));
    await strategy.deposit(ethers.parseUnits("100", 6));

    // Process redemptions
    await fundContract.collectProtocolFees();

    // Check if protocol fees were collected
    const treasuryBalance = await wfrToken.balanceOf(treasury.address);
    expect(treasuryBalance).to.be.gt(0);

    // the funds value shouldn't change
    const totalFundValue = await fundContract.currentFundValue();
    expect(totalFundValue).to.equal(
      initialDeposit * BigInt(2) + ethers.parseUnits("100", 6)
    );

    // the total supply of the token should increase
    const totalSupplyAfter = await wfrToken.totalSupply();
    expect(totalSupplyAfter).to.be.gt(totalSupplyBefore);
  });

  it("should process redemptions and update balances correctly", async function () {
    // Initial state check
    const totalFundValueBefore = await fundContract.currentFundValue();
    const user1BalanceBefore = await usdc.balanceOf(user1.address);
    const user2BalanceBefore = await usdc.balanceOf(user2.address);
    const totalSupplyBefore = await wfrToken.totalSupply();

    // Process redemptions
    await fundContract.processRedemptionsBatch(0, 2);

    // Check fund value updates
    const totalFundValueAfter = await fundContract.currentFundValue();
    expect(totalFundValueAfter).to.be.lessThan(totalFundValueBefore);

    // Check user balances
    const user1BalanceAfter = await usdc.balanceOf(user1.address);
    const user2BalanceAfter = await usdc.balanceOf(user2.address);

    expect(user1BalanceAfter).to.equal(user1BalanceBefore + redemptionAmount1);
    expect(user2BalanceAfter).to.equal(user2BalanceBefore + redemptionAmount2);

    // Ensure WFR tokens were burned
    const totalSupplyAfter = await wfrToken.totalSupply();
    expect(totalSupplyAfter).to.be.lessThan(totalSupplyBefore);
  });

  it("should revert if start index is out of range", async function () {
    try {
      await fundContract.processRedemptionsBatch(5, 2);
    } catch (err) {
      expect(err.message).to.include("Start out of range");
    }
  });

  it("should deploy the capital to strategies according to weights", async function () {
    await fundContract.deployCapital();

    // Check if capital was deployed to strategies
    const strategyBalance = await usdc.balanceOf(strategy.target);
    expect(strategyBalance).to.be.equal(
      BigInt(Math.floor(((200 * 2) / 3) * 10e6))
    );
    const strategy2Balance = await usdc.balanceOf(strategy2.target);
    expect(strategy2Balance).to.be.equal(
      BigInt(Math.floor(((200 * 1) / 3) * 10e6))
    );

    // Check if the fund value stays the same
    const totalFundValue = await fundContract.currentFundValue();
    expect(totalFundValue).to.equal(initialDeposit * BigInt(2));

    // Check if wfr stays the same
    expect(await wfrToken.totalSupply()).to.equal(initialDeposit * BigInt(2));
  });

  it("should withdraw from strategies on redemption", async function () {
    // Deploy the capital to strategies
    await fundContract.deployCapital();

    const totalRedemptionAmount = redemptionAmount1 + redemptionAmount2;

    // Process redemptions
    await fundContract.processRedemptionsBatch(0, 2);

    // Check if capital was withdrawn from strategies
    const strategyBalance = await usdc.balanceOf(strategy.target);
    expect(strategyBalance).to.be.equal(
      BigInt(Math.floor(((200 * 2) / 3) * 10e6)) -
        (totalRedemptionAmount * BigInt(2)) / BigInt(3)
    );
    const strategy2Balance = await usdc.balanceOf(strategy2.target);
    expect(strategy2Balance).to.be.equal(
      BigInt(Math.floor(((200 * 1) / 3) * 10e6)) -
        (totalRedemptionAmount * BigInt(1)) / BigInt(3)
    );

    // Check if wfr stays the same
    expect(await wfrToken.totalSupply()).to.equal(BigInt(150 * 10e6));
  });

  it("should handle weights not giving enough per strat to withdraw", async function () {
    // Deploy the capital to strategies
    await fundContract.deployCapital();
    expect(await fundContract.currentFundValue()).to.equal(
      initialDeposit * BigInt(2)
    );

    // Decrease the value of strategy
    await strategy2.withdraw(ethers.parseUnits("650", 6), deployer.address);
    expect(await fundContract.currentFundValue()).to.equal(
      ethers.parseUnits("1350", 6)
    );

    // The value of the fund decreased with wfr supply staying the same
    const newWfrValue = (2000 - 650) / 2000;

    // Process redemptions
    await fundContract.processRedemptionsBatch(0, 2);
    expect(await fundContract.currentFundValue()).to.equal(
      // no performance fee here
      ethers.parseUnits(String(1350 - 500 * newWfrValue), 6)
    );

    // Check if capital was withdrawn from strategies
    const strategyBalance = await usdc.balanceOf(strategy.target);
    expect(strategyBalance).to.be.equal(
      // only capital left and should be full fund value
      ethers.parseUnits(String(1350 - 500 * newWfrValue), 6)
    );
    const strategy2Balance = await usdc.balanceOf(strategy2.target);
    expect(strategy2Balance).to.be.equal(BigInt(0));
  });

  it("should rebalance the strategies", async function () {
    // Deploy the capital to strategies
    await fundContract.deployCapital();

    // Increase value of strategy
    await usdc
      .connect(deployer)
      .approve(strategy.target, ethers.parseUnits("100", 6));
    await strategy.deposit(ethers.parseUnits("100", 6));
    let strategyBalance = await usdc.balanceOf(strategy.target);
    expect(strategyBalance).to.be.gt(
      (ethers.parseUnits("2100", 6) * BigInt(2)) / BigInt(3)
    );

    // Rebalance the strategies
    await fundContract.deployCapital();

    // Check if capital was deployed to strategies
    strategyBalance = await usdc.balanceOf(strategy.target);
    expect(strategyBalance).to.be.equal(
      (ethers.parseUnits("2100", 6) * BigInt(2)) / BigInt(3)
    );
    const strategy2Balance = await usdc.balanceOf(strategy2.target);
    expect(strategy2Balance).to.be.equal(
      (ethers.parseUnits("2100", 6) * BigInt(1)) / BigInt(3)
    );

    // Check if the fund value stays the same
    const totalFundValue = await fundContract.currentFundValue();
    expect(totalFundValue).to.equal(ethers.parseUnits("2100", 6));

    // Check if wfr stays the same
    expect(await wfrToken.totalSupply()).to.equal(initialDeposit * BigInt(2));
  });
});
