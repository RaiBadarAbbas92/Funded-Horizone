"use client"

import { motion } from 'framer-motion'
import { TrendingUp, Award, Star, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function SuccessStories() {
  const stories = [
    {
      name: "Michael Chen",
      image: "/trader1.jpg",
      role: "Professional Forex Trader",
      story: "Started with a $50k account and scaled to $200k in just 6 months. Specializes in EUR/USD and GBP/USD pairs.",
      stats: {
        totalProfit: "$145,000",
        winRate: "76%",
        monthsTrading: "6"
      }
    },
    {
      name: "Sarah Johnson",
      image: "/trader2.jpg",
      role: "Index Trader",
      story: "Achieved consistent profits trading US30 and NAS100. Scaled from $25k to $100k in 4 months.",
      stats: {
        totalProfit: "$87,000",
        winRate: "82%",
        monthsTrading: "4"
      }
    },
    {
      name: "David Williams",
      image: "/trader3.jpg",
      role: "Crypto Trader",
      story: "Specialized in crypto pairs trading. Grew account from $10k to $75k with disciplined risk management.",
      stats: {
        totalProfit: "$65,000",
        winRate: "71%",
        monthsTrading: "5"
      }
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
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
            Success Stories
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Meet our successful traders who have achieved their financial goals through our program
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{story.name}</h3>
                  <p className="text-orange-400">{story.role}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{story.story}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-gray-400">Profit</p>
                  <p className="text-lg font-bold text-green-400">{story.stats.totalProfit}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <p className="text-lg font-bold text-blue-400">{story.stats.winRate}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-gray-400">Months</p>
                  <p className="text-lg font-bold text-orange-400">{story.stats.monthsTrading}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <Button variant="ghost" className="text-white hover:text-orange-400">
                  Full Story <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 