import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ScreenSizeIndicator from "@/components/ui/ScreenSizeIndicator";
import {ThemeProvider} from "../providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';


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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
    const locale = await getLocale();
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
        <NextIntlClientProvider messages={messages}>

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
        </NextIntlClientProvider>

        </body>
        </html>
  );
}
