import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/header";
import { AuthProvider } from "@descope/nextjs-sdk";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Care crew",
  description: "A web application to search and find home service personnel",
};
const descopeProjectId = process.env.NEXT_PUBLIC_DISCOPE_PROJECT_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider projectId={descopeProjectId}>
      <html lang="en">
        <body className={inter.className}>
          <div className="px-4 md:px-12 lg:px20">
            <Header />
            {children}
            <Toaster />
          </div>
          </body>
      </html> 
    </AuthProvider>
  );
}
