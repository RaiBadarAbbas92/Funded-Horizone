'use client'

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LockKeyhole, ArrowRight, AlertTriangle, ShieldCheck, Wallet } from 'lucide-react'

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
        <Card className="bg-gradient-to-br from-[#0d2339]/90 to-[#132f4c]/90 border border-white/10 shadow-2xl rounded-2xl p-8 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-8"
          >
            <div className="inline-block p-3 bg-orange-500/10 rounded-full mb-6">
              <LockKeyhole className="w-12 h-12 text-orange-400" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Verify Your Account First
            </h1>
            
            <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
              Complete your account verification to unlock withdrawal features and ensure secure transactions
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <ShieldCheck className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Account Security</h3>
                <p className="text-sm text-blue-200/70">Protect your funds with verified account status</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <Wallet className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Secure Withdrawals</h3>
                <p className="text-sm text-blue-200/70">Access fast and secure withdrawal methods</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={() => router.push('/dashboard/kyc')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Complete Verification
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>

            <div className="mt-8 flex items-center justify-center gap-4 bg-orange-500/5 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <p className="text-sm text-blue-200/80">
                Verification is required for all withdrawal requests
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
