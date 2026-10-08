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
  ArrowRight,
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

      <div className="mx-auto max-w-[1400px] px-5 py-7 md:px-8 lg:py-9">

        {/* Header */}
        <header className="border-b border-[#dfe5dc] pb-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#176b3a]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f3eb]">
                  <Warehouse size={14} />
                </span>

                Warehouse Manager
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#172018] md:text-4xl">
                Paddy Intake Portal
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b756c]">
                Record incoming paddy, verify the storage asset, and
                create its digital warehouse receipt.
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
                  Secure Intake
                </p>

                <p className="mt-0.5 text-[10px] text-[#8a928b]">
                  e-NWR enabled
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* Intake Form */}
          <section className="border border-[#dfe5dc] bg-white">

            <div className="border-b border-[#edf0eb] px-6 py-5 md:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f3eb]">
                  <Package
                    size={20}
                    className="text-[#176b3a]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#172018]">
                    Intake Details
                  </h2>

                  <p className="mt-0.5 text-xs text-[#8a928b]">
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
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b756c]"
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
                  className="mt-2 w-full rounded-lg border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#172018] outline-none transition placeholder:text-[#a0a8a1] focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-[#e8f3eb]"
                />
              </div>

              {/* Commodity */}
              <div>
                <label
                  htmlFor="commodity"
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b756c]"
                >
                  Commodity
                </label>

                <select
                  id="commodity"
                  value={commodity}
                  onChange={(event) =>
                    setCommodity(event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm font-medium text-[#172018] outline-none transition focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-[#e8f3eb]"
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
                    className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b756c]"
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
                    className="mt-2 w-full rounded-lg border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#172018] outline-none transition placeholder:text-[#a0a8a1] focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-[#e8f3eb]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="value"
                    className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b756c]"
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
                    className="mt-2 w-full rounded-lg border border-[#dfe5dc] bg-[#fafbf9] px-4 py-3 text-sm text-[#172018] outline-none transition placeholder:text-[#a0a8a1] focus:border-[#176b3a] focus:bg-white focus:ring-4 focus:ring-[#e8f3eb]"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 border-l-4 border-red-500 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <span>{error}</span>
                </div>
              )}

              {/* Success */}
              {message && (
                <div className="flex items-start gap-3 border-l-4 border-green-500 bg-green-50 px-4 py-3.5 text-sm text-green-700">
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#176b3a] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#11552d] disabled:cursor-not-allowed disabled:opacity-60"
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

              <p className="text-center text-[10px] text-[#8a928b]">
                The information will be submitted to the AgriTrust
                backend for receipt creation.
              </p>
            </form>
          </section>

          {/* Intake Process */}
          <section className="border border-[#dfe5dc] bg-white">

            <div className="border-b border-[#edf0eb] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#172018]">
                    Intake Process
                  </h2>

                  <p className="mt-1 text-xs text-[#8a928b]">
                    From physical grain to digital asset.
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f3eb]">
                  <FileCheck2
                    size={17}
                    className="text-[#176b3a]"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-6">

              {/* Step 1 */}
              <div className="relative flex gap-4 pb-8">
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f3eb] text-[10px] font-bold text-[#176b3a]">
                  01
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#172018]">
                    Record intake
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6b756c]">
                    Enter the farmer, commodity, quantity and
                    declared value.
                  </p>
                </div>

                <span className="absolute left-[17px] top-9 h-12 w-px bg-[#dfe5dc]" />
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-4 pb-8">
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f3eb] text-[10px] font-bold text-[#176b3a]">
                  02
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#172018]">
                    Create receipt
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6b756c]">
                    The backend creates the digital e-NWR receipt
                    for the stored commodity.
                  </p>
                </div>

                <span className="absolute left-[17px] top-9 h-12 w-px bg-[#dfe5dc]" />
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f3eb] text-[10px] font-bold text-[#176b3a]">
                  03
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#172018]">
                    Monitor storage
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6b756c]">
                    Sensor conditions continue to be tracked after
                    intake.
                  </p>
                </div>
              </div>

              {/* Backend Status */}
              <div className="mt-8 border border-[#e7ece4] bg-[#fafbf9] p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-xs font-bold text-[#172018]">
                    Backend connected
                  </span>
                </div>

                <p className="mt-1.5 text-[10px] leading-4 text-[#6b756c]">
                  Receipt requests are processed through the AgriTrust
                  backend on port 5000.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Created Receipt */}
        {receipt && (
          <section className="mt-5 overflow-hidden border border-green-200 bg-white">

            <div className="flex flex-col justify-between gap-4 border-b border-green-100 bg-green-50/60 px-6 py-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
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

              <span className="flex w-fit items-center gap-1.5 rounded-full border border-green-200 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-green-700">
                <CheckCircle2 size={12} />
                Created
              </span>
            </div>

            <div className="grid gap-px bg-[#edf0eb] sm:grid-cols-2 lg:grid-cols-4">

              <div className="bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                  Token ID
                </p>

                <p className="mt-2 text-lg font-bold text-[#172018]">
                  {receipt.tokenId ?? "Generated"}
                </p>
              </div>

              <div className="bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                  Farmer
                </p>

                <p className="mt-2 truncate text-sm font-semibold text-[#172018]">
                  {receipt.farmer ?? farmer}
                </p>
              </div>

              <div className="bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                  Quantity
                </p>

                <p className="mt-2 text-sm font-semibold text-[#172018]">
                  {receipt.quantity ?? quantity}
                </p>
              </div>

              <div className="bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a928b]">
                  Status
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {receipt.status ?? "Created"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-[#edf0eb] px-6 py-3.5 text-[10px] text-[#8a928b]">
              <ArrowRight size={13} />
              Digital receipt is now available in the Farmer Portal.
            </div>
          </section>
        )}
      </div>
    </main>
  );
}