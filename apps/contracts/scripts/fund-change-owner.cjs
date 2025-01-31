const { ethers, upgrades } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer", deployer.address);

  const fundContract = await ethers.getContractAt(
    "FundContract",
    process.env.FUND_CONTRACT_ADDRESS
  );
  const ownerShipTx = await fundContract.transferOwnership(
    process.env.OWNER_ADDRESS
  );
  await ownerShipTx.wait();

  console.log("Ownership transferred to ", process.env.OWNER_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Ownership change failed:", error);
    process.exit(1);
  });
