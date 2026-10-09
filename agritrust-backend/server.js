import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import fs from "fs";
import Database from "better-sqlite3";

const app = express();
const db = new Database("agritrust.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS sensor_readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL,
        humidity REAL,
        moisture REAL,
        quantity REAL,
        status TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

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
    "0x8ac87219a0F5639BC01b470F87BA2b26356CB2B9",
    artifact.abi,
    wallet
);

let latestSensorData = {
    temperature: 0,
    humidity: 0,
    moisture: 0,
    quantity: 1000,
    status: "WAITING"
};
let paddySafe = false;
app.post("/sensor", async (req, res) => {
    try {
        if (paddySafe) {
            return res.json(latestSensorData);
        }
        const { temperature, humidity, moisture, quantity } = req.body;

        const status =
            moisture <= 14 ? "SAFE" :
            moisture <= 15 ? "MODERATE" :
            "AT RISK";
        if (status === "SAFE") {
            paddySafe = true;
        }

        latestSensorData = {
            temperature,
            humidity,
            moisture,
            quantity,
            status
        };

        // Store reading in SQLite
        db.prepare(`
            INSERT INTO sensor_readings
            (temperature, humidity, moisture, quantity, status)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            temperature,
            humidity,
            moisture,
            quantity,
            status
        );

        db.prepare(`
            CREATE TABLE IF NOT EXISTS loan_applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                farmer TEXT,
                amount REAL,
                status TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS wallets (
                farmer TEXT PRIMARY KEY,
                balance REAL DEFAULT 0
            )
        `).run();

        db.prepare(`
            CREATE TABLE IF NOT EXISTS farmers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                village TEXT,
                phone TEXT,
                wallet_address TEXT
            )
        `).run();

        db.prepare(`
            INSERT OR IGNORE INTO farmers
            (id, name, village, phone, wallet_address)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            1,
            "Ravi",
            "Coimbatore",
            "9876543210",
            "0x2Ef5..."
        );

        db.prepare(`
            INSERT OR IGNORE INTO farmers
            (id, name, village, phone, wallet_address)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            2,
            "Priya",
            "Coimbatore",
            "9876543211",
            "0x..."
        );

        db.prepare(`
    CREATE TABLE IF NOT EXISTS farmers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`).run();



db.prepare(`
    INSERT OR IGNORE INTO farmers
    (id, name, receipt_id, wallet_address)
    VALUES (1, 'Ravi', 1, NULL)
`).run();

db.prepare(`
    INSERT OR IGNORE INTO farmers
    (id, name, receipt_id, wallet_address)
    VALUES (2, 'Priya', 5, NULL)
`).run();

db.prepare(`
    INSERT OR REPLACE INTO farmers
    (id, name, receipt_id, wallet_address)
    VALUES (3, 'Kumar', 6, NULL)
`).run();


// Repair existing farmer-to-receipt mappings
db.prepare(`
    UPDATE farmers SET name = 'Ravi', receipt_id = 1
    WHERE id = 1
`).run();

db.prepare(`
    UPDATE farmers SET name = 'Priya', receipt_id = 5
    WHERE id = 2
`).run();

db.prepare(`
    INSERT OR IGNORE INTO farmers
    (id, name, receipt_id, wallet_address)
    VALUES (3, 'Kumar', 6, NULL)
`).run();

db.prepare(`
    UPDATE farmers SET name = 'Kumar', receipt_id = 6
    WHERE id = 3
`).run();

db.prepare(`
    INSERT OR REPLACE INTO farmers
    (id, name, receipt_id, wallet_address)
    VALUES (4, 'Arjun', 7, NULL)
`).run();

const farmerColumns = db
    .prepare(`PRAGMA table_info(farmers)`)
    .all();

if (!farmerColumns.some((column) => column.name === "receipt_id")) {
    db.prepare(`
        ALTER TABLE farmers
        ADD COLUMN receipt_id INTEGER
    `).run();
}

if (!farmerColumns.some((column) => column.name === "wallet_address")) {
    db.prepare(`
        ALTER TABLE farmers
        ADD COLUMN wallet_address TEXT
    `).run();
}



        // Update blockchain status
        const tx = await contract.updateStatus(1, status);
        await tx.wait();

        console.log("Sensor:", latestSensorData);
        console.log("Saved to database");
        console.log("Blockchain status updated:", status);

        res.json(latestSensorData);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});


app.get("/farmers", (req, res) => {
    try {
        const farmers = db.prepare(`
            SELECT *
            FROM farmers
            ORDER BY id
        `).all();

        res.json(farmers);
    } catch (error) {
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
            owner: receipt[1],
            farmer: receipt[2],
            commodity: receipt[3],
            quantity: receipt[4].toString(),
            value: receipt[5].toString(),
            active: receipt[6],
            status: receipt[7]
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

app.get("/sensor/history", (req, res) => {
    try {
        const readings = db.prepare(`
            SELECT *
            FROM sensor_readings
            ORDER BY id DESC
            LIMIT 100
        `).all();

        res.json(readings);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("AgriTrust Backend is running!");
});

app.post("/loan/apply", (req, res) => {
    try {
        const { farmer } = req.body;

        if (!farmer) {
            return res.status(400).json({
                error: "Farmer name is required"
            });
        }

        if (latestSensorData.status !== "SAFE") {
            return res.status(400).json({
                error: "Loan application is currently on hold"
            });
        }

        const existingApplication = db.prepare(`
            SELECT *
            FROM loan_applications
            WHERE farmer = ?
            AND status IN ('SUBMITTED', 'APPROVED')
            ORDER BY id DESC
            LIMIT 1
        `).get(farmer);

        if (existingApplication) {
            return res.json({
                message: "Loan application already exists",
                applicationId: existingApplication.id,
                status: existingApplication.status
            });
        }

        // Government-assigned amount
        const governmentLoanAmount = 40000;

        const result = db.prepare(`
            INSERT INTO loan_applications
            (farmer, amount, status)
            VALUES (?, ?, ?)
        `).run(
            farmer,
            governmentLoanAmount,
            "SUBMITTED"
        );

        res.json({
            message: "Loan application submitted successfully",
            applicationId: result.lastInsertRowid,
            amount: governmentLoanAmount,
            status: "SUBMITTED"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});
app.get("/loan/applications", (req, res) => {
    try {
        const applications = db.prepare(`
            SELECT *
            FROM loan_applications
            ORDER BY id DESC
        `).all();

        res.json(applications);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/loan/approve/:id", (req, res) => {
    try {
        const applicationId = req.params.id;

        const application = db.prepare(`
            SELECT *
            FROM loan_applications
            WHERE id = ?
        `).get(applicationId);

        if (!application) {
            return res.status(404).json({
                error: "Loan application not found"
            });
        }

        if (application.status === "APPROVED") {
            return res.status(400).json({
                error: "Loan already approved"
            });
        }

        if (latestSensorData.status !== "SAFE") {
            return res.status(400).json({
                error: "Cannot approve loan while storage is AT RISK"
            });
        }

        db.prepare(`
            UPDATE loan_applications
            SET status = 'APPROVED'
            WHERE id = ?
        `).run(applicationId);

        db.prepare(`
            INSERT INTO wallets (farmer, balance)
            VALUES (?, ?)
            ON CONFLICT(farmer)
            DO UPDATE SET balance = balance + excluded.balance
        `).run(
            application.farmer,
            application.amount
        );

        res.json({
            message: "Loan approved successfully",
            applicationId: application.id,
            farmer: application.farmer,
            amount: application.amount,
            status: "APPROVED"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/wallet/:farmer", (req, res) => {
    try {
        const wallet = db.prepare(`
            SELECT *
            FROM wallets
            WHERE farmer = ?
        `).get(req.params.farmer);

        res.json({
            farmer: req.params.farmer,
            balance: wallet?.balance || 0
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/loan/reject/:id", (req, res) => {
    try {
        const applicationId = req.params.id;

        const application = db.prepare(`
            SELECT *
            FROM loan_applications
            WHERE id = ?
        `).get(applicationId);

        if (!application) {
            return res.status(404).json({
                error: "Loan application not found"
            });
        }

        if (application.status !== "SUBMITTED") {
            return res.status(400).json({
                error: "Application has already been processed"
            });
        }

        db.prepare(`
            UPDATE loan_applications
            SET status = 'REJECTED'
            WHERE id = ?
        `).run(applicationId);

        res.json({
            message: "Loan application rejected",
            applicationId: application.id,
            farmer: application.farmer,
            amount: application.amount,
            status: "REJECTED"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/farmers", (req, res) => {
    try {
        const farmers = db.prepare(`
            SELECT *
            FROM farmers
            ORDER BY id
        `).all();

        res.json(farmers);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.listen(5000, () => {
    console.log("AgriTrust backend running on http://localhost:5000");
});