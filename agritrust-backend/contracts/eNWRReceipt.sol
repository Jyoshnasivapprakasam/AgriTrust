// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract eNWRReceipt {

    uint256 private nextReceiptId = 1;

    struct Receipt {
        uint256 tokenId;
        address owner;
        string farmer;
        string commodity;
        uint256 quantity;
        uint256 value;
        bool active;
        string status;
    }

    mapping(uint256 => Receipt) public receipts;

    event ReceiptCreated(
        uint256 tokenId,
        address owner,
        string farmer,
        string commodity,
        uint256 quantity,
        uint256 value
    );

    event ReceiptStatusUpdated(
        uint256 tokenId,
        string status
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
            msg.sender,
            farmer,
            commodity,
            quantity,
            value,
            true,
            "SAFE"
        );

        nextReceiptId++;

        emit ReceiptCreated(
            tokenId,
            msg.sender,
            farmer,
            commodity,
            quantity,
            value
        );

        return tokenId;
    }

    function updateStatus(
        uint256 tokenId,
        string memory newStatus
    ) public {

        require(
            receipts[tokenId].active,
            "Receipt does not exist"
        );

        receipts[tokenId].status = newStatus;

        emit ReceiptStatusUpdated(
            tokenId,
            newStatus
        );
    }

    function getReceipt(uint256 tokenId)
        public
        view
        returns (
            uint256,
            address,
            string memory,
            string memory,
            uint256,
            uint256,
            bool,
            string memory
        )
    {
        Receipt memory receipt = receipts[tokenId];

        return (
            receipt.tokenId,
            receipt.owner,
            receipt.farmer,
            receipt.commodity,
            receipt.quantity,
            receipt.value,
            receipt.active,
            receipt.status
        );
    }
}