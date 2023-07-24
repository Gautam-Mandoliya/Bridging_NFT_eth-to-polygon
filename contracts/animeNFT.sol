// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AnimeNFT is ERC721{
    string[5] private _ipfsLinks;
    string private _NFTprompt;
    uint256 private _tokenIdCounter;
    address private _owner;

    constructor() ERC721("AniNFT", "ANFT") {
        _NFTprompt = "Indian anime character looks like gojo";
        _owner = msg.sender;

        _ipfsLinks[0] = "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8346.JPG";
        _ipfsLinks[1] = "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8350.JPG";
        _ipfsLinks[2] = "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8351.JPG";
        _ipfsLinks[3] = "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8355.JPG";
        _ipfsLinks[4] = "https://gateway.pinata.cloud/ipfs/Qmde583GXnBHVCswAUSFF3zeF5JfTbN75FcHDT88urn4C9/IMG-8357.JPG";
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    // Mint a new NFT with the given IPFS link
    function mintANFT(string memory ipfsLink) external onlyOwner{
        require(_tokenIdCounter < 5, "All NFTs have been minted.");
        uint256 tokenId = _tokenIdCounter;
        _mint(msg.sender, tokenId);
        _ipfsLinks[tokenId] = ipfsLink;
        _tokenIdCounter++;
    }

    // Return the IPFS link for the given tokenId
    function getIpfsLink(uint256 tokenId) external view returns (string memory) {
        require(tokenId < _tokenIdCounter, "Token ID does not exist");
        return _ipfsLinks[tokenId];
    }

    // Return the shared prompt description for all the NFTs
    function promptDescription() external view returns (string memory) {
        return _NFTprompt;
    }

}
