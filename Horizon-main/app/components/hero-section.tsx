'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TrendingUp, ArrowRight, ChevronRight, Shield, Award, Globe } from 'lucide-react'
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

// Simplified floating elements - reduced count
const floatingElements = [
  {
    type: 'symbol',
    content: 'EUR/USD',
    value: '+0.52%',
    isPositive: true
  },
  {
    type: 'symbol',
    content: 'BTC/USD',
    value: '+1.24%',
    isPositive: true
  }
].map((item, i) => ({
  ...item,
  id: i,
  x: Math.random() * 80 + 10,
  y: Math.random() * 80 + 10,
  delay: i * 0.5,
  duration: 20
}))

// Simplified chart elements - reduced count
const tradingChartElements = [
  ...Array(3).fill(null).map((_, i) => ({
    id: `candle-${i}`,
    type: 'candle',
    isUp: Math.random() > 0.5,
    height: 40 + Math.random() * 60,
    delay: i * 0.2
  })),
  ...Array(5).fill(null).map((_, i) => ({
    id: `line-${i}`,
    type: 'line',
    value: Math.random() * 100,
    delay: i * 0.1
  }))
]

// Simplified floating numbers - reduced count
const floatingNumbers = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  value: (Math.random() * 100).toFixed(2),
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: i * 0.5,
  duration: 15
}))

export default function Hero() {
  const [showTradingModal, setShowTradingModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen pt-0 sm:pt-24 overflow-hidden bg-[#0A1428] flex items-start sm:items-center justify-center">
      {/* Simplified background */}
      {isLoaded && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute top-0 -right-1/4 w-[200px] md:w-[800px] h-[200px] md:h-[800px] bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-[40px] md:blur-[80px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[200px] md:w-[800px] h-[200px] md:h-[800px] bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-[40px] md:blur-[80px]" />
        </div>
      )}

      <div className="container mx-auto px-2 md:px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-32 sm:mt-0">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-1 md:gap-4 px-3 md:px-8 py-1 md:py-4 rounded-full bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 border border-orange-500/20 backdrop-blur-sm mb-8 sm:mb-4 md:mb-16">
              <Shield className="w-3 h-3 md:w-6 md:h-6 text-orange-500" />
              <span className="text-xs md:text-base font-bold text-white">
                Trusted by <span className="text-orange-500">1k+</span> Traders Worldwide
              </span>
              <div className="w-1 h-1 md:w-2 md:h-2 bg-green-500 rounded-full" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-12 tracking-tight px-1 sm:px-0">
              <div className="relative mb-3 md:mb-8 inline-block">
                <span className="block bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent font-extrabold tracking-tight">
                  Unleash Your Trading Prowess with 
                  <br className="block sm:hidden" />
                  Funded Horizon
                </span>
                <div className="absolute inset-0 blur-3xl bg-orange-500/10 -z-10" />
              </div>
            </h1>

            {/* Mobile Description */}
            <p className="text-gray-400 text-lg mb-8 px-4 block sm:hidden">
              Join the elite community of funded traders. Get up to $2.5M in trading capital, 
              enjoy up to 90% profit splits, and trade with confidence using our cutting-edge platform.
              <span className="block mt-4 text-orange-500 font-semibold">
                No hidden fees. No time limits. Pure trading freedom.
              </span>
            </p>

            {/* Mobile-only Features List */}
            <div className="grid grid-cols-2 gap-4 px-4 mb-8 block sm:hidden">
              <div className="bg-[#1E3A5F]/30 p-4 rounded-xl border border-orange-500/20">
                <Award className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="text-white font-semibold mb-1">Top Tier Platform</h3>
                <p className="text-gray-400 text-sm">Advanced tools for serious traders</p>
              </div>
              <div className="bg-[#1E3A5F]/30 p-4 rounded-xl border border-orange-500/20">
                <Globe className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="text-white font-semibold mb-1">Global Access</h3>
                <p className="text-gray-400 text-sm">Trade from anywhere, anytime</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-6 mb-8 md:mb-32 px-2 md:px-4">
              <Button 
                className="group px-4 md:px-8 py-3 md:py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg md:rounded-xl text-base md:text-xl font-semibold w-full sm:w-auto"
                onClick={() => window.location.href = '/signup'}
              >
                Start Trading Now
                <ChevronRight className="ml-1 md:ml-2 w-4 h-4 md:w-6 md:h-6" />
              </Button>
              <Button 
                className="group px-4 md:px-8 py-3 md:py-6 bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 text-white rounded-lg md:rounded-xl text-base md:text-xl font-semibold border border-[#1E3A5F] w-full sm:w-auto"
                onClick={() => window.location.href = '/trading-programs'}
              >
                View Trading Programs
                <ArrowRight className="ml-1 md:ml-2 w-4 h-4 md:w-6 md:h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Modal */}
      <Dialog open={showTradingModal} onOpenChange={setShowTradingModal}>
        <DialogContent className="sm:max-w-[800px] bg-[#0A1428] border-[#1E3A5F]">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              Live Trading Activity
            </DialogTitle>
          </DialogHeader>
          <div className="relative overflow-hidden rounded-lg border border-[#1E3A5F] p-4">
            <TradingChart />
          </div>
        </DialogContent>
      </Dialog>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </section>
  )
}
