const { ethers, upgrades } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  console.log("Deploying MorphoStrategy...");

  const MorphoStrategy = await ethers.getContractFactory("MorphoStrategy");

  const morphoStrategy = await upgrades.deployProxy(
    MorphoStrategy,
    [
      process.env.MORPHO_VAULT_ADDRESS, // Morpho Vault address
      process.env.USDC_ADDRESS, // USDC token address
      process.env.OWNER_ADDRESS, // Admin address
      process.env.OWNER_ADDRESS, // Controller address (FundContract)
    ],
    {
      kind: "uups",
      initializer: "initialize",
    }
  );

  await morphoStrategy.waitForDeployment();
  const strategyAddress = await morphoStrategy.getAddress();

  console.log("MorphoVaultStrategy deployed to:", strategyAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
