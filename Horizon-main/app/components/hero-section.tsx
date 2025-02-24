'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TrendingUp, ArrowRight, ChevronRight, Shield, Award, Globe, LineChart, CandlestickChart } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import TradingChart from '../components/TradingChart'

const tradingStats = [
  {
    value: "$2.5M",
    label: "Maximum Funding",
    color: "text-orange-500"
  },
  {
    value: "90%",
    label: "Profit Split", 
    color: "text-orange-500"
  },
  {
    value: "0.0",
    label: "Commission",
    color: "text-orange-500"
  },
  {
    value: "24/7",
    label: "Support",
    color: "text-orange-500"
  }
]

const floatingElements = [
  {
    type: 'symbol',
    content: 'EUR/USD',
    value: '+0.52%',
    isPositive: true
  },
  {
    type: 'symbol', 
    content: 'NASDAQ',
    value: '-0.31%',
    isPositive: false
  },
  {
    type: 'symbol',
    content: 'BTC/USD',
    value: '+1.24%',
    isPositive: true
  },
  {
    type: 'indicator',
    content: 'RSI(14)',
    value: '65.4'
  },
  {
    type: 'indicator',
    content: 'MACD',
    value: 'Buy'
  },
  {
    type: 'candlestick',
    pattern: 'Bullish',
    value: 'Engulfing'
  }
].map((item, i) => ({
  ...item,
  id: i,
  x: Math.random() * 80 + 10,
  y: Math.random() * 80 + 10,
  delay: i * 0.5,
  duration: 20 + Math.random() * 15
}))

// Add new background animation variants
const backgroundVariants = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
}

// Add animated lines config
const animatedLines = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  duration: 15 + i * 2,
  delay: i * 3,
  top: 10 + i * 10
}))

// Add more dynamic line animations
const diagonalLines = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: Math.random() * 45,
  duration: 15 + Math.random() * 10,
  delay: i * 0.5,
  opacity: 0.1 + Math.random() * 0.1
}))

type ChartElement = {
  id: string;
  type: 'candle' | 'line';
  isUp?: boolean;
  height?: number;
  value?: number;
  delay: number;
}

const tradingChartElements: ChartElement[] = [
  ...Array(10).fill(null).map((_, i) => ({
    id: `candle-${i}`,
    type: 'candle',
    isUp: Math.random() > 0.5,
    height: 40 + Math.random() * 60,
    delay: i * 0.2
  })),
  ...Array(15).fill(null).map((_, i) => ({
    id: `line-${i}`,
    type: 'line',
    value: Math.random() * 100,
    delay: i * 0.1
  }))
]

// Add floating numbers animation
const floatingNumbers = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  value: (Math.random() * 100).toFixed(2),
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 15 + Math.random() * 10
}))

