const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const fundContract = await ethers.getContractAt(
    "FundContract",
    process.env.FUND_CONTRACT_ADDRESS
  );

  console.log("Strategies:", await fundContract.getStrategies());

  console.log("Deploying capital...");
  let tx = await fundContract.deployCapital();
  console.log("Deploy succeeded:", await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
