'use client'

import { Header } from "@/components/header";
import { motion } from "framer-motion";
import { AlertCircle } from 'lucide-react';

export default function KYCPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
          Complete Challenges to Get Your KYC
        </h1>
        <div className="mt-12 flex items-center justify-center gap-4">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          <p className="text-sm text-blue-200/80">
            Complete verification within 5-10 minutes
          </p>
        </div>
      </motion.div>
    </div>
  )
}
