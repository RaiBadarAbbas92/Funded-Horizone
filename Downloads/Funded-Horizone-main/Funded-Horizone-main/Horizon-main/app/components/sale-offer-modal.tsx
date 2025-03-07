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
    days: 7,
    hours: Math.floor(Math.random() * 24), // Random hours between 0-23
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
      <DialogContent className="w-[95vw] md:w-[85vw] max-w-[900px] bg-gradient-to-br from-black via-blue-950 to-black rounded-2xl p-6 md:p-12">
        <DialogHeader>
          <DialogTitle className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent mb-2">
            ✨ Exclusive Flash Sale! ✨
          </DialogTitle>
          <p className="text-gray-300 text-center text-base md:text-lg mt-2">Limited Time Offer - Don't Miss Out!</p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mt-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Gift className="w-16 h-16 md:w-24 md:h-24 text-orange-400 animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-center text-white">
              Premium Trading Accounts
            </h3>
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl space-y-6 hover:bg-white/10 transition-colors duration-300 border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-orange-400 font-bold text-xl md:text-2xl">$100K Package</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through text-lg md:text-xl">$545</p>
                  <p className="text-orange-400 font-bold text-xl md:text-2xl">$136 <span className="text-emerald-400 text-lg">(75% OFF)</span></p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-blue-300 font-bold text-xl md:text-2xl">$50K Package</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through text-lg md:text-xl">$318</p>
                  <p className="text-blue-300 font-bold text-xl md:text-2xl">$79 <span className="text-emerald-400 text-lg">(30% OFF)</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 flex flex-col justify-center">
            <div className="flex justify-center gap-4 md:gap-8">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300 border border-white/10">
                    <span className="text-2xl md:text-4xl font-bold text-white">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm md:text-lg text-blue-200/80 mt-3 block capitalize font-medium">{label}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-6 text-xl md:text-2xl font-bold rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-orange-500/20"
              onClick={() => setIsOpen(false)}
            >
              Claim Your Discount Now
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7 ml-3" />
            </Button>
          </div>
        </div>

        <DialogClose className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200">
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
