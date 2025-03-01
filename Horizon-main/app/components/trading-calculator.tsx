"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Percent, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TradingCalculator() {
  const [accountSize, setAccountSize] = useState<number>(100000)
  const [riskPercentage, setRiskPercentage] = useState<number>(1)
  const [entryPrice, setEntryPrice] = useState<number>(0)
  const [stopLoss, setStopLoss] = useState<number>(0)

  const calculatePositionSize = () => {
    const riskAmount = accountSize * (riskPercentage / 100)
    const priceDifference = Math.abs(entryPrice - stopLoss)
    return priceDifference > 0 ? riskAmount / priceDifference : 0
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div 
          className="absolute w-[500px] h-[500px] -left-64 -top-64 bg-blue-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-6">
            Position Size Calculator
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Calculate your optimal position size based on your risk management parameters
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-white mb-2 block">Account Size</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="number"
                      value={accountSize}
                      onChange={(e) => setAccountSize(Number(e.target.value))}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white mb-2 block">Risk Percentage</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="number"
                      value={riskPercentage}
                      onChange={(e) => setRiskPercentage(Number(e.target.value))}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-white mb-2 block">Entry Price</label>
                  <Input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                    step="0.00001"
                  />
                </div>

                <div>
                  <label className="text-white mb-2 block">Stop Loss</label>
                  <Input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(Number(e.target.value))}
                    className="bg-white/5 border-white/10 text-white"
                    step="0.00001"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">Recommended Position Size</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {calculatePositionSize().toFixed(2)} units
                  </p>
                </div>
                <Calculator className="w-12 h-12 text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}