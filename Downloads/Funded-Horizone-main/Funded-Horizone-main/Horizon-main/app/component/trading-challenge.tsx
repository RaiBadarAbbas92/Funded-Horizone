"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Shield, Clock, ArrowRight, Zap, Sparkles, Crown, Star } from 'lucide-react'

const ACCOUNT_SIZES = [
  "$1,000", "$3,000", "$5,000", "$10,000", "$25,000", 
  "$50,000", "$100,000", "$200,000", "$500,000"
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
  badge?: string
  savings: Record<AccountSize, string>
  isPopular?: Record<AccountSize, boolean>
  discountPercentage: Record<AccountSize, string>
}

const CHALLENGE_TYPES: Record<string, ChallengeType> = {
  'HFT NEO': {
    color: "from-purple-500 to-purple-600",
    icon: Crown,
    description: "For elite traders seeking maximum performance",
    rules: {
      "Profit Target": "8%",
      "Daily Drawdown": "5%",
      "Max Drawdown": "10%",
      "Profit Split": "Up to 90%",
      "Min Trading Days": "0"
    },
    prices: {
      "$1,000": "$20",
      "$3,000": "$40",
      "$5,000": "$58",
      "$10,000": "$98",
      "$25,000": "$190",
      "$50,000": "$318",
      "$100,000": "$545",
      "$200,000": "$997",
      "$500,000": "$1985"
    },
    isPopular: {
      "$1,000": true,
      "$3,000": false,
      "$5,000": false,
      "$10,000": true,
      "$25,000": false,
      "$50,000": true,
      "$100,000": true,
      "$200,000": false,
      "$500,000": true
    },
    salePrice: {
      "$1,000": "$14",
      "$3,000": "$28",
      "$5,000": "$40",
      "$10,000": "$68",
      "$25,000": "$133",
      "$50,000": "$79",
      "$100,000": "$136",
      "$200,000": "$498",
      "$500,000": "$992"
    },
    discountPercentage: {
      "$1,000": "30% OFF",
      "$3,000": "30% OFF",
      "$5,000": "30% OFF",
      "$10,000": "30% OFF",
      "$25,000": "30% OFF",
      "$50,000": "75% OFF",
      "$100,000": "75% OFF",
      "$200,000": "50% OFF",
      "$500,000": "50% OFF"
    },
    features: [
      "Ultra-fast execution speeds",
      "Advanced trading tools access",
      "Priority support 24/7",
      "Custom leverage options",
      "Real-time performance analytics"
    ],
    popularityScore: 98,
    badge: "Limited Time Offer",
    savings: {
      "$1,000": "Save $6",
      "$3,000": "Save $12",
      "$5,000": "Save $18",
      "$10,000": "Save $30",
      "$25,000": "Save $57",
      "$50,000": "Save $239",
      "$100,000": "Save $409",
      "$200,000": "Save $499",
      "$500,000": "Save $993"
    }
  },
  'One-Step': {
    color: "from-orange-500 to-orange-600",
    icon: Zap,
    description: "Advanced challenge for consistent traders",
    rules: {
      "Profit Target": "10%",
      "Daily Drawdown": "4%",
      "Max Drawdown": "10%",
      "Profit Split": "Up to 80%",
      "Min Trading Days": "3"
    },
    prices: {
      "$1,000": "$14",
      "$3,000": "$28",
      "$5,000": "$42",
      "$10,000": "$68",
      "$25,000": "$130",
      "$50,000": "$257",
      "$100,000": "$448",
      "$200,000": "$743",
      "$500,000": "$1387"
    },
    isPopular: {
      "$1,000": true,
      "$3,000": true,
      "$5,000": false,
      "$10,000": true,
      "$25,000": true,
      "$50,000": false,
      "$100,000": false,
      "$200,000": true,
      "$500,000": false
    },
    salePrice: {
      "$1,000": "$10",
      "$3,000": "$19",
      "$5,000": "$29",
      "$10,000": "$47",
      "$25,000": "$91",
      "$50,000": "$64",
      "$100,000": "$112",
      "$200,000": "$371",
      "$500,000": "$693"
    },
    discountPercentage: {
      "$1,000": "30% OFF",
      "$3,000": "30% OFF",
      "$5,000": "30% OFF",
      "$10,000": "30% OFF",
      "$25,000": "30% OFF",
      "$50,000": "75% OFF",
      "$100,000": "75% OFF",
      "$200,000": "50% OFF",
      "$500,000": "50% OFF"
    },
    features: [
      "Intermediate trading conditions",
      "Standard support package",
      "Basic performance metrics",
      "Regular market updates",
      "Trading community access"
    ],
    popularityScore: 92,
    badge: "Limited Time Offer",
    savings: {
      "$1,000": "Save $4",
      "$3,000": "Save $9",
      "$5,000": "Save $13",
      "$10,000": "Save $21",
      "$25,000": "Save $39",
      "$50,000": "Save $193",
      "$100,000": "Save $336",
      "$200,000": "Save $372",
      "$500,000": "Save $694"
    }
  },
  'Two-Step': {
    color: "from-[#1E3A5F] to-[#0A1428]",
    icon: Shield,
    description: "Perfect starting point for new traders",
    rules: {
      "Profit Target": "10%",
      "Profit Second target" : "5%",
      "Daily Drawdown": "4%",
      "Max Drawdown": "10%",
      "Profit Split": "Up to 80%",
      "Min Trading Days": "5"
    },
    prices: {
      "$1,000": "$10",
      "$3,000": "$20",
      "$5,000": "$28",
      "$10,000": "$45",
      "$25,000": "$78",
      "$50,000": "$188",
      "$100,000": "$318",
      "$200,000": "$548",
      "$500,000": "$998"
    },
    isPopular: {
      "$1,000": true,
      "$3,000": true,
      "$5,000": true,
      "$10,000": false,
      "$25,000": true,
      "$50,000": false,
      "$100,000": false,
      "$200,000": false,
      "$500,000": false
    },
    salePrice: {
      "$1,000": "$7",
      "$3,000": "$14",
      "$5,000": "$19",
      "$10,000": "$31",
      "$25,000": "$54",
      "$50,000": "$47",
      "$100,000": "$79",
      "$200,000": "$274",
      "$500,000": "$499"
    },
    discountPercentage: {
      "$1,000": "30% OFF",
      "$3,000": "30% OFF",
      "$5,000": "30% OFF",
      "$10,000": "30% OFF",
      "$25,000": "30% OFF",
      "$50,000": "75% OFF",
      "$100,000": "75% OFF",
      "$200,000": "50% OFF",
      "$500,000": "50% OFF"
    },
    features: [
      "Beginner-friendly rules",
      "Educational resources",
      "Basic support package",
      "Standard market tools",
      "Weekly market insights"
    ],
    popularityScore: 85,
    badge: "Limited Time Offer",
    savings: {
      "$1,000": "Save $3",
      "$3,000": "Save $6",
      "$5,000": "Save $9",
      "$10,000": "Save $14",
      "$25,000": "Save $24",
      "$50,000": "Save $141",
      "$100,000": "Save $239",
      "$200,000": "Save $274",
      "$500,000": "Save $499"
    }
  }
}

