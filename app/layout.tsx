import type { Metadata } from 'next'
import { Poppins, Space_Grotesk, Inter, Inter_Tight } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-family'
})

export const metadata: Metadata = {
  title: 'Fit AI',
  description: 'O app que vai transformar a forma como você treina.',
  icons: {
    icon: '/icons/favicon_rounded.png',
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} ${interTight.variable} ${inter.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
