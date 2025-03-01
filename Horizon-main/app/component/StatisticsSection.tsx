'use client'

import React from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Award, HeadphonesIcon, UserCheck } from 'lucide-react'

const StatCard = ({ title, value, suffix = '', icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"></div>
    <div className="relative bg-gradient-to-br from-blue-900/90 to-blue-800/90 rounded-2xl p-8 border border-blue-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
      </div>
      <CountUp
        end={value}
        duration={2}
        separator=","
        suffix={suffix}
        className="text-4xl font-bold text-white tracking-tight"
        enableScrollSpy
        scrollSpyOnce
      />
    </div>
  </motion.div>
)

const StatisticsSection = () => {
  return (
    <section className="relative min-h-[60vh] py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      {/* Simplified background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[800px] h-[800px] -left-1/4 -top-1/4 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute w-[800px] h-[800px] -right-1/4 -bottom-1/4 bg-orange-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-4">
            Our Trading Impact
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            Join thousands of successful traders who have transformed their trading career with our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <StatCard title="Active Traders" value={1983} icon={Users} />
          <StatCard title="Total Payouts" value={450789} suffix="$" icon={DollarSign} />
          <StatCard title="Success Rate" value={99} suffix="%" icon={TrendingUp} />
          <StatCard title="Customer Support" value={24} suffix="/7" icon={HeadphonesIcon} />
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
