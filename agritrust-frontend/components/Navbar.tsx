"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Warehouse,
  UserRound,
  Leaf,
  ShieldCheck,
  Activity,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#dfe5dc] bg-white lg:block">
      <div className="flex h-full flex-col">

        {/* Brand */}
        <div className="border-b border-[#e8ece5] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#176b3a] shadow-sm">
              <Leaf size={22} strokeWidth={2.2} className="text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#172018]">
                AgriTrust
              </h1>

              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                Agricultural Finance
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
            Workspace
          </p>

          <nav className="space-y-1.5">

            {/* Dashboard */}
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl bg-[#eaf3eb] px-4 py-3 text-sm font-semibold text-[#176b3a] transition-all hover:bg-[#e1efe3]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/80">
                <LayoutDashboard size={17} strokeWidth={2} />
              </div>

              <span>Dashboard</span>

              <ChevronRight
                size={14}
                className="ml-auto text-[#176b3a]"
              />
            </Link>

            {/* Warehouse */}
            <Link
              href="/manager"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-[#f5f8f4] hover:text-[#176b3a]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 transition group-hover:bg-green-50">
                <Warehouse size={17} strokeWidth={2} />
              </div>

              <span>Warehouse</span>

              <ChevronRight
                size={14}
                className="ml-auto text-transparent transition group-hover:text-[#176b3a]"
              />
            </Link>

            {/* Farmer Portal */}
            <Link
              href="/farmer"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-[#f5f8f4] hover:text-[#176b3a]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 transition group-hover:bg-green-50">
                <UserRound size={17} strokeWidth={2} />
              </div>

              <span>Farmer Portal</span>

              <ChevronRight
                size={14}
                className="ml-auto text-transparent transition group-hover:text-[#176b3a]"
              />
            </Link>
          </nav>

          {/* Platform */}
          <div className="mt-9">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              Platform
            </p>

            <div className="rounded-2xl border border-[#e7ece4] bg-[#fafbf9] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
                  <Activity
                    size={16}
                    strokeWidth={2}
                    className="text-[#176b3a]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#172018]">
                    Monitoring
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                    <span className="text-[10px] font-medium text-green-700">
                      Live sensor network
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-[#e8ece5] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Sensor status
                  </span>

                  <span className="text-[10px] font-bold text-green-600">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="border-t border-[#e8ece5] p-5">
          <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <ShieldCheck
                  size={17}
                  strokeWidth={2}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-[#172018]">
                  Storage Network
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <span className="text-[10px] font-medium text-green-700">
                    System operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
            <span className="text-[9px] text-gray-400">
              AgriTrust
            </span>

            <span className="text-[9px] font-medium text-gray-400">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}