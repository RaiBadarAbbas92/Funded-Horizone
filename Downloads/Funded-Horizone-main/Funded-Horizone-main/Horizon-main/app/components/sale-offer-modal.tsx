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
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 3000)

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95vw] max-w-[1200px] bg-gradient-to-br from-black via-blue-950 to-black rounded-2xl p-6 md:p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            ✨ Exclusive Flash Sale! ✨
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-10">
          <div className="space-y-4 md:space-y-6">
            <Gift className="w-16 h-16 md:w-20 md:h-20 text-orange-400 mx-auto animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-bold text-center text-white">
              Premium Trading Accounts
            </h3>
            <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-xl space-y-4 hover:bg-white/10 transition-colors duration-300">
              <div className="flex justify-between items-center">
                <p className="text-orange-400 font-bold md:text-xl">$100K Package</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through md:text-lg">$545</p>
                  <p className="text-orange-400 font-bold md:text-xl">$136 <span className="text-emerald-400">(75% OFF)</span></p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-blue-300 font-bold md:text-xl">$50K Package</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through md:text-lg">$318</p>
                  <p className="text-blue-300 font-bold md:text-xl">$79 <span className="text-emerald-400">(30% OFF)</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex justify-center gap-4 md:gap-6">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm md:text-base text-blue-200/80 mt-2 block capitalize">{label}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4 md:py-6 text-lg md:text-xl font-bold rounded-xl hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setIsOpen(false)}
            >
              Claim Your Discount Now
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
            </Button>
          </div>
        </div>

        <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200">
          <X className="w-6 h-6 md:w-7 md:h-7" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}