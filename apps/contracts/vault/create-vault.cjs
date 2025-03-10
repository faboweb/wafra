const { parseUnits } = require("ethers");
const { ethers } = require("hardhat");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

const abiFactory = [
  "function createMetaMorpho(address initialOwner, uint256 initialTimelock, address asset, string memory name, string memory symbol, bytes32 salt) external returns (address)",
];
const abiVault = [
  "function setFee(uint256 newFee) external",
  "function setFeeRecipient(address newFeeRecipient) external",
  "function setSupplyQueue(bytes32[] calldata newSupplyQueue) external",
  "function setCurator(address newCurator) external",
  "function setSkimRecipient(address newSkimRecipient) external",
  "function setIsAllocator(address newAllocator, bool isAllocator) external",
  "function submitGuardian(address newGuardian) external",
];

async function main() {
  console.log("Deploying Morpho Blue Vault...");

  const USDC = process.env.USDC_ADDRESS;

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  // const morphoFactory = await ethers.getContractAt(
  //   abiFactory,
  //   process.env.MORPHO_BLUE_VAULT_FACTORY,
  //   deployer
  // );

  // const tx = await morphoFactory
  //   .connect(deployer)
  //   .createMetaMorpho(
  //     deployer.address,
  //     0,
  //     USDC,
  //     "Managed Yield Vault",
  //     "MYV",
  //     ethers.randomBytes(32)
  //   );
  // const vault = await tx.wait();
  // console.log("Morpho Blue Vault created at", vault.address);

  const vault = process.env.MORPHO_VAULT_ADDRESS;

  const vaultContract = await ethers.getContractAt(abiVault, vault, deployer);

  // let tx = await vaultContract.connect(deployer).setCurator(deployer.address);
  // await tx.wait();
  // console.log("Curator set to deployer");

  // tx = await vaultContract.connect(deployer).setSkimRecipient(deployer.address);
  // await tx.wait();
  // console.log("Skim recipient set to deployer");

  // tx = await vaultContract
  //   .connect(deployer)
  //   .setIsAllocator(deployer.address, true);
  // await tx.wait();
  // console.log("Allocator set to deployer");

  // tx = await vaultContract.connect(deployer).submitGuardian(deployer.address);
  // await tx.wait();
  // console.log("Guardian submitted");

  // const tx3 = await vaultContract
  //   .connect(deployer)
  //   .setFeeRecipient(deployer.address);
  // await tx3.wait();
  // console.log("Vault fee recipient set to deployer");
  // const tx2 = await vaultContract
  //   .connect(deployer)
  //   .setFee(parseUnits("20", 18)); // 20%
  // await tx2.wait();
  // console.log("Vault fee set to 20%");
  const tx4 = await vaultContract
    .connect(deployer)
    .setSupplyQueue([
      "0x04f7605a25699d0eff9f92908d25da8702ff59596d159e8bb66eca24b021d99f",
      "0x0df0f6ca33322cff4111c2b7ff9b267a71f9b63701c3cbdbbc61d054662b1d3f",
      "0x9103c3b4e834476c9a62ea009ba2c884ee42e94e6e314a26f04d312434191836",
    ]);
  await tx4.wait();
  console.log("Supply queue set");
}

main();
