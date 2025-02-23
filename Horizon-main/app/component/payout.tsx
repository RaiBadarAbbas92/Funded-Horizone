'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, DollarSign, TrendingUp, Award, Star } from 'lucide-react'
import Image from 'next/image'

const recentPayouts = [
  {
    id: 1,
    name: "Alex Thompson",
    amount: "$12,450",
    date: "2 hours ago",
    image: "/r.jpg",
    achievement: "Top Trader",
    profit: "+24.5%"
  },
  {
    id: 2,
    name: "Sarah Chen", 
    amount: "$8,320",
    date: "5 hours ago",
    image: "/rr.jpg",
    achievement: "Rising Star",
    profit: "+18.2%"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    amount: "$15,780", 
    date: "8 hours ago",
    image: "/re.jpg",
    achievement: "Consistent Performer",
    profit: "+31.4%"
  },
  {
    id: 4,
    name: "Emma Wilson",
    amount: "$9,650",
    date: "12 hours ago",
    image: "/rrr.jpg",
    achievement: "New Milestone",
    profit: "+21.8%"
  }
]

const PayoutSection = () => {
  return (
    <section className="relative min-h-screen bg-[#0A0A1B] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-purple-400 to-orange-400 bg-clip-text text-transparent [text-shadow:_0_2px_20px_rgb(0_0_0_/_20%)]">
            Latest Success Stories
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto font-light">
            Join our thriving community of traders who are transforming their passion into profit.
            Your success story could be next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {recentPayouts.map((payout, index) => (
            <motion.div
              key={payout.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="group relative backdrop-blur-xl rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-orange-900/90 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <Image
                      src={payout.image}
                      alt={payout.name}
                      fill
                      className="rounded-2xl object-cover"
                    />
                    <div className="absolute inset-0 ring-2 ring-purple-500/50 rounded-2xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl">{payout.name}</h3>
                    <p className="text-gray-400 text-sm">{payout.date}</p>
                    <div className="flex items-center mt-2 space-x-1">
                      <Star size={14} className="text-yellow-500" />
                      <span className="text-yellow-500 text-sm font-medium">{payout.achievement}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {payout.amount}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-semibold">{payout.profit}</span>
                        <TrendingUp size={20} className="text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 sm:mt-24"
        >
          <button className="relative group px-8 py-4 sm:px-12 sm:py-5 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-600 group-hover:from-purple-500 group-hover:to-orange-500 transition-colors duration-300" />
            <div className="relative flex items-center justify-center space-x-2">
              <span className="text-white font-bold text-lg sm:text-xl uppercase tracking-wider">
                Start Trading Now
              </span>
              <TrendingUp className="text-white w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default PayoutSection
