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
  const Strategy = await ethers.getContractFactory("AaveStrategy");

  // Deploy the contract
  const strategyContract = await upgrades.deployProxy(
    Strategy,
    [
      process.env.AAVE_POOL_CONTRACT,
      process.env.AAVE_USDC_CONTRACT,
      process.env.USDC_ADDRESS,
      deployer.address,
      process.env.FUND_TOKEN_ADDRESS,
    ],
    {
      initializer: "initialize",
    }
  );

  console.log("Strategy AaveStrategy deployed to:", strategyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
