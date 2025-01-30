const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const AaveStrategy = await ethers.getContractFactory("AaveStrategy");
  const aaveStrategy = AaveStrategy.attach(process.env.AAVE_STRATEGY_ADDRESS);

  const adminRoleHash = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));
  const controllerRoleHash = ethers.keccak256(
    ethers.toUtf8Bytes("CONTROLLER_ROLE")
  );
  console.log(
    "Deployer is Admin",
    await aaveStrategy.hasRole(adminRoleHash, deployer.address)
  );
  let tx = await aaveStrategy.grantRole(
    controllerRoleHash,
    process.env.FUND_CONTRACT_ADDRESS
  );
  await tx.wait();
  console.log(
    "Fund is Controller",
    await aaveStrategy.hasRole(
      controllerRoleHash,
      process.env.FUND_CONTRACT_ADDRESS
    )
  );

  // Get the contract factory
  const FundContract = await ethers.getContractFactory("FundContract");
  const fundContract = FundContract.attach(process.env.FUND_CONTRACT_ADDRESS);

  tx = await fundContract.addStrategy(process.env.AAVE_STRATEGY_ADDRESS, 1);
  await tx.wait();

  console.log("AAVE strategy added");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
