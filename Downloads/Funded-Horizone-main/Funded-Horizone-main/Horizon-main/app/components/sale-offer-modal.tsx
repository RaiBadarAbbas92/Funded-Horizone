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
      <DialogContent className="w-[85vw] md:w-[50vw] max-w-[400px] bg-navy-950 rounded-2xl p-1.5 md:p-3 shadow-2xl border border-navy-800/50 backdrop-blur-xl">
        <DialogHeader className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold text-[10px] shadow-lg"
          >
            Limited Time Offer
          </motion.div>
          <DialogTitle className="text-lg md:text-2xl font-bold text-center bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-1.5 tracking-tight pt-2">
            Trading Accounts
          </DialogTitle>
          <p className="text-orange-400 text-center text-[10px] md:text-xs font-medium">
            Special Discount on All Account Tiers
          </p>
        </DialogHeader>

        <div className="mt-3 space-y-2">
          {/* Account Tiers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
            {[
  { 
    size: '$1K',
    price: '$7',
    original: '$10',  // 30% off $10 = $7
    discount: '30% OFF'
  },
  { 
    size: '$3K',
    price: '$14',
    original: '$20',  // 30% off $20 = $14
    discount: '30% OFF'
  },
  { 
    size: '$5K',
    price: '$19',
    original: '$27',  // 30% off $27 = $18.90 → $19 (rounded)
    discount: '30% OFF'
  },
  { 
    size: '$10K',
    price: '$31',
    original: '$44',  // 30% off $44 = $30.80 → $31
    discount: '30% OFF'
  },
  { 
    size: '$25K',
    price: '$54',
    original: '$77',  // 30% off $77 = $53.90 → $54
    discount: '30% OFF'
  },
  { 
    size: '$50K',
    price: '$47',
    original: '$188',  // 75% off $188 = $47
    discount: '75% OFF'
  },
  { 
    size: '$100K',
    price: '$79',
    original: '$316',  // 75% off $316 = $79
    discount: '75% OFF'
  },
  { 
    size: '$200K',
    price: '$274',
    original: '$548',  // 50% off $548 = $274
    discount: '50% OFF'
  },
  { 
    size: '$500K',
    price: '$499',
    original: '$998',  // 50% off $998 = $499
    discount: '50% OFF'
  }
].map((account) => (
              <motion.div
                key={account.size}
                whileHover={{ scale: 1.02 }}
                className="bg-navy-900 p-1.5 rounded-lg border border-navy-700/50 backdrop-blur-sm"
              >
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-bold text-white">{account.size}</span>
                  <p className="text-orange-400/80 text-[8px] md:text-[10px]">Trading Account</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-green-400 text-[8px] md:text-[10px] font-bold">{account.discount}</p>
                    <div className="text-right">
                      <span className="text-[8px] md:text-[10px] text-gray-400 line-through block">{account.original}</span>
                      <span className="text-xs font-bold text-orange-500">{account.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timer */}
          <div className="flex justify-center gap-1 md:gap-2 mt-3">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="w-6 h-6 md:w-10 md:h-10 bg-navy-900 rounded-lg flex items-center justify-center border border-navy-700/50 shadow-lg">
                  <span className="text-xs md:text-base font-bold text-white">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[8px] md:text-[10px] text-orange-400/80 mt-0.5 block capitalize">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-3"
          >
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-1.5 text-[10px] md:text-sm font-bold rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20"
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/signup';
              }}
            >
              Claim Your Account Now
              <ArrowRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 ml-1.5" />
            </Button>
          </motion.div>
        </div>

        <DialogClose className="absolute top-1.5 right-1.5 text-gray-400 hover:text-orange-400 transition-colors duration-200">
          <X className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
