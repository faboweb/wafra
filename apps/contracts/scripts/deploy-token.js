const { ethers, upgrades } = require("hardhat");

async function main() {
  // Validate environment variables
  const ownerAddress = process.env.OWNER_ADDRESS;

  if (!ownerAddress) {
    throw new Error("Please set OWNER_ADDRESS environment variable.");
  }

  // Deploy contract using the UUPS proxy pattern
  const TokenContract = await ethers.getContractFactory("WFRToken");
  const tokenContract = await upgrades.deployProxy(
    TokenContract,
    [ownerAddress],
    {
      initializer: "initialize",
    }
  );

  await tokenContract.deployed();

  console.log("TokenContract deployed to (proxy):", tokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
