import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ScreenSizeIndicator from "@/components/ui/ScreenSizeIndicator";
import {ThemeProvider} from "../../providers/theme-provider";
import QueryProvider from "@/providers/query-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Coding blog",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >

        <QueryProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                    <Navbar/>
                    {children}
                    <ScreenSizeIndicator/>
            </ThemeProvider>
        </QueryProvider>



        </body>
        </html>
  );
}
