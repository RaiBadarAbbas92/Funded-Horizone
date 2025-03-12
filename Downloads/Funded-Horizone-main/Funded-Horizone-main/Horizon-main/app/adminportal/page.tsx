"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // If using App Router, otherwise "next/router"
import { motion } from "framer-motion"
import { AdminOverview } from "@/components/admin-overview"
import { AdminTables } from "@/components/admin-tables"

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState<"users" | "orders" | "completedOrders" | "failedOrders" | null>(null)
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin-token")
      setIsAuthenticated(token === "abut")
      if (token !== "abut") {
        router.push("/login")
      }
    }
  }, [router])

  if (isAuthenticated === null) {
    return <div className="text-white text-center mt-10">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#0a1929]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
      </div>

      <div className="container py-6 px-4 md:px-6 relative z-10">
        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        
        {/* Admin Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-[#0d2339]/90 to-[#132f4c]/90 rounded-xl border border-gray-800/50 p-6 backdrop-blur-sm shadow-xl"
        >
          <AdminOverview onSelectSection={setSelectedSection} selectedSection={selectedSection} />
        </motion.div>

        {/* Admin Tables */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AdminTables selectedSection={selectedSection} />
        </motion.div>
      </div>
    </div>
  )
}
