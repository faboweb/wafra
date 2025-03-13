const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  const morphoStrategy = await ethers.getContractAt(
    "MorphoStrategy",
    process.env.MORPHO_STRATEGY_ADDRESS
  );

  const usdcContract = await ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    process.env.USDC_ADDRESS
  );

  const amount = ethers.parseUnits("0.001", 6);

  // console.log("Approving USDC transfer...");
  // let tx = await usdcContract.approve(
  //   process.env.MORPHO_STRATEGY_ADDRESS,
  //   amount
  // );
  // await tx.wait();

  console.log("Vault address:", await morphoStrategy.vault());
  // console.log("Deposit...");
  // tx = await morphoStrategy.deposit(amount);
  // console.log("Succeeded:", await tx.wait());

  console.log("Total value:", await morphoStrategy.totalValue());

  console.log("Withdraw...");
  tx = await morphoStrategy.withdraw(amount, deployer.address);
  console.log("Succeeded:", await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
