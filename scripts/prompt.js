const { ethers } = require("hardhat");
const NFTAbi = require("../artifacts/contracts/animeNFT.sol/AnimeNFT.json");

// Contract address on the Goerli network
const contractAddress = "0xF1E2cA5fd0f0FCfe1be573fbaB9AaE99f8e88d62"; // Replace with the actual contract address

// Function to get the prompt description from the contract
async function getPromptDescription() {
  // Set up connection to the Goerli network
  const goerliNetwork = "https://ethereum-goerli.publicnode.com"; // Replace with your Infura project ID
  const provider = new ethers.providers.JsonRpcProvider(goerliNetwork);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  // Get contract instance
  const NFTContract = await ethers.getContractAt(NFTAbi.abi, contractAddress, signer);

  try {
    // Call the contract's "promptDescription" function
    const prompt = await NFTContract.promptDescription();
    console.log("NFT prompt description:", prompt);
  } catch (error) {
    console.error("Error fetching prompt description:", error);
  }
}

// Call the function to get the prompt description
getPromptDescription();
