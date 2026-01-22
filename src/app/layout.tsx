import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "NextJs Starter Kit",
  description: "Made by Aceiny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <NextTopLoader />
            {children}
            <Toaster
              position="top-right"
              duration={3000}
              richColors
              closeButton
              visibleToasts={5}
            />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
