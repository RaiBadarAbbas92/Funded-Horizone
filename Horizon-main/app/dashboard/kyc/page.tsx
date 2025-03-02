'use client'

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function KYCPage() {
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
              <Shield className="w-12 h-12 text-orange-400" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              KYC Verification Required
            </h1>
            
            <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
              Complete your KYC verification to unlock full platform features and ensure secure trading
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <CheckCircle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Identity Verification</h3>
                <p className="text-sm text-blue-200/70">Verify your identity with government-issued ID</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <CheckCircle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Address Proof</h3>
                <p className="text-sm text-blue-200/70">Confirm your residential address</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <CheckCircle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Bank Details</h3>
                <p className="text-sm text-blue-200/70">Link your bank account for transactions</p>
              </motion.div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-4">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <p className="text-sm text-blue-200/80">
                Complete verification within 5-10 minutes
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
