"use client"

import { motion } from 'framer-motion'
import { Calendar, Clock, Globe, TrendingUp, AlertTriangle } from 'lucide-react'

export function EconomicCalendar() {
  const events = [
    {
      time: "14:30 GMT",
      country: "USD",
      event: "Non-Farm Payrolls",
      impact: "high",
      forecast: "180K",
      previous: "175K"
    },
    {
      time: "12:00 GMT",
      country: "EUR",
      event: "ECB Interest Rate Decision",
      impact: "high",
      forecast: "4.50%",
      previous: "4.50%"
    },
    {
      time: "15:00 GMT",
      country: "GBP",
      event: "BOE Governor Bailey Speech",
      impact: "medium",
      forecast: "-",
      previous: "-"
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
            Economic Calendar
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Stay ahead of market-moving events with our real-time economic calendar
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm">
              <div>Time</div>
              <div>Currency</div>
              <div className="col-span-2">Event</div>
              <div>Forecast</div>
              <div>Previous</div>
            </div>

            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-6 gap-4 p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4 text-blue-400" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Globe className="w-4 h-4 text-orange-400" />
                  {event.country}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    event.impact === 'high' ? 'bg-red-500' : 
                    event.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="text-white">{event.event}</span>
                </div>
                <div className="text-green-400">{event.forecast}</div>
                <div className="text-blue-400">{event.previous}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}