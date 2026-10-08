import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
);

const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/eNWRReceipt.sol/eNWRReceipt.json")
);

const contract = new ethers.Contract(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    artifact.abi,
    wallet
);

let latestSensorData = {
    temperature: 0,
    humidity: 0,
    moisture: 0,
    quantity: 1000,
    status: "SAFE"
};

app.post("/sensor", async (req, res) => {
    try {
        const { temperature, humidity, moisture, quantity } = req.body;

        const status = moisture > 15 ? "AT RISK" : "SAFE";

        latestSensorData = {
            temperature,
            humidity,
            moisture,
            quantity,
            status
        };

        const tx = await contract.updateStatus(1, status);
        await tx.wait();

        console.log("Sensor:", latestSensorData);
        console.log("Blockchain status updated:", status);

        res.json(latestSensorData);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/sensor", (req, res) => {
    res.json(latestSensorData);
});

app.post("/receipt", async (req, res) => {
    try {
        const { farmer, commodity, quantity, value } = req.body;

        const tx = await contract.createReceipt(
            farmer,
            commodity,
            quantity,
            value
        );

        await tx.wait();

        res.json({
            message: "e-NWR created",
            transaction: tx.hash
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.put("/receipt/:id/status", async (req, res) => {
    try {
        const receiptId = req.params.id;
        const { status } = req.body;

        const tx = await contract.updateStatus(receiptId, status);
        await tx.wait();

        res.json({
            message: "Receipt status updated",
            status: status,
            transaction: tx.hash
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.get("/receipt/:id", async (req, res) => {
    try {
        const receipt = await contract.getReceipt(req.params.id);

        res.json({
            tokenId: receipt[0].toString(),
            farmer: receipt[1],
            commodity: receipt[2],
            quantity: receipt[3].toString(),
            value: receipt[4].toString(),
            active: receipt[5],
            status: receipt[6]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/loan/status", (req, res) => {
    const loanStatus =
        latestSensorData.status === "SAFE"
            ? "ELIGIBLE"
            : "ON HOLD";

    res.json({
        loanStatus: loanStatus
    });
});

app.get("/", (req, res) => {
    res.send("AgriTrust Backend is running!");
});

app.listen(5000, () => {
    console.log("AgriTrust backend running on http://localhost:5000");
});