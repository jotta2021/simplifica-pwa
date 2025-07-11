import type { Metadata ,Viewport} from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ContextProvider from "@/contexts/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
  types,
}: Readonly<{
  children: React.ReactNode;
  types: React.ReactNode;
}>) {
  return (
    <ContextProvider>
       <html lang="pt-BR" translate='no'>
      <title>Simplifica - Finanças Pessoais</title>
      <meta name="description" content="Simplifica é um sistema de finanças pessoais que permite você gerenciar suas finanças de forma simples e eficiente." />
      <link rel="icon" href="/icon.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  
        
        {children}
        <Toaster richColors theme='light' position='top-right' />
      </body>
    </html>
    </ContextProvider>
   
  );
}
