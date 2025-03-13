require("@nomicfoundation/hardhat-verify"); // Optional for contract verification
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config({ path: `.env` });
require("dotenv").config({
  path: `.env.${process.env.HARDHAT_NETWORK}`,
  override: true,
});

const { PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

module.exports = {
  // solidity: "0.8.28",
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 77,
          },
        },
      },
    ],
  },
  // Add this section
  dependencies: {
    "@openzeppelin/contracts": "^5.0.0",
    "@openzeppelin/contracts-upgradeable": "^5.0.0",
    "@morpho-org/morpho-blue": "^1.0.0",
  },
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [PRIVATE_KEY], // Use PRIVATE_KEY from environment variables
    },
    baseTestnet: {
      url: "https://virtual.base.rpc.tenderly.co/7a007786-d93d-4956-b914-57b51344a612",
      accounts: [PRIVATE_KEY], // Use PRIVATE_KEY from environment variables
    },
    ethTestnet: {
      url: "https://1rpc.io/sepolia",
      accounts: [PRIVATE_KEY], // Use PRIVATE_KEY from environment variables
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || "", // Use ETHERSCAN_API_KEY from environment variables
  },
};
