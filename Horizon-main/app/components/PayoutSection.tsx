'use client'

import { DollarSign, TrendingUp, Clock, Award, Briefcase } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function PayoutSection() {
  const recentPayouts = [
    {
      name: "Alexander Thompson, CFA",
      amount: "$12,450", 
      date: "2 hours ago",
      image: "/rr.jpg",
      profit: "+24.5%",
      account: "Professional",
      experience: "15+ years",
      trades: 245,
      winRate: "92%"
    },
    {
      name: "Dr. Sarah Chen",
      amount: "$8,320",
      date: "5 hours ago", 
      image: "/harr.jpg",
      profit: "+18.2%", 
      account: "Enterprise",
      experience: "12+ years",
      trades: 189,
      winRate: "88%"
    },
    {
      name: "Michael Davis, MBA",
      amount: "$15,780",
      date: "12 hours ago",
      image: "/rrr.jpg",
      profit: "+31.4%",
      account: "Professional", 
      experience: "10+ years",
      trades: 312,
      winRate: "94%"
    },
    {
      name: "Emma Wilson, CAIA",
      amount: "$6,940",
      date: "1 day ago",
      image: "/r.jpg", 
      profit: "+15.8%",
      account: "Starter",
      experience: "8+ years", 
      trades: 156,
      winRate: "86%"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0A0F1C] to-black">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Elite Trader Performance
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Witness real-time success stories from our top-performing traders
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {recentPayouts.map((payout, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#1a1f2d]/90 to-[#252a3a]/90 backdrop-blur-xl rounded-xl p-4 md:p-6 shadow-xl border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all">
                    <Image
                      src={payout.image}
                      alt={payout.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base md:text-lg truncate">{payout.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-xs text-orange-400">
                        <Award className="w-3 h-3" />
                        {payout.account}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-blue-400">
                        <Briefcase className="w-3 h-3" />
                        {payout.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-blue-500/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-orange-400" />
                      <span className="text-xl md:text-2xl font-bold text-white">{payout.amount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs md:text-sm font-medium">{payout.profit}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                    <div className="bg-blue-500/10 rounded-lg p-2 text-center">
                      <div className="text-blue-400">Total Trades</div>
                      <div className="font-semibold text-white">{payout.trades}</div>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-2 text-center">
                      <div className="text-green-400">Win Rate</div>
                      <div className="font-semibold text-white">{payout.winRate}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-xs border-t border-gray-700/50 pt-3">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>{payout.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}