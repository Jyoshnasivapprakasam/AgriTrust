import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriTrust | Smart Agricultural Storage",
  description:
    "AgriTrust is a smart agricultural storage and financing platform for monitoring grain quality, storage conditions, digital receipts, and agricultural financing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}