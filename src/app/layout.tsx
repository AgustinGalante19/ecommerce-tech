import type { Metadata } from "next"
import { Hanken_Grotesk } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import { Container, Theme } from "@radix-ui/themes"
import Navigation from "@/components/Navigation"

const hkGrotesk = Hanken_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommer site using Nextjs 13!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={hkGrotesk.className}>
        <Theme>
          <div className='flex flex-col min-h-screen'>
            <div className='flex-1'>
              <Navigation />
              <Container>{children}</Container>
            </div>
          </div>
        </Theme>
      </body>
    </html>
  )
}
