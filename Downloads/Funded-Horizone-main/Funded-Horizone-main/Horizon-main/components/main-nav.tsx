"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Activity, BarChart3, Home, Settings, Users, Shield } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  {
    title: "Trading",
    href: "/dashboard/trading",
    icon: Activity
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    adminOnly: true
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  },
  {
    title: "Admin",
    href: "/dashboard/admin",
    icon: Shield,
    adminOnly: true
  }
]

interface MainNavProps {
  isAdmin?: boolean
}

export function MainNav({ isAdmin }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems
        .filter(item => !item.adminOnly || (item.adminOnly && isAdmin))
        .map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-orange-500" : "text-muted-foreground"
              )}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-orange-500"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Button>
            </Link>
          )
        })}
    </nav>
  )
}

