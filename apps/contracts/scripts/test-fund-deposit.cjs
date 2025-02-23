const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Depositing to contracts with the account:", deployer.address);

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

  // if ((await wfrToken.owner()) !== process.env.FUND_CONTRACT_ADDRESS) {
  //   throw new Error("Fund needs to own Token");
  // }

  // const amount = ethers.parseUnits("0.001", 6);
  // // Approve USDC transfer
  // console.log("Approving USDC transfer...");
  // let tx = await usdcContract.approve(
  //   process.env.FUND_CONTRACT_ADDRESS,
  //   amount
  // );
  // console.log("USDC approved for transfer.", await tx.wait());

  // console.log("Deposit...");
  // tx = await fundContract.deposit(110);
  // console.log("Deposit succeeded:", await tx.wait());

  // console.log("Deploy...");
  // tx = await fundContract.deployCapital();
  // console.log("Deploy succeeded:", await tx.wait());

  const balance = await fundContract.balanceOf(deployer.address);
  console.log("Balance:", balance);

  if (balance == 0) {
    throw new Error("Balance is 0");
  }

  const wfrBalance = await wfrToken.balanceOf(deployer.address);
  console.log("WFR Balance:", wfrBalance);

  console.log("Redeem...");
  tx = await fundContract.requestRedemption(wfrBalance);
  console.log("Redeemtion Request succeeded:", await tx.wait());

  console.log("Redeem Queue...");
  // console.log("Queue", await fundContract.redemptionQueue())
  tx = await fundContract.processRedemptionsBatch(0, 1);
  console.log("Redeemtion Queue processed:", await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
