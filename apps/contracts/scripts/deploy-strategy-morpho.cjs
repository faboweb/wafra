const { ethers, upgrades } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  console.log("Deploying Morpho Strategy...");

  const MorphoStrategy = await ethers.getContractFactory("MorphoStrategy");

  const morphoStrategy = await upgrades.deployProxy(
    MorphoStrategy,
    [
      process.env.MORPHO_BLUE_ADDRESS, // Morpho Blue address
      process.env.MARKET_ID, // Market ID for USDC market
      process.env.USDC_ADDRESS, // USDC token address
      process.env.ADMIN_ADDRESS, // Admin address
      process.env.CONTROLLER_ADDRESS, // Controller address (FundContract)
    ],
    {
      kind: "uups",
      initializer: "initialize",
    }
  );

  await morphoStrategy.waitForDeployment();
  const strategyAddress = await morphoStrategy.getAddress();

  console.log("MorphoStrategy deployed to:", strategyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
