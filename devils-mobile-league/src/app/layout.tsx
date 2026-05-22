import type { Metadata } from "next"
import "./globals.css"

import { Navbar } from "@/components/layout/navbar"

export const metadata: Metadata = {
  title: "DEVILS MOBILE LEAGUE",
  description: "XTREINOS MOBILE",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}