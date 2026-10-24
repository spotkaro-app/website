import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPOTKARO — Can't go there? Check it.",
  description:
    "Need something checked? Ask someone nearby. Or complete local tasks and earn money.",
  themeColor: "#11110f",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}