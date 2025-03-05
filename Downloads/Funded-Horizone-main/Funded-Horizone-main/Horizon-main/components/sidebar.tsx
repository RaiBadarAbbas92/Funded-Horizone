"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  CreditCard, 
  LogOut, 
  Menu, 
  ShoppingCart,
  Settings
} from "lucide-react"

const dashboardItems = [
  { 
    icon: ShoppingCart, 
    label: "Buy", 
    href: "/dashboard/buy",
    description: "Purchase trading challenges"
  },
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/dashboard",
    description: "Trading overview and statistics"
  },
  { 
    icon: Users, 
    label: "Referral", 
    href: "/dashboard/referal",
    description: "Manage your referrals"
  },
  { 
    icon: FileCheck, 
    label: "KYC", 
    href: "/dashboard/kyc",
    description: "Identity verification"
  },
  { 
    icon: CreditCard, 
    label: "Withdraw", 
    href: "/dashboard/withdraw",
    description: "Withdraw your profits"
  }
]

const adminItems = [
  {
    icon: Settings,
    label: "Admin",
    href: "/adminportal",
    description: "Admin Portal"
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const isAdminPortal = pathname.startsWith('/adminportal')
  const sidebarItems = isAdminPortal ? adminItems : dashboardItems
  const sidebarWidth = isAdminPortal ? 'w-64' : 'w-80'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/sigin')
  }

  const SidebarContent = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="relative h-24 flex items-center justify-center bg-gradient-to-br from-[#0A1428] to-[#1E3A5F]">
          <Link 
            href={isAdminPortal ? "/adminportal" : "/dashboard"} 
            className="text-4xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent hover:from-orange-300 hover:to-orange-500 transition-all duration-500"
          >
            Funded Horizon
          </Link>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setIsHovered(item.href)}
              onMouseLeave={() => setIsHovered(null)}
              className="relative block group"
            >
              <div
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm",
                  pathname === item.href
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-lg shadow-orange-500/20"
                    : "text-slate-300 hover:bg-[#1E3A5F]/50 hover:text-white hover:translate-x-1",
                  isHovered === item.href && "scale-[1.02]"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-all duration-500",
                  isHovered === item.href && "scale-110 text-orange-400",
                  pathname === item.href && "animate-pulse"
                )} />
                <div>
                  <span className="font-medium tracking-wide">{item.label}</span>
                  {isHovered === item.href && (
                    <p className="text-xs text-slate-400">{item.description}</p>
                  )}
                </div>
                {pathname === item.href && (
                  <div className="absolute right-4 w-1.5 h-6 rounded-full bg-gradient-to-b from-orange-400 to-orange-600" />
                )}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-left text-slate-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-300 group backdrop-blur-sm"
          >
            <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium tracking-wide">Logout</span>
          </button>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden bg-[#0d2339]/80 backdrop-blur-sm border border-gray-800/50"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>

        {/* Mobile Drawer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className={`${sidebarWidth} p-0 bg-[#0d2339] border-r border-gray-800/50`}>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className={`hidden md:block fixed inset-y-0 left-0 ${sidebarWidth} bg-[#0d2339] border-r border-gray-800/50`}>
          <SidebarContent />
        </div>
      </>
    )
  }

  return (
    <div className={`hidden md:block fixed left-0 top-0 h-screen ${sidebarWidth} bg-gradient-to-br from-[#0A1428] to-[#1E3A5F] text-white border-r border-orange-500/20 shadow-2xl`}>
      <SidebarContent />
    </div>
  )
}
