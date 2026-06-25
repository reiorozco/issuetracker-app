import React, { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "@/app/NavBar";
import QueryClientProvider from "@/app/QueryClientProvider";
import AuthProvider from "@/app/auth/Provider";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://issue-tracker-app-blue.vercel.app"),
  title: "Issue Tracker",
  description:
    "Full-stack issue tracking dashboard built with Next.js, Prisma and MySQL.",
  openGraph: {
    title: "Issue Tracker — Next.js Full-Stack Dashboard",
    description:
      "Issue tracking dashboard with charts, filtering, sorting, pagination and a status workflow. Next.js 15 (App Router), Prisma, MySQL and NextAuth.",
    url: "https://issue-tracker-app-blue.vercel.app",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme>
              <NavBar />

              <main className="px-6">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
