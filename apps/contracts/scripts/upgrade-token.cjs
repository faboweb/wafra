const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  // Deploy contract using the UUPS proxy pattern
  const TokenContract = await ethers.getContractFactory("WFRToken");
  const tokenContract = await TokenContract.deploy();
  await tokenContract.waitForDeployment();
  const newImplementationAddress = await tokenContract.getAddress();
  console.log("New TokenContract implementation:", newImplementationAddress);

  const fundContract = await ethers.getContractAt(
    "FundContract",
    process.env.FUND_CONTRACT_ADDRESS
  );
  const tx = await fundContract.upgradeToken(newImplementationAddress);

  console.log("TokenContract upgraded:", await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
