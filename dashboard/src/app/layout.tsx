import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptAImum Command Center",
  description: "Unified monitoring dashboard for the OptAImum AI company stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
