"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Warehouse,
  UserRound,
  Leaf,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function Navbar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#dfe5dc] bg-white lg:block">
      <div className="flex h-full flex-col">

        {/* Logo */}
        <div className="border-b border-[#e8ece5] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#176b3a] shadow-sm">
              <Leaf size={22} className="text-white" />
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
        <div className="flex-1 px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
            Workspace
          </p>

          <nav className="space-y-1.5">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl bg-[#eaf3eb] px-4 py-3 text-sm font-semibold text-[#176b3a] transition-all hover:bg-[#e1efe3]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/70">
                <LayoutDashboard size={17} />
              </div>

              <span>Dashboard</span>

              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#176b3a]" />
            </Link>

            <Link
              href="/manager"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-[#f5f8f4] hover:text-[#176b3a]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 transition group-hover:bg-green-50">
                <Warehouse size={17} />
              </div>

              <span>Warehouse</span>
            </Link>

            <Link
              href="/farmer"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-[#f5f8f4] hover:text-[#176b3a]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 transition group-hover:bg-green-50">
                <UserRound size={17} />
              </div>

              <span>Farmer Portal</span>
            </Link>
          </nav>

          {/* Platform */}
          <div className="mt-9">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
              Platform
            </p>

            <div className="rounded-2xl border border-[#e7ece4] bg-[#fafbf9] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                  <Activity
                    size={15}
                    className="text-[#176b3a]"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#172018]">
                    Monitoring
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Live sensor network
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="border-t border-[#e8ece5] p-5">
          <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <ShieldCheck
                  size={17}
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

          <p className="mt-4 text-center text-[9px] text-gray-400">
            AgriTrust v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}