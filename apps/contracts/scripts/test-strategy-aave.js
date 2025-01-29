const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  const aaveStrategy = await ethers.getContractAt(
    "AaveStrategy",
    process.env.AAVE_STRATEGY_ADDRESS
  );

  const usdcContract = await ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    process.env.USDC_ADDRESS
  );

  const amount = ethers.parseUnits("0.001", 6);

  console.log("Approving USDC transfer...");
  let approveTx = await usdcContract.approve(
    process.env.AAVE_POOL_CONTRACT,
    amount
  );
  await approveTx.wait();

  const aavePool = await ethers.getContractAt(
    "IPool",
    process.env.AAVE_POOL_CONTRACT
  );

  console.log("Simulating Aave deposit...");
  const tx = await aavePool.deposit.staticCall(
    process.env.USDC_ADDRESS,
    amount,
    deployer.address,
    0
  );
  await tx.wait();

  // Make sure the deployer can deposit
  // const ControllerRole = ethers.keccak256(
  //   ethers.toUtf8Bytes("CONTROLLER_ROLE")
  // );
  // aaveStrategy.grantRole(ControllerRole, deployer.address);

  console.log("Approving USDC transfer...");
  approveTx = await usdcContract.approve(
    process.env.AAVE_STRATEGY_ADDRESS,
    amount
  );
  await approveTx.wait();

  // Simulate deposit
  console.log("Simulating deposit...");
  try {
    const result = await aaveStrategy.deposit.staticCall(amount, {
      gasLimit: 500000,
    });
    console.log("Simulation succeeded:", result);
  } catch (error) {
    if (error.data && aaveStrategy) {
      const decodedError = aaveStrategy.interface.parseError(error.data);
      console.log(`Transaction failed: ${decodedError?.name}`);
    } else {
      console.log(`Error in Deposit:`, error);
    }
    return;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
