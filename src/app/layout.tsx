import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MainNav from "@/components/main-nav"
import MainFooter from "@/components/main-footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Diccionario Kogui",
  description: "Diccionario de palabras y oraciones de la lengua Kogui",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MainNav />
          {children}
          <MainFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}

