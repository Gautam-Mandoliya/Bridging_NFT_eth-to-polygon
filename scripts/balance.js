const { ethers } = require("hardhat");
const NFTAbi = require("../artifacts/contracts/animeNFT.sol/AnimeNFT.json");

// Contract address on the Goerli network
const contractAddress = "0x964Fd899fd493C0Df79b72cC9276581A20D1e098"; // Replace with the actual contract address

// Wallet address for which you want to check the NFT balance
const walletAddress = "0xA8cAe6bFF36c9424AFB8cdd67b50b205f63385D0"; // Replace with your wallet address

// Function to get the NFT balance for the given wallet address
async function getNFTBalance() {
  // Set up connection to the Goerli network
  const Network = "https://rpc-mumbai.maticvigil.com"; // Replace with your Infura project ID
  const provider = new ethers.providers.JsonRpcProvider(Network);

  // Get contract instance
  const NFTContract = await ethers.getContractAt(NFTAbi.abi, contractAddress);

  try {
    // Call the contract's "balanceOf" function to get the NFT balance
    const balance = await NFTContract.balanceOf(walletAddress);
    console.log("NFT wallet balance for address", walletAddress, "is: ", balance.toString());
  } catch (error) {
    console.error("Error fetching NFT balance:", error);
  }
}

// Call the function to get the NFT balance
getNFTBalance();
