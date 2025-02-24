"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Shield, Clock, ArrowRight, Zap, Sparkles, Crown } from 'lucide-react'

const ACCOUNT_SIZES = [
  "$1,000", "$2,500", "$5,000", "$10,000", "$25,000", 
  "$50,000", "$100,000", "$200,000"
] as const

type AccountSize = typeof ACCOUNT_SIZES[number]

interface ChallengeRules {
  "Profit Target": string
  "Daily Drawdown": string
  "Max Drawdown": string
  "Profit Split": string
  "Min Trading Days": string
}

interface ChallengeType {
  color: string
  icon: React.ElementType
  description: string
  rules: ChallengeRules
  prices: Record<AccountSize, string>
  features: string[]
  popularityScore: number
  salePrice?: Record<AccountSize, string>
}

const CHALLENGE_TYPES: Record<string, ChallengeType> = {
  'HFT Pro': {
    color: "from-purple-500 to-purple-600",
    icon: Crown,
    description: "For elite traders seeking maximum performance",
    rules: {
      "Profit Target": "6%",
      "Daily Drawdown": "6%",
      "Max Drawdown": "12%",
      "Profit Split": "Up to 95%",
      "Min Trading Days": "1"
    },
    prices: {
      "$1,000": "$15",
      "$2,500": "$35",
      "$5,000": "$65",
      "$10,000": "$125",
      "$25,000": "$250",
      "$50,000": "$450",
      "$100,000": "$800",
      "$200,000": "$1,500"
    },
    salePrice: {
      "$1,000": "$12",
      "$2,500": "$28",
      "$5,000": "$52",
      "$10,000": "$100",
      "$25,000": "$200",
      "$50,000": "$360",
      "$100,000": "$640",
      "$200,000": "$1,200"
    },
    features: [
      "Priority trade execution",
      "Advanced risk management tools",
      "VIP support access"
    ],
    popularityScore: 98
  },
  'Phase 2': {
    color: "from-orange-500 to-orange-600",
    icon: Zap,
    description: "Advanced challenge for consistent traders",
    rules: {
      "Profit Target": "8%",
      "Daily Drawdown": "5%",
      "Max Drawdown": "10%",
      "Profit Split": "Up to 90%",
      "Min Trading Days": "3"
    },
    prices: {
      "$1,000": "$12",
      "$2,500": "$30",
      "$5,000": "$55",
      "$10,000": "$105",
      "$25,000": "$200",
      "$50,000": "$355",
      "$100,000": "$650",
      "$200,000": "$1,150"
    },
    salePrice: {
      "$1,000": "$8",
      "$2,500": "$20",
      "$5,000": "$35",
      "$10,000": "$75",
      "$25,000": "$150",
      "$50,000": "$255",
      "$100,000": "$450",
      "$200,000": "$850"
    },
    features: [
      "Fast-track to funding",
      "Flexible trading conditions",
      "24/7 market access"
    ],
    popularityScore: 92
  },
  'Phase 1': {
    color: "from-[#1E3A5F] to-[#0A1428]",
    icon: Shield,
    description: "Perfect starting point for new traders",
    rules: {
      "Profit Target": "10%",
      "Daily Drawdown": "4%",
      "Max Drawdown": "8%",
      "Profit Split": "Up to 80%",
      "Min Trading Days": "5"
    },
    prices: {
      "$1,000": "$8",
      "$2,500": "$19", 
      "$5,000": "$36",
      "$10,000": "$67",
      "$25,000": "$133",
      "$50,000": "$238",
      "$100,000": "$450",
      "$200,000": "$835"
    },
    salePrice: {
      "$1,000": "$6",
      "$2,500": "$15",
      "$5,000": "$25",
      "$10,000": "$47",
      "$25,000": "$93",
      "$50,000": "$168",
      "$100,000": "$350",
      "$200,000": "$635"
    },
    features: [
      "Beginner-friendly rules",
      "Educational resources",
      "Basic support package"
    ],
    popularityScore: 85
  }
}

export default function TradingChallenge() {
  const [selectedBalance, setSelectedBalance] = useState<AccountSize>("$10,000")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeFeature, setActiveFeature] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 relative overflow-hidden bg-[#0A1428]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-[#1E3A5F]/10 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional Trading Programs
            <Sparkles className="inline-block ml-2 w-8 h-8 text-orange-500" />
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
            {ACCOUNT_SIZES.map((balance) => (
              <button
                key={balance}
                onClick={() => setSelectedBalance(balance)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedBalance === balance 
                  ? "bg-orange-500 text-white"
                  : "bg-[#1E3A5F] text-gray-300 hover:bg-[#1E3A5F]/80"
                }`}
              >
                {balance}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(CHALLENGE_TYPES).map(([type, data]) => (
            <div
              key={type}
              className="bg-[#1E3A5F]/30 backdrop-blur-xl rounded-xl p-6 border border-[#1E3A5F] relative"
            >
              {hoveredCard === type && (
                <div
                  className="absolute -top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  {data.popularityScore}% Popular
                </div>
              )}

              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full transform rotate-12">
                SALE!
              </div>

              <div className={`bg-gradient-to-r ${data.color} p-3 rounded-lg inline-block mb-4`}>
                <data.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{type}</h3>
              <p className="text-gray-400 text-sm mb-4">{data.description}</p>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span 
                    className="text-2xl font-bold text-gray-500 line-through"
                    key={data.prices[selectedBalance]}
                  >
                    {data.prices[selectedBalance]}
                  </span>
                  <span 
                    className="text-2xl font-bold text-orange-500"
                    key={data.salePrice?.[selectedBalance]}
                  >
                    {data.salePrice?.[selectedBalance]}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {Object.entries(data.rules).map(([rule, value]) => (
                  <div key={rule} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{rule}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <div
                  key={activeFeature}
                  className="text-sm text-gray-300 mb-4 h-12 flex items-center justify-center"
                >
                  {data.features[activeFeature]}
                </div>
              </AnimatePresence>

              <button
                className={`w-full bg-gradient-to-r ${data.color} text-white py-3 rounded-lg font-bold text-sm shadow-lg flex items-center justify-center gap-2 group hover:shadow-orange-500/20`}
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
