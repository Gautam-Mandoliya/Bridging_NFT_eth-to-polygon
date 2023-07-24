const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Set the gas price and other parameters here
  const maxPriorityFeePerGas = ethers.BigNumber.from("2000000000"); // 2 Gwei in wei
  const maxFeePerGas = ethers.BigNumber.from("7000000000"); // 7 Gwei in wei

  // Load the ABI of the AnimeNFT contract
  const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/animeNFT.sol/AnimeNFT.json", "utf8")).abi;

  // Replace the contractAddress with the deployed contract address
  const contractAddress = "0x0F9CB4f6087Ce2ac9Be86F68534846620680059f";
//0x0F9CB4f6087Ce2ac9Be86F68534846620680059f
  // Replace the privateKey with the private key of the wallet from which you want to mint NFTs
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider("https://ethereum-goerli.publicnode.com");
  const wallet = new ethers.Wallet(privateKey, provider);

  // Fetch the nonce of the sending address
  const nonce = await provider.getTransactionCount(wallet.address, "latest");

  // Create an instance of the contract using the ABI and contract address
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Minting NFTs using batchMint function
  const ipfsLinks = [
    "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8346.JPG",
    "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8350.JPG",
    "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8351.JPG",
    "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8355.JPG",
    "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8357.JPG"
  ];

  for (let i = 0; i < ipfsLinks.length; i++) {
    console.log("Minting NFT:", i + 1);
    const transaction = {
      nonce: nonce + i, // Increment the nonce for each transaction
      maxPriorityFeePerGas,
      maxFeePerGas,
    };
    const mintTx = await contract.mintANFT(ipfsLinks[i], transaction);
    await mintTx.wait();
  }

  // Get the balance of the wallet after minting
  const balance = await contract.balanceOf(wallet.address);
  console.log("Wallet Balance of NFTs:", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
