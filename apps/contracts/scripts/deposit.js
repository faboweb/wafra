const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory
  const FundContract = await ethers.getContractFactory("FundContract");
  const fundContract = FundContract.attach(process.env.FUND_CONTRACT_ADDRESS);

  const usdcAddress = process.env.USDC_ADDRESS;
  const tokenContract = await ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    usdcAddress
  );

  const amount = ethers.parseUnits("0.001", 6);
  // Approve USDC transfer
  console.log("Approving USDC transfer...");
  const approveTx = await tokenContract.approve(
    process.env.FUND_CONTRACT_ADDRESS,
    amount
  );
  await approveTx.wait();
  const allowance = await tokenContract.allowance(
    deployer.address,
    process.env.FUND_CONTRACT_ADDRESS
  );
  console.log("Allowance:", ethers.formatUnits(allowance, 6)); // Assuming USDC has 6 decimals
  // const balance = await tokenContract.balanceOf(deployer.address);
  // console.log("Deployer USDC balance:", ethers.formatUnits(balance, 6)); // Assuming USDC has 6 decimals

  console.log("USDC approved for transfer.");

  // Deposit into FundContract
  console.log("Depositing into FundContract...");

  // Simulate deposit
  console.log("Simulating deposit...");
  try {
    const result = await fundContract.deposit.staticCall(10);
    console.log("Simulation succeeded:", result);
  } catch (error) {
    if (error.data && fundContract) {
      const decodedError = fundContract.interface.parseError(error.data);
      console.log(`Transaction failed: ${decodedError?.name}`);
    } else {
      console.log(`Error in Deposit:`, error);
    }
    return;
  }

  try {
    const depositTx = await fundContract.deposit(amount);
    await depositTx.wait();
    console.log("Deposit successful.");
  } catch (err) {
    console.error("Deposit failed:", err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
