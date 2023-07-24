const hre = require("hardhat");


async function main() {
  const AnimeNFT = await hre.ethers.getContractFactory("AnimeNFT");
  const animeNFT = await AnimeNFT.deploy();

  await animeNFT.deployed();

  console.log("AnimeNFT contract deployed to:", animeNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
