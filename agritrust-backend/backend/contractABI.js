export const contractAddress =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const contractABI = [
    "function createReceipt(string farmer, string commodity, uint256 quantity, uint256 value) public returns (uint256)",
    "function getReceipt(uint256 tokenId) public view returns (uint256, string, string, uint256, uint256, bool, string)",
    "function updateStatus(uint256 tokenId, string newStatus) public"
];