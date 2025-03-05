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

  // Increment profit counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProfitCounter(prev => prev + Math.floor(Math.random() * 5))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden bg-[#0A1428]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428] via-transparent to-[#0A1428]/90" />
        
        {/* Professional Gradient Effects */}
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-[120px]"
        />

        {/* Animated Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            className="absolute h-[1px] w-1/3 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
            style={{ top: `${20 + i * 12}%` }}
          />
        ))}
      </div>

      {/* Add Trading Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Candlesticks */}
        <div className="absolute inset-0 opacity-5">
          {tradingChartElements.map((element) => (
            element.type === 'candle' ? (
              <motion.div
                key={element.id}
                className={`absolute w-3 ${element.isUp ? 'bg-green-500' : 'bg-red-500'}`}
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
                  width: '100px',
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

      {/* Add Floating Numbers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingNumbers.map((number) => (
          <motion.div 
            key={number.id}
            className="absolute text-orange-500/20 font-mono text-sm"
            style={{ left: `${number.x}%`, top: `${number.y}%` }}
            animate={{
              y: [0, -100],
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
        className="absolute top-32 left-10 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm"
      >
        <div className="text-sm text-gray-400">Total Trader Profits</div>
        <div className="text-2xl font-bold text-orange-500">
          ${profitCounter.toLocaleString()}M+
        </div>
        <div className="flex items-center gap-2 text-green-500 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Live Updates</span>
        </div>
      </motion.div>

      {/* Add Active Traders Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
        className="absolute top-32 right-10 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm"
      >
        <div className="text-sm text-gray-400">Active Traders</div>
        <div className="text-2xl font-bold text-orange-500">12,458</div>
        <div className="flex items-center gap-2 text-green-500 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Online Now</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 border border-orange-500/20 backdrop-blur-sm mb-12 shadow-xl shadow-orange-500/5"
            >
              <Shield className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold text-white">
                Trusted by <span className="text-orange-500">50,000+</span> Traders Worldwide
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Value Proposition */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight"
            >
              <span className="text-white block mb-4 drop-shadow-2xl">
                Your Success,
                <br className="hidden sm:block" />
                Our Capital
              </span>
              <span className="relative inline-block">
                <motion.span
                  initial={{ backgroundPosition: "0% 0%" }}
                  animate={{ backgroundPosition: "100% 0%" }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-2xl"
                >
                  Start Trading Today
                </motion.span>
              </span>
            </motion.h1>

            {/* Value Proposition & Benefits */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Get instant access to <span className="text-orange-500 font-semibold">$2.5M</span> in trading capital with 
              <span className="text-white font-semibold"> 90% profit splits</span> and zero commission.
            </motion.p>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              {[
                { value: "$250M+", label: "Trader Payouts" },
                { value: "0.01s", label: "Execution Speed" },
                { value: "24/7", label: "Expert Support" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-orange-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Button 
                className="group px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-xl font-semibold shadow-xl shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/30"
              >
                Start Trading Now
                <ChevronRight className="ml-2 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group px-8 py-6 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 hover:from-[#1E3A5F]/70 hover:to-[#1E3A5F]/50 text-white rounded-xl text-xl font-semibold border border-[#1E3A5F] hover:border-orange-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                View Trading Programs
                <ArrowRight className="ml-2 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
          </motion.div>
                  </div>
                  </div>
                </div>

      {/* Updated Live Trading Indicator with click handler */}
              <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 right-10 p-4 rounded-2xl bg-gradient-to-br from-[#1E3A5F]/40 to-[#1E3A5F]/20 border border-orange-500/20 backdrop-blur-sm shadow-lg cursor-pointer hover:bg-[#1E3A5F]/60 transition-all duration-300"
        onClick={() => setShowTradingModal(true)}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
          <span className="text-white text-sm font-medium">Live Trading</span>
          <CandlestickChart className="w-4 h-4 text-orange-500" />
                </div>
              </motion.div>

      {/* Live Trading Modal */}
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

      {/* Add Success Stories Ticker */}
      <div className="absolute bottom-32 left-0 right-0 bg-gradient-to-r from-[#1E3A5F]/0 via-[#1E3A5F]/30 to-[#1E3A5F]/0 py-4 backdrop-blur-sm">
        <motion.div
          animate={{
            x: [0, -1000]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-8 text-sm"
        >
          {[
            "John M. made $52,489 last month",
            "Sarah K. achieved 342% ROI",
            "Mike R. passed evaluation in 5 days",
            "Emma T. scaled to $2.5M account",
            "Alex P. made $31,672 this week"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-300">
              <Award className="w-4 h-4 text-orange-500" />
              {text}
        </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}