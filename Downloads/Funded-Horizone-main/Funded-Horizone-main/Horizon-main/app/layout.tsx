import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MetaPixel from './components/MetaPixel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Funded Horizon',
  description: 'Professional Trading Prop Firm',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <MetaPixel />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
