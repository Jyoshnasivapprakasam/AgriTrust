// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract eNWRReceipt is ERC721, Ownable {
    uint256 private _nextTokenId;

    struct ReceiptData {
        string batchId;
        string warehouseId;
        uint256 weightInKg;
        uint256 moistureLevel; // e.g. 1350 = 13.50%
        uint256 timestamp;
        bool managerVerified;
    }

    mapping(uint256 => ReceiptData) public receipts;

    event ReceiptMinted(
        uint256 indexed tokenId,
        address indexed farmer,
        string batchId,
        uint256 moistureLevel
    );

    constructor() ERC721("Electronic Warehouse Receipt", "eNWR") Ownable(msg.sender) {}

    function mintENWR(
        address farmer,
        string memory batchId,
        string memory warehouseId,
        uint256 weightInKg,
        uint256 moistureLevel
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(farmer, tokenId);

        receipts[tokenId] = ReceiptData({
            batchId: batchId,
            warehouseId: warehouseId,
            weightInKg: weightInKg,
            moistureLevel: moistureLevel,
            timestamp: block.timestamp,
            managerVerified: true
        });

        emit ReceiptMinted(tokenId, farmer, batchId, moistureLevel);
        return tokenId;
    }

    function getReceipt(uint256 tokenId) public view returns (ReceiptData memory) {
        return receipts[tokenId];
    }
}