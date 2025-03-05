"use client"

import { motion, useAnimationControls } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect } from "react"

export function LiveMarketTicker() {
  const marketData = [
    { symbol: "EUR/USD", price: "1.0876", change: "+0.15%" },
    { symbol: "BTC/USD", price: "43,250", change: "-0.32%" },
    { symbol: "Gold", price: "2,023.50", change: "+0.45%" },
    { symbol: "S&P 500", price: "4,783.25", change: "+0.28%" },
    { symbol: "NASDAQ", price: "14,972.76", change: "+0.55%" },
    { symbol: "USD/JPY", price: "148.15", change: "-0.22%" },
  ]

  const controls = useAnimationControls()

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          x: ["0%", "-50%"],
          transition: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          },
        })
      }
    }
    animate()
  }, [controls])

  return (
    <div className="w-full bg-black/50 backdrop-blur-md z-50 py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex gap-8 items-center whitespace-nowrap"
          animate={controls}
        >
          {[...marketData, ...marketData].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 md:gap-3"
            >
              <span className="text-sm md:text-base text-white/80">{item.symbol}</span>
              <span className="text-sm md:text-base text-white font-medium">{item.price}</span>
              <span className={`flex items-center text-sm md:text-base ${
                item.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}>
                {item.change.startsWith("+") ? 
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> : 
                  <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                }
                {item.change}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}