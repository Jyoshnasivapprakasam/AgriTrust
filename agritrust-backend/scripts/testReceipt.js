import { ethers } from "ethers";
import fs from "fs";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    const privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    const wallet = new ethers.Wallet(privateKey, provider);

    const artifact = JSON.parse(
        fs.readFileSync("./artifacts/contracts/eNWRReceipt.sol/eNWRReceipt.json")
    );

    const contract = new ethers.Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        artifact.abi,
        wallet
    );

    console.log("Creating receipt...");

    const tx = await contract.createReceipt(
        "Ravi",
        "Paddy",
        1000,
        50000
    );

    await tx.wait();

    console.log("Receipt created!");

    const receipt = await contract.getReceipt(1);

    console.log("Receipt details:");
    console.log(receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});