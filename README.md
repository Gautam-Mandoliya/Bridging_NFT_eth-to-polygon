# Bridging_NFT_eth-to-polygon
## Description
In this project, an NFT collection is to be deployed on the goerli network, Map the collection to Polygon, and Transfer assets to mumbai network using Polygon Bridge.
```
TOOLS USED:
  1. Harhdat - For Deployment.
  2. Midjourney - For generating NFT using prompt.
  3. Pinata - For storing NFT on cloud
  4. Zk-bridge - For transfering NFT (Goerli-->Polygon)
```
#Executing program
1. npm install
2. Compile the contracts using:  npx hardhat compile
3. Perform test using command : npx hardhat test
4. Create an environment file .env
   In this file add PRIVATE_KEY="your wallet private key", GOERLI_URL and MUMBAI_URL
5. To Deploy ERC721 contract to the Goerli Ethereum Testnet, Execute command:
   npx hardhat run scripts/deploy.js --network goerli 
An the address will be generate. Paste this address into contarctAddress.js(in metadata folder) and also in batchMint.js(in scripts folder)
6. Batch Mint NFTs
Run the following command to batch-mint NFTs: npx hardhat run scripts/batchMint.js --network goerli
The script will mint the specified number of NFTs and assign them to your address.
7. Approve and Deposit NFTs to Polygon Mumbai
Run the following commands to approve and deposit the minted NFTs from Ethereum to the Polygon Mumbai network using the FxPortal Bridge:
npx hardhat run scripts/approveDeposit.js --network goerli

