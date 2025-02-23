'use client'

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KYCPage() {
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
              Know Your Customer
            </h1>
            <p className="text-lg text-gray-300">
              Complete your verification to unlock full platform features
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: <Shield className="h-12 w-12 text-blue-400" />,
                  title: "Identity Verification",
                  description: "Upload a valid government-issued ID"
                },
                {
                  icon: <Upload className="h-12 w-12 text-purple-400" />,
                  title: "Address Proof",
                  description: "Recent utility bill or bank statement"
                },
                {
                  icon: <CheckCircle className="h-12 w-12 text-green-400" />,
                  title: "Face Verification",
                  description: "Quick selfie verification process"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className="bg-white/5 rounded-xl p-6 text-center"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                Start Verification
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </main>
  )
}
