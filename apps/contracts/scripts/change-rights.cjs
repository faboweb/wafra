const { ethers, upgrades } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const fundAddress = process.env.FUND_CONTRACT_ADDRESS;

  if (!fundAddress) {
    throw new Error("Please set FUND_CONTRACT_ADDRESS environment variables.");
  }

  const TokenContract = await ethers.getContractFactory("WFRToken");
  const tokenContract = TokenContract.attach(process.env.FUND_TOKEN_ADDRESS);
  const ownerShipTx = await tokenContract.transferOwnership(fundAddress);
  await ownerShipTx.wait();

  console.log("Ownership transferred to FundContract");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
