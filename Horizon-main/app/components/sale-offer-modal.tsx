"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Clock, ArrowRight, Gift } from 'lucide-react'
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
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-blue-950 to-black border-none rounded-3xl p-0 mx-4 sm:mx-auto">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl"
            />
          </div>

          <div className="relative p-6 sm:p-10">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent">
                🎉 Exclusive Flash Sale! 🎉
              </DialogTitle>
            </DialogHeader>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex justify-center"
                >
                  <div className="p-4 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full">
                    <Gift className="w-16 h-16 lg:w-20 lg:h-20 text-orange-400" />
                  </div>
                </motion.div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white">
                  Premium Trading Accounts
                </h3>
                <div className="text-xl space-y-4 bg-white/5 p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <p className="text-orange-400 font-bold">Premium Package</p>
                    <p className="text-orange-400 font-bold">75% OFF</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-blue-300 font-bold">Starter Package</p>
                    <p className="text-blue-300 font-bold">30% OFF</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-center gap-4 sm:gap-6">
                  {[
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                        <span className="text-3xl lg:text-4xl font-bold text-white">
                          {String(item.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-sm text-blue-200/80 mt-2 block">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-6 rounded-2xl border border-orange-500/20">
                    <span className="text-xl text-gray-400 line-through block">$188</span>
                    <span className="text-4xl font-bold text-orange-400">$47</span>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-2xl border border-blue-500/20">
                    <span className="text-xl text-gray-400 line-through block">$388</span>
                    <span className="text-4xl font-bold text-blue-400">$79</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white py-6 rounded-xl font-bold text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Claim Your Exclusive Discount
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>

                <p className="text-center text-sm text-blue-200/60">
                  *Limited time offer. Terms and conditions apply.
                </p>
              </div>
            </div>

            <DialogClose className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}