export default function TradingChallenge({ isDashboard = false }) {
  const [selectedBalance, setSelectedBalance] = useState<AccountSize>("$10,000")
  const [selectedAccounts, setSelectedAccounts] = useState<AccountSize[]>([])

  const toggleAccount = (size: AccountSize) => {
    if (selectedAccounts.includes(size)) {
      setSelectedAccounts(selectedAccounts.filter(s => s !== size))
    } else {
      setSelectedAccounts([...selectedAccounts, size])
    }
  }

  return (
    <section className="relative min-h-screen py-20 bg-[#0A0F1C]">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Choose Your Challenge
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            Select from our range of trading challenges designed to match your experience level
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ACCOUNT_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedBalance(size)}
              className={`px-4 py-2 rounded-xl ${
                selectedBalance === size
                  ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {Object.entries(CHALLENGE_TYPES).map(([name, data]) => (
            <div
              key={name}
              className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 rounded-2xl p-6"
            >
              {data.isPopular[selectedBalance] && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-bold rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              
              {data.badge && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-blue-600 text-white text-sm font-bold rounded-full">
                  {data.badge}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${data.color}`}>
                  <data.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <p className="text-sm text-gray-400">{data.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Price</span>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 line-through">
                        {data.prices[selectedBalance]}
                      </span>
                      <span className="text-sm font-semibold text-orange-500">
                        {data.discountPercentage[selectedBalance]}
                      </span>
                    </div>
                    {data.salePrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-500">
                          {data.salePrice[selectedBalance]}
                        </span>
                        <span className="text-sm text-green-400">
                          {data.savings[selectedBalance]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="h-1.5 bg-gray-800 rounded-full">
                  <div
                    className={`h-full bg-gradient-to-r ${data.color}`}
                    style={{ width: `${data.popularityScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {Object.entries(data.rules).map(([rule, value]) => (
                  <div 
                    key={rule}
                    className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-gray-400">{rule}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => window.location.href = isDashboard ? '/dashboard/buy' : '/signup'}
                className={`w-full bg-gradient-to-r ${data.color} text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
