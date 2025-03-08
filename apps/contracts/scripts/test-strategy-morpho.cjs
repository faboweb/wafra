import { ethers } from "hardhat";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import {
  impersonateAccount,
  setBalance,
} from "@nomicfoundation/hardhat-network-helpers";

// Mainnet addresses
const MORPHO_BLUE = process.env.MORPHO_BLUE;
const USDC = process.env.USDC_CONTRACT_ADDRESS;
const USDC_WHALE = process.env.USDC_WHALE;
const MARKET_ID = process.env.MORPHO_MARKET_ID;

async function main() {
  console.log("\n🏃‍♂️ Starting Morpho Strategy Test...\n");

  // Get signers
  const [deployer] = await ethers.getSigners();
  console.log("Testing with deployer:", deployer.address);

  // Deploy strategy
  console.log("\n📝 Deploying MorphoStrategy...");
  const MorphoStrategy = await ethers.getContractFactory("MorphoStrategy");
  const strategy = await upgrades.deployProxy(
    MorphoStrategy,
    [
      MORPHO_BLUE,
      MARKET_ID,
      USDC,
      deployer.address, // admin
      deployer.address, // controller (for testing)
    ],
    {
      kind: "uups",
      initializer: "initialize",
    }
  );
  await strategy.waitForDeployment();
  console.log("Strategy deployed to:", await strategy.getAddress());

  // Setup USDC interface
  const usdc = await ethers.getContractAt("IERC20", USDC);

  // Impersonate USDC whale
  await impersonateAccount(USDC_WHALE);
  const whale = await ethers.getSigner(USDC_WHALE);
  await setBalance(USDC_WHALE, parseUnits("10", "ether")); // Give some ETH for gas

  // Get initial balances
  const initialWhaleBalance = await usdc.balanceOf(USDC_WHALE);
  console.log(
    "\n📊 Initial USDC Whale balance:",
    formatUnits(initialWhaleBalance, 6)
  );

  try {
    // Test deposit
    console.log("\n🏦 Testing deposit...");
    const depositAmount = parseUnits("10000", 6); // 10,000 USDC

    // Approve and deposit
    await usdc.connect(whale).approve(strategy.address, depositAmount);
    console.log("Approved USDC transfer");

    await strategy.connect(deployer).deposit(depositAmount);
    console.log("Deposited", formatUnits(depositAmount, 6), "USDC");

    // Check strategy value
    const valueAfterDeposit = await strategy.totalValue();
    console.log(
      "Strategy value after deposit:",
      formatUnits(valueAfterDeposit, 6),
      "USDC"
    );

    // Wait for some blocks to accrue interest
    console.log("\n⏳ Waiting for 100 blocks to accrue interest...");
    for (let i = 0; i < 100; i++) {
      await ethers.provider.send("evm_mine", []);
    }

    // Check new value
    const valueAfterWait = await strategy.totalValue();
    console.log(
      "Strategy value after waiting:",
      formatUnits(valueAfterWait, 6),
      "USDC"
    );
    console.log(
      "Interest earned:",
      formatUnits(valueAfterWait.sub(valueAfterDeposit), 6),
      "USDC"
    );

    // Test withdrawal
    console.log("\n💰 Testing withdrawal...");
    const withdrawAmount = valueAfterWait;
    const receiver = deployer.address;

    await strategy.connect(deployer).withdraw(withdrawAmount, receiver);
    console.log(
      "Withdrawn",
      formatUnits(withdrawAmount, 6),
      "USDC to",
      receiver
    );

    // Final balance check
    const finalBalance = await usdc.balanceOf(receiver);
    console.log(
      "\n📊 Final receiver balance:",
      formatUnits(finalBalance, 6),
      "USDC"
    );

    // Strategy should be empty
    const finalValue = await strategy.totalValue();
    console.log("Final strategy value:", formatUnits(finalValue, 6), "USDC");
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  }

  console.log("\n✅ Test completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
