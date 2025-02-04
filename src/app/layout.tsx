import type { Metadata } from "next";
import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { ReduxProvider } from "./ReduxProviders";
import { App } from "antd";
import RQueryProviders from "./RQueryProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Product Management",
  description: "Generated by muatmuat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-row min-h-screen justify-center items-center bg-slate-400">
          <div
            className="bg-white rounded-md w-11/12 md:w-4/6 p-4 md:p-10"
            style={{ minHeight: 600 }}
          >
            <AntdRegistry>
              <ReduxProvider>
                <RQueryProviders>
                  <App>{children}</App>
                </RQueryProviders>
              </ReduxProvider>
            </AntdRegistry>
          </div>
        </div>
      </body>
    </html>
  );
}
