"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AdminOverview } from "@/components/admin-overview"
import { AdminTables } from "@/components/admin-tables"

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState<
    "users" | "orders" | "completedOrders" | "failedOrders" | null
  >(null)

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
      </div>


      <div className="container py-6 px-4 md:px-6 relative z-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-[#0d2339]/90 to-[#132f4c]/90 rounded-xl border border-gray-800/50 p-6 backdrop-blur-sm shadow-xl"
        >
          <AdminOverview onSelectSection={setSelectedSection} selectedSection={selectedSection} />
        </motion.div>

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