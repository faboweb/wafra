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

  // Simulate deploy
  console.log("Simulating deploy...");
  try {
    const result = await fundContract.deployCapital.staticCall();
    console.log("Simulation succeeded:", result);
  } catch (error) {
    if (error.data && fundContract) {
      const decodedError = fundContract.interface.parseError(error.data);
      console.log(`Transaction failed: ${decodedError?.name}`);
    } else {
      console.log(`Error in Deploy:`, error);
    }
    return;
  }

  console.log("Executing deposit...");
  try {
    const depositTx = await fundContract.deployCapital();
    await depositTx.wait();
    console.log("Deploy successful.");
  } catch (err) {
    console.error("Deploy failed:", err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
