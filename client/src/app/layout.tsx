import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScreenSizeIndicator from "@/components/ScreenSizeIndicator";
import {ThemeProvider} from "../providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { Provider as NextAuthProvider } from "next-auth/client";
import {SessionProvider} from "next-auth/react";
import {session} from "next-auth/core/routes";


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
  children,session
}: Readonly<{
  children: React.ReactNode;
  session:any;
}>) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >

        <AuthProvider session={session}>
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
        </AuthProvider>


        </body>
        </html>
  );
}
