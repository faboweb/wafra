const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const wfrToken = await ethers.getContractAt(
    "WFRToken",
    process.env.FUND_TOKEN_ADDRESS
  );
  const fundContract = await ethers.getContractAt(
    "FundContract",
    process.env.FUND_CONTRACT_ADDRESS
  );
  const usdcContract = await ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    process.env.USDC_ADDRESS
  );

  if ((await wfrToken.owner()) !== process.env.FUND_CONTRACT_ADDRESS) {
    throw new Error("Fund needs to own Token");
  }

  const amount = ethers.parseUnits("0.001", 6);
  // Approve USDC transfer
  console.log("Approving USDC transfer...");
  let tx = await usdcContract.approve(
    process.env.FUND_CONTRACT_ADDRESS,
    amount
  );
  console.log("USDC approved for transfer.", await tx.wait());

  console.log("Deposit...");
  tx = await fundContract.deposit(amount, "");
  console.log("Deposit succeeded:", await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
