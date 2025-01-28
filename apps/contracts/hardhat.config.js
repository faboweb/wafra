require("@nomicfoundation/hardhat-verify"); // Optional for contract verification
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config(); // Load environment variables from .env file

const { PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

module.exports = {
  solidity: "0.8.28",
  networks: {
    base: {
      url: "https://mainnet.base.org", // Base mainnet RPC URL
      accounts: [PRIVATE_KEY], // Use PRIVATE_KEY from environment variables
    },
    baseTestnet: {
      url: "https://sepolia.base.org", // Base Goerli testnet RPC URL
      accounts: [PRIVATE_KEY], // Use PRIVATE_KEY from environment variables
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || "", // Use ETHERSCAN_API_KEY from environment variables
  },
};
