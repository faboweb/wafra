import { ethers, upgrades } from "hardhat";

async function main() {
  console.log("Upgrading MorphoStrategy...");

  const MorphoStrategyV2 = await ethers.getContractFactory("MorphoStrategy");
  const upgraded = await upgrades.upgradeProxy(
    process.env.MORPHO_STRATEGY_ADDRESS,
    MorphoStrategyV2
  );

  await upgraded.waitForDeployment();
  console.log("MorphoStrategy upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
