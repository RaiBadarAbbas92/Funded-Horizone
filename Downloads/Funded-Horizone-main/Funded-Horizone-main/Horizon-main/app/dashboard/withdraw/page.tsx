'use client'

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function WithdrawPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Get KYC key to access Withdraw
        </h1>
      </motion.div>
    </div>
  )
}