export default function Hero() {
  const [showTradingModal, setShowTradingModal] = useState(false)
  const [profitCounter, setProfitCounter] = useState(250)

  // Optimize animation intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setProfitCounter(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen pt-0 sm:pt-24 overflow-hidden bg-[#0A1428] flex items-start sm:items-center justify-center">
      {/* Simplified background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10 }}
          className="absolute top-0 -right-1/4 w-[200px] md:w-[800px] h-[200px] md:h-[800px] bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-[40px] md:blur-[80px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, delay: 5 }}
          className="absolute -bottom-1/4 -left-1/4 w-[200px] md:w-[800px] h-[200px] md:h-[800px] bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-[40px] md:blur-[80px]"
        />
      </div>

      {/* Reduce number of animated candlesticks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          {tradingChartElements.slice(0, 3).map((element) => (
            element.type === 'candle' ? (
              <motion.div
                key={element.id}
                className={`absolute w-1 md:w-3 ${element.isUp ? 'bg-green-500' : 'bg-red-500'}`}
                style={{
                  height: element.height,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{
                  duration: 2,
                  delay: element.delay,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ) : (
              <motion.div
                key={element.id}
                className="absolute h-px bg-blue-500"
                style={{
                  width: '25px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.2, scaleX: 1 }}
                transition={{
                  duration: 1.5,
                  delay: element.delay,
                  repeat: Infinity
                }}
              />
            )
          ))}
        </div>
      </div>

      {/* Reduce number of floating numbers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingNumbers.slice(0, 5).map((number) => (
          <motion.div
            key={number.id}
            className="absolute text-orange-500/20 font-mono text-[10px] md:text-sm"
            style={{ left: `${number.x}%`, top: `${number.y}%` }}
            animate={{
              y: [0, -50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: number.duration,
              repeat: Infinity,
              delay: number.delay,
              ease: "linear"
            }}
          >
            ${number.value}
          </motion.div>
        ))}
      </div>

      {/* Add Live Profit Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-16 md:top-32 left-2 md:left-10 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 p-2 md:p-4 rounded-lg md:rounded-xl border border-orange-500/20 backdrop-blur-sm hidden md:block"
      >
        <div className="text-[10px] md:text-sm text-gray-400">Total Trader Profits</div>
        <div className="text-lg md:text-2xl font-bold text-orange-500">
          ${profitCounter.toLocaleString()}M+
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-green-500 text-[10px] md:text-sm">
          <TrendingUp className="w-2 h-2 md:w-4 md:h-4" />
          <span>Live Updates</span>
        </div>
      </motion.div>

      {/* Add Active Traders Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-16 md:top-32 right-2 md:right-10 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 p-2 md:p-4 rounded-lg md:rounded-xl border border-orange-500/20 backdrop-blur-sm hidden md:block"
      >
        <div className="text-[10px] md:text-sm text-gray-400">Active Traders</div>
        <div className="text-lg md:text-2xl font-bold text-orange-500">12,458</div>
        <div className="flex items-center gap-1 md:gap-2 text-green-500 text-[10px] md:text-sm">
          <div className="w-1 h-1 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Online Now</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-2 md:px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-8 sm:mt-0">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1 md:gap-4 px-3 md:px-8 py-1 md:py-4 rounded-full bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 border border-orange-500/20 backdrop-blur-sm mb-4 md:mb-16 shadow-xl shadow-orange-500/5 hover:shadow-orange-500/10 transition-all duration-300"
            >
              <Shield className="w-3 h-3 md:w-6 md:h-6 text-orange-500" />
              <span className="text-xs md:text-base font-bold text-white">
                Trusted by <span className="text-orange-500">50,000+</span> Traders Worldwide
              </span>
              <div className="w-1 h-1 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-12 tracking-tight px-1 sm:px-0"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-3 md:mb-8 inline-block"
              >
                <motion.span
                  className="block bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto] font-extrabold tracking-tight drop-shadow-2xl"
                  animate={{ backgroundPosition: ["0%", "200%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  Unleash Your Trading Prowess with 
                  <br className="block sm:hidden" />
                  Funded Horizon
                </motion.span>
                <div className="absolute inset-0 blur-3xl bg-orange-500/10 -z-10" />
              </motion.div>
            </motion.h1>

            {/* Mobile Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-400 text-lg mb-8 px-4 block sm:hidden"
            >
              Join the elite community of funded traders. Get up to $2.5M in trading capital, 
              enjoy up to 90% profit splits, and trade with confidence using our cutting-edge platform.
              <span className="block mt-4 text-orange-500 font-semibold">
                No hidden fees. No time limits. Pure trading freedom.
              </span>
            </motion.p>

            {/* Mobile-only Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 px-4 mb-8 block sm:hidden"
            >
              <div className="bg-[#1E3A5F]/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm">
                <Award className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="text-white font-semibold mb-1">Top Tier Platform</h3>
                <p className="text-gray-400 text-sm">Advanced tools for serious traders</p>
              </div>
              <div className="bg-[#1E3A5F]/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm">
                <Globe className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="text-white font-semibold mb-1">Global Access</h3>
                <p className="text-gray-400 text-sm">Trade from anywhere, anytime</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-2 md:gap-6 mb-8 md:mb-32 px-2 md:px-4"
            >
              <Button 
                className="group px-4 md:px-8 py-3 md:py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg md:rounded-xl text-base md:text-xl font-semibold shadow-xl shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/30 w-full sm:w-auto"
              >
                Start Trading Now
                <ChevronRight className="ml-1 md:ml-2 w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group px-4 md:px-8 py-3 md:py-6 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 hover:from-[#1E3A5F]/70 hover:to-[#1E3A5F]/50 text-white rounded-lg md:rounded-xl text-base md:text-xl font-semibold border border-[#1E3A5F] hover:border-orange-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
              >
                View Trading Programs
                <ArrowRight className="ml-1 md:ml-2 w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trading Modal */}
      <Dialog open={showTradingModal} onOpenChange={setShowTradingModal}>
        <DialogContent className="sm:max-w-[800px] bg-[#0A1428] border-[#1E3A5F]">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-orange-500" />
              Live Trading Activity
            </DialogTitle>
          </DialogHeader>
          <div className="relative overflow-hidden rounded-lg border border-[#1E3A5F] p-4">
            <TradingChart />
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 md:w-64 h-16 md:h-64 bg-orange-500/5 rounded-full blur-2xl md:blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 md:w-96 h-24 md:h-96 bg-blue-500/5 rounded-full blur-2xl md:blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </section>
  )
}