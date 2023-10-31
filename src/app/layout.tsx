"use client"

import { Hanken_Grotesk } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import { Container, Theme } from "@radix-ui/themes"
import Navigation from "@/components/Navigation"
import { SessionProvider } from "next-auth/react"

const hkGrotesk = Hanken_Grotesk({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={hkGrotesk.className}>
        <Theme>
          <SessionProvider>
            <div className='flex flex-col min-h-screen'>
              <div className='flex-1'>
                <Navigation />
                <Container>{children}</Container>
              </div>
            </div>
          </SessionProvider>
        </Theme>
      </body>
    </html>
  )
}
