import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello - Deployed by infra.new",
  description: "Hello world app deployed by infra.new",
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
