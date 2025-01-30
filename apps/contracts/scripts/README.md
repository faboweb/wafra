Deploy in following order:

npx hardhat run scripts/deploy-token.cjs --network base

# add token to .env

npx hardhat run scripts/deploy-fund.cjs --network base

# add fund to .env

npx hardhat run scripts/change-rights.cjs --network base
npx hardhat run scripts/deploy-strategy-aave.cjs --network base

# add strategy to .env

npx hardhat run scripts/test-strategy-aave.cjs --network base
npx hardhat run scripts/add-strategies.cjs --network base
npx hardhat run scripts/test-fund-deposit.cjs --network base
