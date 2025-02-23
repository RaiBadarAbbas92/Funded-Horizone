"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

export function LiveMarketTicker() {
  const marketData = [
    { symbol: "EUR/USD", price: "1.0876", change: "+0.15%" },
    { symbol: "BTC/USD", price: "43,250", change: "-0.32%" },
    { symbol: "Gold", price: "2,023.50", change: "+0.45%" },
    { symbol: "S&P 500", price: "4,783.25", change: "+0.28%" },
  ]

  return (
    <div className="w-full bg-black/50 backdrop-blur-md z-50 py-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {marketData.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-white/80">{item.symbol}</span>
              <span className="text-white font-medium">{item.price}</span>
              <span className={`flex items-center ${
                item.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}>
                {item.change.startsWith("+") ? 
                  <TrendingUp className="w-4 h-4" /> : 
                  <TrendingDown className="w-4 h-4" />
                }
                {item.change}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 