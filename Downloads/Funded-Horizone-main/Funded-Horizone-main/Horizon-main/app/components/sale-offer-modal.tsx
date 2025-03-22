"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowRight, Gift } from 'lucide-react'
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
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0
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
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full font-bold text-[10px] shadow-lg flex items-center gap-1"
          >
            <Gift className="w-3 h-3" />
            <span>Eid Special Offer</span>
          </motion.div>
          <DialogTitle className="text-lg md:text-2xl font-bold text-center bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent mb-1.5 tracking-tight pt-2">
            Two-Step Program
          </DialogTitle>
          <p className="text-green-400 text-center text-[10px] md:text-xs font-medium">
            30-60% OFF on All Account Tiers
          </p>
        </DialogHeader>

        <div className="mt-3 space-y-2">
          {/* Account Tiers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
            {[
              { size: '$1K', price: '$10', original: '$23', discount: '30% OFF' },
              { size: '$3K', price: '$15', original: '$39', discount: '30% OFF' },
              { size: '$5K', price: '$22', original: '$53', discount: '30% OFF' },
              { size: '$10K', price: '$36', original: '$87', discount: '30% OFF' },
              { size: '$25K', price: '$71', original: '$189', discount: '30% OFF' },
              { size: '$50K', price: '$65', original: '$263', discount: '60% OFF' },
              { size: '$100K', price: '$96', original: '$399', discount: '60% OFF' },
              { size: '$200K', price: '$140', original: '$579', discount: '60% OFF' },
              { size: '$500K', price: '$276', original: '$1099', discount: '60% OFF' },
            ].map((account) => (
              <motion.div
                key={account.size}
                whileHover={{ scale: 1.02 }}
                className="bg-navy-900 p-1.5 rounded-lg border border-navy-700/50 backdrop-blur-sm"
              >
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-bold text-white">{account.size}</span>
                  <p className="text-green-400/80 text-[8px] md:text-[10px]">Trading Account</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-green-400 text-[8px] md:text-[10px] font-bold">{account.discount}</p>
                    <div className="text-right">
                      <span className="text-[8px] md:text-[10px] text-gray-400 line-through block">{account.original}</span>
                      <span className="text-xs font-bold text-green-500">{account.price}</span>
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
                <span className="text-[8px] md:text-[10px] text-green-400/80 mt-0.5 block capitalize">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-3"
          >
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-1.5 text-[10px] md:text-sm font-bold rounded-lg transition-all duration-300 shadow-lg shadow-green-500/20"
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/signup';
              }}
            >
              Claim Your Eid Special Offer
              <ArrowRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 ml-1.5" />
            </Button>
          </motion.div>
        </div>

        <DialogClose className="absolute top-1.5 right-1.5 text-gray-400 hover:text-green-400 transition-colors duration-200">
          <X className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
