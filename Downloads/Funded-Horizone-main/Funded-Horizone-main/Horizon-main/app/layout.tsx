import type { Metadata } from 'next'
import './globals.css'
import MetaPixel from './components/MetaPixel'
export const metadata: Metadata = {
  title: 'FundedHorizon',
  description: 'Created with v0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <MetaPixel />
      <body>{children}</body>
    </html>
  )
}
