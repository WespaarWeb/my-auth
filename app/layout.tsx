import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import "./globals.scss";

export const metadata: Metadata = {
  title: "سامانه احراز هویت",
  description: "صفحه ورود و داشبورد کاربری",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
