"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Wallet,
  FileText,
  Landmark,
  RefreshCw,
  CheckCircle2,
  CircleDollarSign,
  ShieldCheck,
  Coins,
} from "lucide-react";

interface Receipt {
  tokenId: number | string;
  farmer: string;
  commodity: string;
  quantity: number;
  value: number;
  active: boolean;
  status: string;
}

interface LoanStatus {
  loanStatus: string;
}

export default function FarmerPage() {
  const [receipt, setReceipt] =
    useState<Receipt | null>(null);

  const [loan, setLoan] =
    useState<LoanStatus | null>(null);

  const [wallet, setWallet] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadFarmerData = async () => {
    setLoading(true);
    setError("");

    try {
      const [receiptResponse, loanResponse] =
        await Promise.all([
          fetch("/api/receipt/1", {
            cache: "no-store",
          }),

          fetch("/api/loan/status", {
            cache: "no-store",
          }),
        ]);

      if (!receiptResponse.ok) {
        throw new Error("Unable to fetch receipt");
      }

      if (!loanResponse.ok) {
        throw new Error("Unable to fetch loan status");
      }

      const receiptData: Receipt =
        await receiptResponse.json();

      const loanData: LoanStatus =
        await loanResponse.json();

      setReceipt(receiptData);
      setLoan(loanData);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load farmer information. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarmerData();
  }, []);

  const connectWallet = async () => {
    const ethereum = (
      window as Window & {
        ethereum?: {
          request: (args: {
            method: string;
          }) => Promise<string[]>;
        };
      }
    ).ethereum;

    if (!ethereum) {
      alert(
        "MetaMask is not installed. Please install MetaMask first."
      );

      return;
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWallet(accounts[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6f1] lg:pl-64">
      <Navbar />

      <div className="mx-auto max-w-[1250px] px-5 py-7 md:px-8 md:py-9">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#176b3a]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50">
                <Coins size={15} />
              </span>

              Farmer Portal
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#172018] md:text-[32px]">
              e-NWR & Pledge Financing
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Manage your digital warehouse receipt and view
              financing eligibility against stored paddy.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#dfe5dc] bg-white px-4 py-3 shadow-sm">
            <ShieldCheck
              size={17}
              className="text-[#176b3a]"
            />

            <div>
              <p className="text-xs font-bold text-[#172018]">
                Digital Asset
              </p>

              <p className="text-[10px] text-gray-400">
                Secure & verifiable
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

            <span>{error}</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 rounded-2xl border border-[#dfe5dc] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
              <RefreshCw
                className="animate-spin text-[#176b3a]"
                size={23}
              />
            </div>

            <p className="mt-4 text-sm font-medium text-[#172018]">
              Loading farmer information...
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Fetching your receipt and financing status.
            </p>
          </div>
        )}

        {!loading && (
          <>
            {/* Wallet */}
            <div className="mt-8 rounded-2xl border border-[#dfe5dc] bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-5 px-6 py-6 md:flex-row md:items-center md:px-7">

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                    <Wallet
                      size={23}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-[#172018]">
                        Farmer Wallet
                      </h2>

                      {wallet && (
                        <span className="rounded-full bg-green-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-green-700">
                          Connected
                        </span>
                      )}
                    </div>

                    {wallet ? (
                      <p className="mt-1 text-xs text-green-600">
                        {wallet.slice(0, 6)}...
                        {wallet.slice(-4)}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        Connect MetaMask to access your wallet.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={connectWallet}
                  className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                    wallet
                      ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      : "bg-[#176b3a] text-white shadow-sm hover:bg-[#11552d] hover:shadow-md"
                  }`}
                >
                  <Wallet size={17} />

                  {wallet
                    ? "Wallet Connected"
                    : "Connect MetaMask"}
                </button>
              </div>
            </div>

            {/* Receipt */}
            {receipt && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-[#dfe5dc] bg-white shadow-sm">

                {/* Receipt Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-[#edf0eb] bg-[#fafbf9] px-6 py-5 sm:flex-row sm:items-center md:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                      <FileText
                        size={21}
                        className="text-[#176b3a]"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#172018]">
                        e-NWR Receipt
                      </h2>

                      <p className="mt-0.5 text-xs text-gray-500">
                        Digital warehouse receipt
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
                    <CheckCircle2
                      size={14}
                      className="text-green-600"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-wide text-green-700">
                      {receipt.status}
                    </span>
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 lg:grid-cols-3 md:px-7">

                  <div className="rounded-xl border border-[#edf0eb] bg-[#fafbf9] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Token ID
                    </p>

                    <p className="mt-2 text-lg font-bold text-[#172018]">
                      #{receipt.tokenId}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#edf0eb] bg-[#fafbf9] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Farmer
                    </p>

                    <p className="mt-2 font-semibold text-[#172018]">
                      {receipt.farmer}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#edf0eb] bg-[#fafbf9] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Commodity
                    </p>

                    <p className="mt-2 font-semibold text-[#172018]">
                      {receipt.commodity}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#edf0eb] bg-[#fafbf9] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Quantity
                    </p>

                    <p className="mt-2 font-semibold text-[#172018]">
                      {receipt.quantity}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#edf0eb] bg-[#fafbf9] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Stored Value
                    </p>

                    <p className="mt-2 font-semibold text-[#176b3a]">
                      ₹
                      {Number(
                        receipt.value
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-green-600">
                      Receipt Status
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <CheckCircle2
                        size={17}
                        className="text-green-600"
                      />

                      <span className="font-semibold text-green-700">
                        {receipt.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loan */}
            <div className="mt-5 rounded-2xl border border-[#dfe5dc] bg-white p-6 shadow-sm md:p-7">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Landmark
                      size={23}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#172018]">
                      Pledge Financing
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Financing against your stored paddy.
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                  Asset-backed
                </span>
              </div>

              {/* Loan Status */}
              <div className="mt-6 rounded-2xl border border-[#e7ece4] bg-[#fafbf9] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <CircleDollarSign
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                        Current Loan Status
                      </p>

                      <p className="mt-1 font-bold text-[#172018]">
                        {loan?.loanStatus ?? "Unknown"}
                      </p>
                    </div>
                  </div>

                  {receipt?.active && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Receipt Active
                    </div>
                  )}
                </div>
              </div>

              {/* Loan Button */}
              <button
                disabled
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white opacity-50"
              >
                <Landmark size={17} />

                Apply for Instant Loan
              </button>

              <div className="mt-3 flex items-center justify-center gap-2">
                <ShieldCheck
                  size={13}
                  className="text-gray-400"
                />

                <p className="text-center text-[10px] text-gray-400">
                  Loan transaction will be connected to the smart
                  contract.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}