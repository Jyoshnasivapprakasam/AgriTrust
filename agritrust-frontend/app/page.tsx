"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CloudSun,
  Droplets,
  Leaf,
  Thermometer,
  TrendingDown,
  Wheat,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#17251b]">
      {/* Header */}
      <header className="border-b border-[#dfe5d9] bg-[#fbfcf8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f5c3a] text-white">
              <Leaf size={21} strokeWidth={2} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#173c27]">
                AgriTrust
              </h1>
              <p className="hidden text-xs text-[#718073] sm:block">
                Smart Paddy Storage & Financing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs font-medium text-[#5d6d61] sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3f9b61] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3f9b61]" />
              </span>
              Live Monitoring
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#b9d9c2] bg-[#edf8ef] px-3 py-1.5 text-xs font-semibold text-[#287044]">
              <span className="h-2 w-2 rounded-full bg-[#3f9b61]" />
              System Online
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* Heading */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#edf3e9] px-3 py-1 text-xs font-semibold text-[#3d6849]">
                <Activity size={13} />
                Storage Overview
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#183a27] sm:text-4xl">
                Paddy Storage Dashboard
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68766b] sm:text-base">
                Monitor storage conditions and track paddy drying progress in
                real time.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-[#879287]">
                Last updated
              </p>
              <p className="mt-1 text-sm font-semibold text-[#3f5044]">
                Just now
              </p>
            </div>
          </div>
        </section>

        {/* Sensor Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Moisture */}
          <div className="rounded-2xl border border-[#dfe5d9] bg-white p-5 shadow-[0_2px_10px_rgba(30,60,40,0.04)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf7ef] text-[#2f7a4a]">
                  <Droplets size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#536158]">
                    Paddy Moisture
                  </p>
                  <p className="text-xs text-[#89948b]">
                    Safe level ≤ 14%
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#edf8ef] px-2.5 py-1 text-xs font-semibold text-[#2d7747]">
                Good
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <p className="text-3xl font-bold tracking-tight text-[#173c27]">
                16.5%
              </p>

              <div className="flex items-center gap-1 text-xs font-medium text-[#a66b16]">
                <TrendingDown size={14} />
                Drying
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e9eee8]">
              <div className="h-full w-[68%] rounded-full bg-[#d7a83e]" />
            </div>
          </div>

          {/* Temperature */}
          <div className="rounded-2xl border border-[#dfe5d9] bg-white p-5 shadow-[0_2px_10px_rgba(30,60,40,0.04)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff5df] text-[#b17b1e]">
                  <Thermometer size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#536158]">
                    Temperature
                  </p>
                  <p className="text-xs text-[#89948b]">
                    Warehouse ambient
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#f4f7f1] px-2.5 py-1 text-xs font-semibold text-[#55705c]">
                Normal
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <p className="text-3xl font-bold tracking-tight text-[#173c27]">
                29.4°C
              </p>

              <div className="text-xs font-medium text-[#718073]">
                Stable
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e9eee8]">
              <div className="h-full w-[58%] rounded-full bg-[#b88a2e]" />
            </div>
          </div>

          {/* Humidity */}
          <div className="rounded-2xl border border-[#dfe5d9] bg-white p-5 shadow-[0_2px_10px_rgba(30,60,40,0.04)] sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4f7] text-[#4d7d8c]">
                  <CloudSun size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#536158]">
                    Humidity
                  </p>
                  <p className="text-xs text-[#89948b]">
                    Warehouse ambient
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#f4f7f1] px-2.5 py-1 text-xs font-semibold text-[#55705c]">
                Normal
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <p className="text-3xl font-bold tracking-tight text-[#173c27]">
                68%
              </p>

              <div className="text-xs font-medium text-[#718073]">
                Stable
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e9eee8]">
              <div className="h-full w-[68%] rounded-full bg-[#5d8a96]" />
            </div>
          </div>
        </section>

        {/* Storage Status */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#cdddcf] bg-white shadow-[0_3px_14px_rgba(30,60,40,0.05)]">
          <div className="grid lg:grid-cols-[1fr_280px]">

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf8ef] text-[#2f7a4a]">
                    <Wheat size={24} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#758378]">
                      Storage Status
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#173c27]">
                      Drying in Progress
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#68766b]">
                      Paddy moisture is gradually decreasing. Current
                      conditions are being monitored until the safe storage
                      level is reached.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#fff7e4] px-4 py-3 text-center sm:min-w-[100px]">
                  <p className="text-2xl font-bold text-[#9a6819]">72%</p>
                  <p className="text-xs font-medium text-[#997b4b]">
                    Drying Progress
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between text-xs font-medium">
                  <span className="text-[#637067]">
                    Progress to safe storage
                  </span>
                  <span className="text-[#2f6743]">72%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-[#e9eee7]">
                  <div className="h-full w-[72%] rounded-full bg-[#3d7c4e]" />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#69776d]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d7a83e]" />
                  Current moisture: 16.5%
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#3f9b61]" />
                  Target moisture: 14%
                </div>
              </div>
            </div>

            <div className="flex items-center border-t border-[#e4e9e1] bg-[#f4f8f2] p-6 lg:border-l lg:border-t-0">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#285d3b]">
                  <CheckCircle2 size={17} />
                  Monitoring Active
                </div>

                <p className="mt-2 text-sm leading-6 text-[#6c796f]">
                  Sensor readings are being monitored continuously to determine
                  when the paddy reaches safe storage conditions.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* How AgriTrust Works */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#718073]">
              Process
            </p>

            <h3 className="mt-1 text-xl font-bold text-[#183a27]">
              How AgriTrust Works
            </h3>
          </div>

          <div className="rounded-2xl border border-[#dfe5d9] bg-white p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4">

              {/* Step 1 */}
              <div className="relative flex gap-4 py-4 md:px-4 md:py-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3e9] text-sm font-bold text-[#2f6844]">
                  01
                </div>

                <div>
                  <h4 className="font-semibold text-[#294332]">
                    Paddy Intake
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#778279]">
                    Manager records incoming paddy.
                  </p>
                </div>

                <ArrowRight
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[#c7d1c5] md:block"
                  size={18}
                />
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-4 border-t border-[#edf0eb] py-4 md:border-t-0 md:px-4 md:py-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3e9] text-sm font-bold text-[#2f6844]">
                  02
                </div>

                <div>
                  <h4 className="font-semibold text-[#294332]">
                    Monitor
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#778279]">
                    Sensors track storage conditions.
                  </p>
                </div>

                <ArrowRight
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[#c7d1c5] md:block"
                  size={18}
                />
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-4 border-t border-[#edf0eb] py-4 md:border-t-0 md:px-4 md:py-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3e9] text-sm font-bold text-[#2f6844]">
                  03
                </div>

                <div>
                  <h4 className="font-semibold text-[#294332]">
                    e-NWR
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#778279]">
                    Safe paddy gets a digital receipt.
                  </p>
                </div>

                <ArrowRight
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[#c7d1c5] md:block"
                  size={18}
                />
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 border-t border-[#edf0eb] py-4 md:border-t-0 md:px-4 md:py-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff4d9] text-sm font-bold text-[#9b6c1d]">
                  04
                </div>

                <div>
                  <h4 className="font-semibold text-[#294332]">
                    Loan
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-[#778279]">
                    Farmer can initiate a loan request.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#dfe5d9] py-5 text-xs text-[#829087] sm:flex-row">
          <p>AgriTrust · Smart Agricultural Storage</p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3f9b61]" />
            System operating normally
          </div>
        </footer>

      </div>
    </main>
  );
}