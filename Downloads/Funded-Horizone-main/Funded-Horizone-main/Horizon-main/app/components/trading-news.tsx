"use client"

import { motion } from "framer-motion"
import { Newspaper, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const news = [
  {
    title: "Fed Signals Potential Rate Cuts in 2024",
    category: "Economic News",
    time: "2 hours ago",
    source: "Financial Times",
    impact: "high"
  },
  {
    title: "ECB Maintains Current Monetary Policy Stance",
    category: "Central Banks",
    time: "4 hours ago",
    source: "Bloomberg",
    impact: "medium"
  },
  {
    title: "Oil Prices Surge Amid Middle East Tensions",
    category: "Commodities",
    time: "6 hours ago",
    source: "Reuters",
    impact: "high"
  },
  {
    title: "Asian Markets Rally on Strong Economic Data",
    category: "Market Analysis",
    time: "8 hours ago",
    source: "CNBC",
    impact: "medium"
  }
]

export function TradingNews() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black to-[#0A0F1C] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-6">
            Market News & Analysis
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Stay informed with the latest market news and trading opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.impact === "high" 
                        ? "bg-red-500/20 text-red-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-blue-200/80">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Newspaper className="w-4 h-4" />
                      {item.source}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-blue-400 hover:text-orange-400 hover:bg-orange-500/10"
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-6 rounded-xl text-lg font-medium hover:opacity-90"
          >
            View All News
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 