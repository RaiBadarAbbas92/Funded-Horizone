"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowRight, Shield, Star, Zap, Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

export function SaleOfferModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: Math.floor(Math.random() * 24),
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 3000)

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[85vw] md:w-[65vw] max-w-[600px] bg-navy-950 rounded-2xl p-3 md:p-6 shadow-2xl border border-navy-800/50 backdrop-blur-xl">
        <DialogHeader className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg"
          >
            Limited Time Offer
          </motion.div>
          <DialogTitle className="text-2xl md:text-4xl font-bold text-center bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-3 tracking-tight pt-3">
            Elite Trading Suite
          </DialogTitle>
          <p className="text-orange-400 text-center text-sm md:text-base font-medium">
            Unlock Professional Trading Accounts with Premium Features
          </p>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Featured Plan */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative bg-navy-900 p-3 rounded-xl border border-orange-500/30 shadow-xl"
          >
            <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              MOST POPULAR
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg md:text-xl font-bold text-white">Pro Trader</span>
                <p className="text-orange-400 mt-1 text-xs">Complete Trading Solution</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <Feature icon={<Shield className="w-3.5 h-3.5" />} text="Risk Management Tools" />
                  <Feature icon={<Star className="w-3.5 h-3.5" />} text="Premium Indicators" />
                  <Feature icon={<Zap className="w-3.5 h-3.5" />} text="Real-time Alerts" />
                  <Feature icon={<Trophy className="w-3.5 h-3.5" />} text="Performance Analytics" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 line-through block">$297</span>
                <span className="text-xl font-bold text-orange-500">$97</span>
                <span className="text-orange-400 text-xs ml-1">/month</span>
              </div>
            </div>
          </motion.div>

          {/* Account Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { size: '$10K', price: '$59', original: '$89', discount: '$30 OFF' },
              { size: '$25K', price: '$127', original: '$157', discount: '$30 OFF' },
              { size: '$50K', price: '$56', original: '$223', discount: '75% OFF' },
              { size: '$100K', price: '$81', original: '$323', discount: '75% OFF' },
              { size: '$200K', price: '$245', original: '$489', discount: '50% OFF' },
              { size: '$500K', price: '$329', original: '$657', discount: '50% OFF' },
            ].map((account) => (
              <motion.div
                key={account.size}
                whileHover={{ scale: 1.02 }}
                className="bg-navy-900 p-2 rounded-xl border border-navy-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-white">{account.size}</span>
                    <p className="text-orange-400/80 text-xs mt-0.5">Trading Account</p>
                    <p className="text-green-400 text-xs font-bold mt-0.5">{account.discount}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through block">{account.original}</span>
                    <span className="text-base font-bold text-orange-500">{account.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timer */}
          <div className="flex justify-center gap-2 md:gap-4 mt-6">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-navy-900 rounded-lg flex items-center justify-center border border-navy-700/50 shadow-lg">
                  <span className="text-base md:text-xl font-bold text-white">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-orange-400/80 mt-1 block capitalize">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6"
          >
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-sm md:text-lg font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20"
              onClick={() => setIsOpen(false)}
            >
              Claim Your Account Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <DialogClose className="absolute top-3 right-3 text-gray-400 hover:text-orange-400 transition-colors duration-200">
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function Feature({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-300">
      <span className="text-orange-400">{icon}</span>
      {text}
    </div>
  )
}
