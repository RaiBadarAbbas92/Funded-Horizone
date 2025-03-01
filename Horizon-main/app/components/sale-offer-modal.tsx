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
      <DialogContent className="w-[95vw] max-w-[1000px] bg-gradient-to-br from-black via-blue-950 to-black rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            🎉 Flash Sale! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <Gift className="w-16 h-16 text-orange-400 mx-auto" />
            <h3 className="text-2xl font-bold text-center text-white">
              Premium Trading Accounts
            </h3>
            <div className="bg-white/5 p-4 rounded-xl space-y-2">
              <div className="flex justify-between">
                <p className="text-orange-400 font-bold">$100K Package</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through">$1000</p>
                  <p className="text-orange-400 font-bold">$250 (75% OFF)</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-blue-300 font-bold">$50K Package</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through">$500</p>
                  <p className="text-blue-300 font-bold">$350 (30% OFF)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm text-blue-200/80 mt-2 block">{label}</span>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-4"
              onClick={() => setIsOpen(false)}
            >
              Claim Discount
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}