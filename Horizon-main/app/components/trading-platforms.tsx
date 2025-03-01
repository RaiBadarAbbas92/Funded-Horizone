"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

export function TradingPlatforms() {
  const platforms = [
    {
      name: "MetaTrader 5",
      logo: "https://www.metatrader5.com/i/logo_mt5.png"
    },
    {
      name: "MetaTrader 4", 
      logo: "https://www.metatrader4.com/i/logo_mt4.png"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black/50 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Trading Platforms
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 flex items-center justify-center"
            >
              <Image
                src={platform.logo}
                alt={platform.name}
                width={160}
                height={60}
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start Trading Now
          </button>
        </motion.div>
      </div>
    </section>
  )
}