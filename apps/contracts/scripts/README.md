Deploy in following order:

npx hardhat run scripts/deploy-token.js --network ethTestnet

# add token to .env

npx hardhat run scripts/deploy-fund.js --network ethTestnet

# add fund to .env

npx hardhat run scripts/change-rights.js --network ethTestnet
npx hardhat run scripts/deploy-strategy-aave.js --network ethTestnet

# add strategy to .env

npx hardhat run scripts/test-strategy-aave.js --network ethTestnet
npx hardhat run scripts/add-strategies.js --network ethTestnet
npx hardhat run scripts/test-deposit.js --network ethTestnet
