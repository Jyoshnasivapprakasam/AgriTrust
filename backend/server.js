const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());
app.use(cors());

let isManagerVerified = false;
let verifiedWeightKg = 2500;
let isMinted = false;
let mintedTxHash = null;

let latestTelemetry = {
  warehouseId: "GODOWN_COIMBATORE_01",
  batchId: "BATCH_PADDY_2026",
  farmerAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  temperature: 29.5,
  humidity: 64.0,
  grainMoisture: 20.5,
  timestamp: Date.now(),
};

let history = [];

// Local Hardhat JsonRpcProvider & Account #0 Private Key
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const adminPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const adminWallet = new ethers.Wallet(adminPrivateKey, provider);

// Replace with deployed address from deploy.js output
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  "function mintENWR(address farmer, string memory batchId, string memory warehouseId, uint256 weightInKg, uint256 moistureLevel) public returns (uint256)",
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, adminWallet);

// 1. Manager Physical Intake Verification
app.post("/api/manager/verify", (req, res) => {
  const { weightKg } = req.body;
  isManagerVerified = true;
  if (weightKg) verifiedWeightKg = weightKg;
  console.log(`✅ Manager Approved Intake: ${verifiedWeightKg} kg`);
  res.json({ status: "success", isManagerVerified, verifiedWeightKg });
});

// 2. Telemetry Ingestion Endpoint
app.post("/api/telemetry", async (req, res) => {
  const { warehouseId, batchId, farmerAddress, telemetry } = req.body;

  latestTelemetry = { warehouseId, batchId, farmerAddress, ...telemetry };
  history.push(latestTelemetry);
  if (history.length > 30) history.shift();

  // Mint when manager approved AND moisture <= 14.0%
  if (isManagerVerified && telemetry.grainMoisture <= 14.0 && !isMinted) {
    console.log("⚡ Safe Moisture Threshold Met! Executing Smart Contract Mint...");
    try {
      isMinted = true;
      const moistureScaled = Math.floor(telemetry.grainMoisture * 100);
      const tx = await contract.mintENWR(
        farmerAddress,
        batchId,
        warehouseId,
        verifiedWeightKg,
        moistureScaled
      );
      await tx.wait();
      mintedTxHash = tx.hash;
      console.log(`🎉 e-NWR Minted Successfully! Tx Hash: ${tx.hash}`);
    } catch (err) {
      console.error("❌ Smart Contract Execution Error:", err.message);
      isMinted = false;
    }
  }

  res.json({ status: "received", isManagerVerified, isMinted, txHash: mintedTxHash });
});

// 3. Data Streaming API for Frontend
app.get("/api/stream", (req, res) => {
  res.json({
    latest: latestTelemetry,
    history: history,
    isManagerVerified: isManagerVerified,
    verifiedWeightKg: verifiedWeightKg,
    isMinted: isMinted,
    txHash: mintedTxHash,
  });
});

app.listen(5000, () => {
  console.log("🌐 Express Server running on http://localhost:5000");
});