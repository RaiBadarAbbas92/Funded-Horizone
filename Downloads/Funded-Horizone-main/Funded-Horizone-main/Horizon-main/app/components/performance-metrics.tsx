"use client"

import { motion } from 'framer-motion'
import { TrendingUp, ChartBar, PieChart, Activity, Users, DollarSign } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

export function PerformanceMetrics() {
  const metrics = [
    {
      title: "Win Rate",
      value: "68%",
      change: "+5.2%",
      trend: "up",
      color: "green",
      icon: TrendingUp
    },
    {
      title: "Average RRR",
      value: "1:2.5",
      change: "+0.3",
      trend: "up",
      color: "blue",
      icon: ChartBar
    },
    {
      title: "Profit Factor",
      value: "2.8",
      change: "+0.4",
      trend: "up",
      color: "orange",
      icon: PieChart
    }
  ]

  const tradingStats = [
    { label: "Total Trades", value: 156, progress: 78 },
    { label: "Winning Trades", value: 98, progress: 63 },
    { label: "Average Hold Time", value: "4h 23m", progress: 85 },
    { label: "Max Drawdown", value: "5.2%", progress: 92 }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      {/* Background effects */}
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
            Performance Analytics
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Track your trading performance with advanced metrics and real-time analytics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 text-${metric.color}-400`} />
                <span className={`text-${metric.color}-400 text-sm font-medium`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-white text-lg font-medium mb-2">{metric.title}</h3>
              <p className="text-3xl font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Trading Performance Chart */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Trading Performance</h3>
            <div className="space-y-6">
              {tradingStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-white font-medium">{stat.value}</span>
                  </div>
                  <Progress value={stat.progress} className="h-2 bg-white/5" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "Closed Trade", pair: "EUR/USD", profit: "+$234.50" },
                { action: "Opened Position", pair: "GBP/JPY", size: "2.5 lots" },
                { action: "Modified Stop Loss", pair: "XAU/USD", level: "1895.40" }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.pair}</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-medium">
                    {activity.profit || activity.size || activity.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 