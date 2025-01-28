const { ethers, upgrades } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy contract using the UUPS proxy pattern
  const TokenContract = await ethers.getContractFactory("WFRToken");
  const tokenContract = await upgrades.deployProxy(
    TokenContract,
    [deployer.address], // Pass the initialOwner as a parameter
    {
      initializer: "initialize",
    }
  );

  console.log("TokenContract deployed to (proxy):", tokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
