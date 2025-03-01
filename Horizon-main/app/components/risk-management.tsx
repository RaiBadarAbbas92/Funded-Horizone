"use client"

import { motion } from 'framer-motion'
import { Shield, AlertTriangle, BarChart2, Lock, Percent, Clock, DollarSign, CreditCard, Gift, TrendingDown } from 'lucide-react'

export function RiskManagement() {
  const rules = [
    {
      title: "Competitive Rates",
      description: "Industry-leading rates and commission structures",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Easy Payments",
      description: "Simple and secure payment methods for deposits and withdrawals",
      icon: CreditCard, 
      color: "blue"
    },
    {
      title: "Best Offers",
      description: "Exclusive bonuses and promotional offers for traders",
      icon: Gift,
      color: "purple"
    },
    {
      title: "Low Spreads",
      description: "Ultra-tight spreads across all major trading pairs",
      icon: TrendingDown,
      color: "orange"
    },
    {
      title: "Leverage Limits",
      description: "Maximum leverage of 1:100 on major pairs",
      icon: Lock,
      color: "green"
    },
    {
      title: "Trading Hours",
      description: "Trade Anytime, Anywhere – No Limits!",
      icon: Clock,
      color: "yellow"
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
            Risk Management Rules
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Our comprehensive risk management framework ensures sustainable trading success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-${rule.color}-500/10`}>
                  <rule.icon className={`w-6 h-6 text-${rule.color}-400`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{rule.title}</h3>
                  <p className="text-gray-400">{rule.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-xl border border-white/10 max-w-3xl mx-auto text-center"
        >
          <Shield className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Your Security is Our Priority</h3>
          <p className="text-gray-400">
            Our risk management rules are designed to protect your capital and ensure long-term trading success.
            All traders must adhere to these guidelines to maintain their funded accounts.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 