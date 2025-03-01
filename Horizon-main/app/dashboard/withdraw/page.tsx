'use client'

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function WithdrawPage() {
  const router = useRouter()

  return (
    <main className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-gradient-to-br from-[#0d2339]/90 to-[#132f4c]/90 border-gray-800/50 shadow-xl p-8">
          <motion.div className="text-center space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Complete KYC First
            </h1>
            <p className="text-lg text-gray-300">
              You need to complete KYC verification before accessing withdrawal features
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Button 
                onClick={() => router.push('/dashboard/kyc')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                Complete KYC
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </main>
  )
}
