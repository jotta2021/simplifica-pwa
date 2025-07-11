import type { Metadata ,Viewport} from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ContextProvider from "@/contexts/context";
import Script from "next/script"
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
   <Script
            src="https://chatwoot-chatwoot.xk0rrp.easypanel.host/packs/js/sdk.js"
            strategy="lazyOnload"
            onLoad={() => {
              // @ts-ignore
              window.chatwootSDK.run({
                websiteToken: "8ZwprhTCJSCtgWKSUFrduUFx",
                baseUrl: "https://chatwoot-chatwoot.xk0rrp.easypanel.host",
              })
            }}
          />
        
        {children}
        <Toaster richColors theme='light' position='top-right' />
      </body>
    </html>
    </ContextProvider>
   
  );
}
