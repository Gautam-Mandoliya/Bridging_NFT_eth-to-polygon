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
# Getting Started
  ## Installation
  
  1. `npm install`
  2. Create an environment file .env, In this file add `PRIVATE_KEY= "your wallet private key"`
  3. Deploy Contract: `npx hardhat run scripts/deploy.js --network goerli`
     
 -->  An address will be generate. Paste this address into `MintNFT.js and transferNFT.js(at "Goerli contract address")`
 
  4. Mint NFTs:` npx hardhat run scripts/MintNFT.js --network goerli`
  --> The script will mint the specified number of NFTs and assign them to your address.
     
  7. Approve and Deposit NFTs to Polygon Mumbai
  Run the following commands to approve and deposit the minted NFTs from Ethereum to the Polygon Mumbai network using the FxPortal Bridge:
  npx hardhat run scripts/approveDeposit.js --network goerli
  
