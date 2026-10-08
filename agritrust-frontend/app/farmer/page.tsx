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

  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      <div className="mx-auto max-w-[1400px] px-5 py-7 md:px-8 lg:py-9">

        {/* Page Header */}
        <header className="border-b border-[#dfe5dc] pb-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#176b3a]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f3eb]">
                  <Coins size={14} />
                </span>

                Farmer Portal
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#172018] md:text-4xl">
                e-NWR & Pledge Financing
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b756c]">
                Manage your digital warehouse receipt and view
                financing information against your stored paddy.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-[#dfe5dc] bg-white px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f3eb]">
                <ShieldCheck
                  size={17}
                  className="text-[#176b3a]"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-[#172018]">
                  Digital Asset
                </p>

                <p className="mt-0.5 text-[10px] text-[#8a928b]">
                  Secure & verifiable
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-start gap-3 border-l-4 border-red-500 bg-red-50 px-5 py-4 text-sm text-red-700">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center border border-[#dfe5dc] bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f3eb]">
              <RefreshCw
                size={22}
                className="animate-spin text-[#176b3a]"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#172018]">
              Loading farmer information...
            </p>

            <p className="mt-1 text-xs text-[#8a928b]">
              Fetching receipt and financing status.
            </p>
          </div>
        )}

        {!loading && (
          <div className="mt-7 space-y-5">

            {/* Wallet */}
            <section className="border border-[#dfe5dc] bg-white">
              <div className="flex flex-col justify-between gap-5 px-6 py-5 md:flex-row md:items-center md:px-7">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                    <Wallet
                      size={21}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-[#172018]">
                        Farmer Wallet
                      </h2>

                      {wallet && (
                        <span className="flex items-center gap-1.5 rounded-full bg-[#e8f3eb] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#176b3a]">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Connected
                        </span>
                      )}
                    </div>

                    {wallet ? (
                      <p className="mt-1 text-xs text-[#176b3a]">
                        {wallet.slice(0, 6)}...
                        {wallet.slice(-4)}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-[#6b756c]">
                        Connect MetaMask to access your wallet.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={connectWallet}
                  className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition ${
                    wallet
                      ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      : "bg-[#176b3a] text-white hover:bg-[#11552d]"
                  }`}
                >
                  <Wallet size={15} />

                  {wallet
                    ? "Wallet Connected"
                    : "Connect MetaMask"}
                </button>
              </div>
            </section>

            {/* Main Content */}
            <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

              {/* e-NWR Receipt */}
              {receipt && (
                <section className="border border-[#dfe5dc] bg-white">

                  <div className="flex flex-col justify-between gap-4 border-b border-[#edf0eb] px-6 py-5 sm:flex-row sm:items-center md:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f3eb]">
                        <FileText
                          size={20}
                          className="text-[#176b3a]"
                        />
                      </div>

                      <div>
                        <h2 className="font-bold text-[#172018]">
                          e-NWR Receipt
                        </h2>

                        <p className="mt-0.5 text-xs text-[#8a928b]">
                          Digital warehouse receipt
                        </p>
                      </div>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
                      <CheckCircle2
                        size={13}
                        className="text-green-600"
                      />

                      <span className="text-[9px] font-bold uppercase tracking-wide text-green-700">
                        {receipt.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-px bg-[#edf0eb] sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                        Token ID
                      </p>

                      <p className="mt-2 text-xl font-bold text-[#172018]">
                        #{receipt.tokenId}
                      </p>
                    </div>

                    <div className="bg-white p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                        Farmer
                      </p>

                      <p className="mt-2 truncate text-sm font-semibold text-[#172018]">
                        {receipt.farmer}
                      </p>
                    </div>

                    <div className="bg-white p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                        Commodity
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#172018]">
                        {receipt.commodity}
                      </p>
                    </div>

                    <div className="bg-white p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                        Quantity
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#172018]">
                        {receipt.quantity}
                      </p>
                    </div>

                    <div className="bg-white p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                        Stored Value
                      </p>

                      <p className="mt-2 text-sm font-bold text-[#176b3a]">
                        ₹{Number(
                          receipt.value
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-[#f6faf6] p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#176b3a]">
                        Receipt Status
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <CheckCircle2
                          size={16}
                          className="text-green-600"
                        />

                        <span className="text-sm font-semibold text-green-700">
                          {receipt.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Financing */}
              <section className="border border-[#dfe5dc] bg-white">

                <div className="flex items-center justify-between border-b border-[#edf0eb] px-6 py-5 md:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Landmark
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#172018]">
                        Pledge Financing
                      </h2>

                      <p className="mt-0.5 text-xs text-[#8a928b]">
                        Financing against stored paddy
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700 sm:block">
                    Asset-backed
                  </span>
                </div>

                <div className="p-6 md:p-7">
                  <div className="border border-[#e7ece4] bg-[#fafbf9] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <CircleDollarSign
                          size={20}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                          Current Loan Status
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#172018]">
                          {loan?.loanStatus ?? "Unknown"}
                        </p>
                      </div>
                    </div>

                    {receipt?.active && (
                      <div className="mt-5 flex items-center gap-2 border-t border-[#e7ece4] pt-4 text-xs font-semibold text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Receipt Active
                      </div>
                    )}
                  </div>

                  <button
                    disabled
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white opacity-50"
                  >
                    <Landmark size={16} />
                    Apply for Instant Loan
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <ShieldCheck
                      size={12}
                      className="text-[#8a928b]"
                    />

                    <p className="text-center text-[10px] text-[#8a928b]">
                      Loan transaction will be connected to the
                      smart contract.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}