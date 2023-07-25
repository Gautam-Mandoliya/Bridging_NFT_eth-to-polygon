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
     
  5. Approve and Deposit NFTs to Polygon Mumbai: `npx hardhat run scripts/transferNFT.js --network goerli`
  6. To check balance: Change the network url and contract address according to the network (Goerli/Polygon)
     ```
     //For Goerli network
     npx hardhat run scripts/balance.js --network goerli
     //For Polygon network
     npx hardhat run scripts/balance.js --network mumbai

     ```
  7. To get the prompt:` npx hardhat run scripts/transferNFT.js --network goerli`

*This Should do the work*. Now the NFT's are deposited to the contract which is on Polygon.

# Author
Gautam Mandoliya
# License
This project is licensed under the MIT License - see the LICENSE.md file for details.
