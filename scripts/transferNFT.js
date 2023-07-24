const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../contracts/FXRootContractAbi.js");
const NFTAbi = require("../artifacts/contracts/animeNFT.sol/AnimeNFT.json");
require("dotenv").config();

// Transfer ERC721 tokens from Goerli to Ethereum FxChain (Mumbai)
async function main() {
  // Set up connections to Goerli and Mumbai networks
  const goerliNetwork = "https://ethereum-goerli.publicnode.com";
  const mumbaiNetwork = "https://rpc-mumbai.maticvigil.com";
  const privateKey = process.env.PRIVATE_KEY;

  // Create a wallet instance for Goerli network
  const providerGoerli = new ethers.providers.JsonRpcProvider(goerliNetwork);
  const walletGoerli = new ethers.Wallet(privateKey, providerGoerli);

  // Create a wallet instance for Mumbai network
  const providerMumbai = new ethers.providers.JsonRpcProvider(mumbaiNetwork);
  const walletMumbai = new ethers.Wallet(privateKey, providerMumbai);

  // Get the signer instance for Goerli network
  const [signerGoerli] = await ethers.getSigners();

  // Get the signer instance for Mumbai network
  const [signerMumbai] = await ethers.getSigners();

  // Replace this with the deployed contract address on Goerli
  const contractAddressGoerli = "0x0F9CB4f6087Ce2ac9Be86F68534846620680059f";

  // Replace this with the deployed contract address on Mumbai
  const contractAddressMumbai = "0xef8503488988a299Cacce2436CF85b663aC71cA2";

  // Get ERC721 contract instance on Goerli network
  const NFTGoerli = await ethers.getContractFactory("AnimeNFT");
  const nftGoerli = await NFTGoerli.attach(contractAddressGoerli);

  // Get FXRoot contract instance on Mumbai network
  const fxRootAddressMumbai = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRootMumbai = await ethers.getContractAt(FXRootContractAbi, fxRootAddressMumbai);

  // TokenIds to transfer (Update this array with the token IDs you want to send)
  const tokenIdsToTransfer = [0, 1, 2,];

  // Approve the NFTs for transfer on Goerli network
  const approveTx = await nftGoerli
    .connect(signerGoerli)
    .setApprovalForAll(fxRootAddressMumbai, true);
  await approveTx.wait();
  console.log("Approval confirmed on Goerli network");

  // Deposit the NFTs to the FXRoot contract on Mumbai network
  for(const tokenId of tokenIdsToTransfer) {
    const depositTx = await fxRootMumbai
      .connect(signerMumbai)
      .deposit(nftGoerli.address, walletMumbai.address, tokenId, "0x6566");

    // Wait for the deposit to be confirmed
    await depositTx.wait();
    console.log(`Token ID ${tokenId} deposited to Mumbai network`);
  }
  console.log("Approved and deposited to Mumbai network");
}

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
