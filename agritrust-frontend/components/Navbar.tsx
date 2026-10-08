"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center gap-2">
          <Leaf className="text-green-600" size={24} />

          <span className="text-xl font-bold text-gray-900">
            AgriTrust
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm">

          <Link
            href="/"
            className="text-gray-700 hover:text-green-600"
          >
            Dashboard
          </Link>

          <Link
            href="/manager"
            className="text-gray-700 hover:text-green-600"
          >
            Manager
          </Link>

          <Link
            href="/farmer"
            className="text-gray-700 hover:text-green-600"
          >
            Farmer
          </Link>

        </div>

      </div>
    </nav>
  );
}