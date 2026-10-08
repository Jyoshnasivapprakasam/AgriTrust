// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract eNWRReceipt {

    uint256 private nextReceiptId = 1;

    struct Receipt {
        uint256 tokenId;
        string farmer;
        string commodity;
        uint256 quantity;
        uint256 value;
        bool active;
    }

    mapping(uint256 => Receipt) public receipts;

    event ReceiptCreated(
        uint256 tokenId,
        string farmer,
        string commodity,
        uint256 quantity,
        uint256 value
    );

    function createReceipt(
        string memory farmer,
        string memory commodity,
        uint256 quantity,
        uint256 value
    ) public returns (uint256) {

        uint256 tokenId = nextReceiptId;

        receipts[tokenId] = Receipt(
            tokenId,
            farmer,
            commodity,
            quantity,
            value,
            true
        );

        nextReceiptId++;

        emit ReceiptCreated(
            tokenId,
            farmer,
            commodity,
            quantity,
            value
        );

        return tokenId;
    }

    function getReceipt(uint256 tokenId)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            uint256,
            bool
        )
    {
        Receipt memory receipt = receipts[tokenId];

        return (
            receipt.tokenId,
            receipt.farmer,
            receipt.commodity,
            receipt.quantity,
            receipt.value,
            receipt.active
        );
    }
}