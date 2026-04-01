import type React from "react"
import type { Metadata } from "next"
import { Syne } from "next/font/google"
import { Outfit } from "next/font/google"
import "./globals.css"
import { CommandPalette } from "@/components/command-palette"
import { Toaster } from "sonner"

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "WorkflowHub - n8n Automation Platform",
  description: "Discover, share, and automate workflows with n8n. Join our community of automation enthusiasts.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} antialiased`}>
      <body>
        {children}
        <CommandPalette />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
