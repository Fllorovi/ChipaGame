
import type { Metadata } from "next";
import type { ReactNode } from "react";
import DisqualificationGuard from "@/components/auth/DisqualificationGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChipaGame — командная игра",
  description:
    "ChipaGame — командная игра. Собери команду и проверь свои знания.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <DisqualificationGuard />
        {children}
      </body>
    </html>
  );
}
