import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContextProvider } from "./components/Toast/ToastContextProvider";
import Toast from "./components/Toast/Toast";
import { DialogContextProvider } from "./components/Dialog/DialogContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metrics App",
  description: "Metrics application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-2`}
      >
        <ToastContextProvider>
          <DialogContextProvider>
            {children}
            <Toast />
          </DialogContextProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
