const { ethers } = require("hardhat");

async function main(args) {
  // get strat name from args
  const stratName = args[2];
  const args = args.slice(3);

  // Compile the contracts
  await hre.run("compile");

  // Get the contract factory
  const Strategy = await ethers.getContractFactory(stratName);

  // Deploy the contract
  const strategyContract = await upgrades.deployProxy(Strategy, [...args], {
    initializer: "initialize",
  });

  // Wait for the deployment to be mined
  await strategyContract.deployed();

  console.log("Strategy", stratName, "deployed to:", strategyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
