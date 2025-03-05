import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-[#0a1929]">
          {/* Fixed Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 md:pl-80"> {/* Make padding responsive */}
            <div className="relative min-h-screen">
              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 pt-16 md:pt-0"> {/* Add top padding for mobile menu */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
