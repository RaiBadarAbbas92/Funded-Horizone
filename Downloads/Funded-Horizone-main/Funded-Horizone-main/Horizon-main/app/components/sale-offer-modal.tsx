"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
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
      <DialogContent className="w-[90vw] md:w-[60vw] max-w-[500px] bg-navy-950 rounded-2xl p-2 md:p-4 shadow-2xl border border-navy-800/50 backdrop-blur-xl">
        <DialogHeader className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-0.5 rounded-full font-bold text-xs shadow-lg"
          >
            Limited Time Offer
          </motion.div>
          <DialogTitle className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-2 tracking-tight pt-2">
            Trading Accounts
          </DialogTitle>
          <p className="text-orange-400 text-center text-xs md:text-sm font-medium">
            Special Discount on All Account Tiers
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {/* Account Tiers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { size: '$1K', price: '$7', original: '$10', discount: '30% OFF' },
              { size: '$3K', price: '$21', original: '$30', discount: '30% OFF' },
              { size: '$5K', price: '$35', original: '$50', discount: '30% OFF' },
              { size: '$10K', price: '$63', original: '$89', discount: '30% OFF' },
              { size: '$25K', price: '$110', original: '$157', discount: '30% OFF' },
              { size: '$50K', price: '$47', original: '$223', discount: '75% OFF' },
              { size: '$100K', price: '$79', original: '$323', discount: '75% OFF' },
              { size: '$200K', price: '$245', original: '$489', discount: '50% OFF' },
              { size: '$500K', price: '$329', original: '$657', discount: '50% OFF' },
            ].map((account) => (
              <motion.div
                key={account.size}
                whileHover={{ scale: 1.02 }}
                className="bg-navy-900 p-2 rounded-lg border border-navy-700/50 backdrop-blur-sm"
              >
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-bold text-white">{account.size}</span>
                  <p className="text-orange-400/80 text-[10px] md:text-xs">Trading Account</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-green-400 text-[10px] md:text-xs font-bold">{account.discount}</p>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs text-gray-400 line-through block">{account.original}</span>
                      <span className="text-sm font-bold text-orange-500">{account.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timer */}
          <div className="flex justify-center gap-1.5 md:gap-3 mt-4">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-navy-900 rounded-lg flex items-center justify-center border border-navy-700/50 shadow-lg">
                  <span className="text-sm md:text-lg font-bold text-white">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs text-orange-400/80 mt-0.5 block capitalize">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-4"
          >
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 text-xs md:text-base font-bold rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20"
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/signup';
              }}
            >
              Claim Your Account Now
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <DialogClose className="absolute top-2 right-2 text-gray-400 hover:text-orange-400 transition-colors duration-200">
          <X className="w-3 h-3 md:w-4 md:h-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
