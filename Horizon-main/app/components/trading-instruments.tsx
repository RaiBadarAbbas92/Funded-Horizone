"use client"

import { motion } from 'framer-motion'
import { DollarSign, Coins, BarChart2, Bitcoin } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TradingInstruments() {
  const categories = [
    {
      id: "forex",
      label: "Forex",
      icon: DollarSign,
      instruments: [
        { pair: "EUR/USD", spread: "0.1", commission: "$3.5", leverage: "1:500" },
        { pair: "GBP/USD", spread: "0.2", commission: "$3.5", leverage: "1:500" },
        { pair: "USD/JPY", spread: "0.2", commission: "$3.5", leverage: "1:500" },
        { pair: "AUD/USD", spread: "0.3", commission: "$3.5", leverage: "1:500" }
      ]
    },
    {
      id: "commodities",
      label: "Commodities",
      icon: Coins,
      instruments: [
        { pair: "XAUUSD", spread: "0.35", commission: "$4.0", leverage: "1:200" },
        { pair: "XAGUSD", spread: "0.40", commission: "$4.0", leverage: "1:200" },
        { pair: "WTIUSD", spread: "0.04", commission: "$4.0", leverage: "1:100" }
      ]
    },
    {
      id: "indices",
      label: "Indices",
      icon: BarChart2,
      instruments: [
        { pair: "US30", spread: "1.5", commission: "$4.0", leverage: "1:100" },
        { pair: "SPX500", spread: "0.4", commission: "$4.0", leverage: "1:100" },
        { pair: "NAS100", spread: "1.0", commission: "$4.0", leverage: "1:100" }
      ]
    },
    {
      id: "crypto",
      label: "Crypto",
      icon: Bitcoin,
      instruments: [
        { pair: "BTC/USD", spread: "25", commission: "$5.0", leverage: "1:20" },
        { pair: "ETH/USD", spread: "2.5", commission: "$5.0", leverage: "1:20" },
        { pair: "XRP/USD", spread: "0.03", commission: "$5.0", leverage: "1:20" }
      ]
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div 
          className="absolute w-[500px] h-[500px] -right-64 -bottom-64 bg-orange-500/20 rounded-full blur-[120px]"
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
            Trading Instruments
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Trade a wide range of financial instruments with competitive spreads and low commissions
          </p>
        </motion.div>

        <Tabs defaultValue="forex" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 bg-white/5 p-1 rounded-xl">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-white/10"
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.instruments.map((instrument, index) => (
                    <motion.div
                      key={instrument.pair}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                    >
                      <h3 className="text-xl font-bold text-white mb-4">{instrument.pair}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Spread from</span>
                          <span className="text-white">{instrument.spread}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Commission</span>
                          <span className="text-white">{instrument.commission}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Leverage up to</span>
                          <span className="text-white">{instrument.leverage}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
} 