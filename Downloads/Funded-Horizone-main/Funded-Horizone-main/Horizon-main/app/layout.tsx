import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MetaPixel from './components/MetaPixel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Funded Horizon',
  description: 'Your trusted partner in forex trading challenges',
  icons: {
    icon: [
      {
        url: '/icon.png',
        href: '/icon.png',
      }
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    shortcut: ['/icon.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <MetaPixel />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
