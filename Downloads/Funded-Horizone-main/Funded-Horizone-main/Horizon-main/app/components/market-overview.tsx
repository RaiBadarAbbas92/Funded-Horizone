"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { TrendingUp, TrendingDown, LineChart } from "lucide-react"

// Dynamically import TradingView widgets to avoid SSR issues
const TradingViewWidget = dynamic(
  () => import('react-tradingview-widget'),
  { ssr: false }
)

export function MarketOverview() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0A0F1C] to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-6">
            Live Market Overview
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Stay updated with real-time market movements and trading opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TradingView Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10 h-[400px]"
          >
            <TradingViewWidget
              symbol="EURUSD"
              theme="dark"
              autosize
              style="1"
              locale="en"
            />
          </motion.div>

          {/* Market Movers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { pair: "EUR/USD", price: "1.0876", change: "+0.15%", trend: "up" },
              { pair: "GBP/USD", price: "1.2534", change: "-0.22%", trend: "down" },
              { pair: "USD/JPY", price: "148.45", change: "+0.33%", trend: "up" },
              { pair: "Gold", price: "2,023.50", change: "+0.45%", trend: "up" }
            ].map((market, index) => (
              <motion.div
                key={market.pair}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{market.pair}</h3>
                    <p className="text-2xl font-bold text-blue-400">{market.price}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    market.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}>
                    {market.trend === "up" ? (
                      <TrendingUp className="w-6 h-6" />
                    ) : (
                      <TrendingDown className="w-6 h-6" />
                    )}
                    <span className="text-lg font-bold">{market.change}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 