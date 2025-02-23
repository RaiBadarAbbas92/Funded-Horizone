"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, 
  CandlestickChart, 
  Timer, 
  Wallet, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react"

export default function TradingPage() {
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
            Trading Features
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Advanced tools and features for professional traders
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CandlestickChart className="h-8 w-8 text-orange-500" />,
              title: "Advanced Charts",
              description: "Professional-grade charting with multiple timeframes and indicators"
            },
            {
              icon: <Timer className="h-8 w-8 text-blue-500" />,
              title: "Fast Execution",
              description: "Lightning-fast trade execution with minimal slippage"
            },
            {
              icon: <Wallet className="h-8 w-8 text-purple-500" />,
              title: "Secure Funds",
              description: "Your funds are kept in segregated accounts"
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-green-500" />,
              title: "Market Analysis",
              description: "Real-time market analysis and trading signals"
            },
            {
              icon: <LineChart className="h-8 w-8 text-red-500" />,
              title: "Risk Management",
              description: "Advanced tools for managing your trading risk"
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-yellow-500" />,
              title: "Account Protection",
              description: "Negative balance protection and secure trading environment"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-white/5 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <Button 
                    variant="outline"
                    className="border-orange-500/20 hover:bg-orange-500/10 w-full"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trading Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "Execution Rate" },
              { value: "<0.1s", label: "Average Execution Time" },
              { value: "24/7", label: "Trading Support" },
              { value: "50+", label: "Trading Instruments" }
            ].map((stat, index) => (
              <div key={index} className="bg-[#0d2339]/50 rounded-lg p-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 