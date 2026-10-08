"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Loader2,
  Package,
  ShieldCheck,
  Warehouse,
} from "lucide-react";

interface ReceiptResponse {
  tokenId?: number | string;
  farmer?: string;
  commodity?: string;
  quantity?: number;
  value?: number;
  active?: boolean;
  status?: string;
}

export default function ManagerPage() {
  const [farmer, setFarmer] = useState("");
  const [commodity, setCommodity] = useState("Paddy");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] =
    useState<ReceiptResponse | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");
    setReceipt(null);

    try {
      const response = await fetch("/api/receipt", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          farmer,
          commodity,
          quantity: Number(quantity),
          value: Number(value),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create receipt");
      }

      const data: ReceiptResponse =
        await response.json();

      setReceipt(data);

      setMessage(
        "Paddy intake and e-NWR receipt created successfully."
      );

      setFarmer("");
      setQuantity("");
      setValue("");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the backend. Make sure it is running on port 5000."
      );
    } finally {
      setLoading(false);
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
                <Warehouse size={15} />
              </span>

              Warehouse Manager
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#172018] md:text-[32px]">
              Paddy Intake Portal
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Record incoming paddy, verify the storage asset, and
              create its digital receipt.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#dfe5dc] bg-white px-4 py-3 shadow-sm">
            <ShieldCheck
              size={17}
              className="text-[#176b3a]"
            />

            <div>
              <p className="text-xs font-bold text-[#172018]">
                Secure Intake
              </p>

              <p className="text-[10px] text-gray-400">
                e-NWR enabled
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_340px]">

          {/* Intake Form */}
          <div className="rounded-2xl border border-[#dfe5dc] bg-white shadow-sm">
            <div className="border-b border-[#edf0eb] px-6 py-5 md:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                  <Package
                    size={21}
                    className="text-[#176b3a]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#172018]">
                    Intake Details
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Enter the physical paddy details below.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-6 py-6 md:px-7"
            >
              {/* Farmer */}
              <div>
                <label
                  htmlFor="farmer"
                  className="text-xs font-bold uppercase tracking-wide text-gray-500"
                >
                  Farmer Name
                </label>

                <input
                  id="farmer"
                  type="text"
                  value={farmer}
                  onChange={(event) =>
                    setFarmer(event.target.value)
                  }
                  placeholder="Enter farmer name"
                  required
                  className="mt-2 w-full rounded-xl border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#172018] outline-none transition placeholder:text-gray-400 focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-green-50"
                />
              </div>

              {/* Commodity */}
              <div>
                <label
                  htmlFor="commodity"
                  className="text-xs font-bold uppercase tracking-wide text-gray-500"
                >
                  Commodity
                </label>

                <select
                  id="commodity"
                  value={commodity}
                  onChange={(event) =>
                    setCommodity(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm font-medium text-[#172018] outline-none transition focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-green-50"
                >
                  <option value="Paddy">
                    Paddy
                  </option>
                </select>
              </div>

              {/* Quantity + Value */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="quantity"
                    className="text-xs font-bold uppercase tracking-wide text-gray-500"
                  >
                    Quantity
                  </label>

                  <input
                    id="quantity"
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(event.target.value)
                    }
                    placeholder="Enter quantity"
                    required
                    className="mt-2 w-full rounded-xl border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#172018] outline-none transition placeholder:text-gray-400 focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-green-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="value"
                    className="text-xs font-bold uppercase tracking-wide text-gray-500"
                  >
                    Paddy Value
                  </label>

                  <input
                    id="value"
                    type="number"
                    min="0"
                    value={value}
                    onChange={(event) =>
                      setValue(event.target.value)
                    }
                    placeholder="Enter value"
                    required
                    className="mt-2 w-full rounded-xl border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#172018] outline-none transition placeholder:text-gray-400 focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-green-50"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <span>{error}</span>
                </div>
              )}

              {/* Success */}
              {message && (
                <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm text-green-700">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{message}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b3a] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#11552d] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating Receipt...
                  </>
                ) : (
                  <>
                    <ClipboardCheck size={18} />

                    Verify Intake & Create Receipt
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-gray-400">
                The information will be submitted to the AgriTrust
                backend for receipt creation.
              </p>
            </form>
          </div>

          {/* Process Panel */}
          <div className="rounded-2xl border border-[#dfe5dc] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#172018]">
                  Intake Process
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  From physical grain to digital asset.
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
                <FileCheck2
                  size={17}
                  className="text-[#176b3a]"
                />
              </div>
            </div>

            <div className="mt-7 space-y-0">

              {/* Step 1 */}
              <div className="relative flex gap-4 pb-7">
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-[#176b3a]">
                  01
                </div>

                <div>
                  <p className="font-semibold text-[#172018]">
                    Record intake
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Enter the farmer, commodity, quantity and
                    declared value.
                  </p>
                </div>

                <span className="absolute left-[17px] top-9 h-10 w-px bg-[#e5ebe3]" />
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-4 pb-7">
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-[#176b3a]">
                  02
                </div>

                <div>
                  <p className="font-semibold text-[#172018]">
                    Create receipt
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    The backend creates the digital e-NWR receipt
                    for the stored commodity.
                  </p>
                </div>

                <span className="absolute left-[17px] top-9 h-10 w-px bg-[#e5ebe3]" />
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-[#176b3a]">
                  03
                </div>

                <div>
                  <p className="font-semibold text-[#172018]">
                    Monitor storage
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Sensor conditions continue to be tracked after
                    intake.
                  </p>
                </div>
              </div>
            </div>

            {/* Backend status */}
            <div className="mt-8 rounded-xl border border-[#e7ece4] bg-[#fafbf9] p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-xs font-bold text-[#172018]">
                  Backend connected
                </span>
              </div>

              <p className="mt-1.5 text-[10px] leading-4 text-gray-500">
                Receipt requests are processed through the AgriTrust
                backend on port 5000.
              </p>
            </div>
          </div>
        </div>

        {/* Created Receipt */}
        {receipt && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-green-100 bg-green-50/60 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <CheckCircle2
                    className="text-green-600"
                    size={21}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#172018]">
                    Receipt Created
                  </h2>

                  <p className="mt-0.5 text-xs text-green-700">
                    Paddy intake successfully registered.
                  </p>
                </div>
              </div>

              <span className="hidden rounded-full border border-green-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-green-700 sm:inline-flex">
                Created
              </span>
            </div>

            <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Token ID
                </p>

                <p className="mt-2 font-semibold text-[#172018]">
                  {receipt.tokenId ?? "Generated"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Farmer
                </p>

                <p className="mt-2 font-semibold text-[#172018]">
                  {receipt.farmer ?? farmer}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Quantity
                </p>

                <p className="mt-2 font-semibold text-[#172018]">
                  {receipt.quantity ?? quantity}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <p className="mt-2 font-semibold text-green-600">
                  {receipt.status ?? "Created"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}