"use client";

import { useEffect, useState } from "react";

type Receipt = {
  tokenId: string;
  owner: string;
  farmer: string;
  commodity: string;
  quantity: string;
  value: string;
  active: boolean;
  status: string;
};

type LoanApplication = {
  id: number;
  farmer: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function FarmerPage() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loanStatus, setLoanStatus] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [application, setApplication] =
    useState<LoanApplication | null>(null);

  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadFarmerData = async () => {
    try {
      const receiptResponse = await fetch(
        "http://localhost:5000/receipt/7"
      );
      const receiptData = await receiptResponse.json();
      setReceipt(receiptData);

      const loanResponse = await fetch(
        "http://localhost:5000/loan/status"
      );
      const loanData = await loanResponse.json();
      setLoanStatus(loanData.loanStatus);

      const farmerName = receiptData.farmer;

      const walletResponse = await fetch(
        `http://localhost:5000/wallet/${farmerName}`
      );
      const walletData = await walletResponse.json();
      setWalletBalance(Number(walletData.balance));

      const applicationsResponse = await fetch(
        "http://localhost:5000/loan/applications"
      );
      const applications =
        await applicationsResponse.json();

      const farmerApplication = applications.find(
        (item: LoanApplication) =>
          item.farmer === farmerName
      );

      setApplication(farmerApplication || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  loadFarmerData();

  const interval = setInterval(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/loan/status"
      );

      const data = await response.json();

      setLoanStatus(data.loanStatus);

      if (data.loanStatus === "ELIGIBLE") {
        clearInterval(interval);
      }
    } catch (error) {
      console.error(error);
    }
  }, 2000);

  return () => clearInterval(interval);
}, []);

  const applyForLoan = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/loan/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmer: receipt?.farmer,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Application failed.");
        return;
      }

      setMessage(
        `Loan application submitted successfully. Application #${data.applicationId}`
      );

      await loadFarmerData();
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit application.");
    } finally {
      setLoading(false);
    }
  };

  const farmerMessage =
    application?.status === "APPROVED"
      ? `Your loan of ₹${Number(
          application.amount
        ).toLocaleString()} has been approved and credited to your wallet.`
      : application?.status === "REJECTED"
      ? "Your loan application has been rejected by the bank."
      : application?.status === "SUBMITTED"
      ? "Your loan application is under review by the bank."
      : "No loan application submitted yet.";

  return (
    <main className="min-h-screen bg-[#f5f7f2] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#172018]">
          AgriTrust Farmer Wallet
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Digital warehouse receipt and agricultural financing
        </p>

        {/* Farmer Details */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Farmer Details
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-gray-400">
                Farmer Name
              </p>
              <p className="font-bold">
                {receipt?.farmer || "--"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Receipt ID
              </p>
              <p className="font-bold">
                #{receipt?.tokenId || "--"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Commodity
              </p>
              <p className="font-bold">
                {receipt?.commodity || "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Receipt */}
        <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Farmer Receipt
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs text-gray-400">
                Quantity
              </p>
              <p className="font-bold">
                {receipt?.quantity || "--"} kg
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Paddy Value
              </p>
              <p className="font-bold">
                ₹
                {Number(
                  receipt?.value || 0
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Paddy Health
              </p>
              <p
                className={`font-bold ${
                  receipt?.status === "SAFE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {receipt?.status || "--"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Loan Status
              </p>
              <p
                className={`font-bold ${
                  loanStatus === "ELIGIBLE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {loanStatus || "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="mt-5 rounded-2xl bg-green-700 p-6 text-white shadow-sm">
          <p className="text-sm opacity-80">
            Total Wallet Balance
          </p>

          <p className="mt-2 text-4xl font-bold">
            ₹{walletBalance.toLocaleString()}
          </p>

          <p className="mt-2 text-xs opacity-80">
            Demo wallet balance
          </p>
        </div>

        {/* Loan Application */}
        <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Loan Application
          </h2>

          

          <button
            onClick={applyForLoan}
            disabled={
              loading ||
              loanStatus !== "ELIGIBLE"
            }
            
            className={`mt-4 rounded-xl px-6 py-3 font-bold text-white ${
              loanStatus === "ELIGIBLE" &&
              !application &&
              !loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            {loading
  ? "Submitting..."
  : loanStatus === "ELIGIBLE"
  ? "Apply for Loan"
  : "Loan On Hold"}
          </button>

          {message && (
            <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm font-semibold text-blue-700">
              {message}
            </p>
          )}
        </div>

        {/* Bank Message */}
        <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Message from Bank
          </h2>

          <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm">
            {farmerMessage}
          </p>
        </div>
      </div>
    </main>
  );
}