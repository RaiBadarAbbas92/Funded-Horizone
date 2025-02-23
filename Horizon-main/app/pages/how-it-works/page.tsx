"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { ArrowRight, Target, ChartLine, Award, Shield } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
      </div>

      <Header />

      <div className="container mx-auto py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">
            How It Works
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your journey to becoming a funded trader starts here
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Target className="h-8 w-8 text-orange-500" />,
              title: "Choose Your Challenge",
              description: "Select your preferred account size and challenge type"
            },
            {
              icon: <ChartLine className="h-8 w-8 text-blue-500" />,
              title: "Trade & Prove",
              description: "Show your trading skills by meeting our objectives"
            },
            {
              icon: <Award className="h-8 w-8 text-purple-500" />,
              title: "Get Funded",
              description: "Receive your funded account and start trading live"
            },
            {
              icon: <Shield className="h-8 w-8 text-green-500" />,
              title: "Earn Profits",
              description: "Keep up to 90% of your trading profits"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-white/5 rounded-lg mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 