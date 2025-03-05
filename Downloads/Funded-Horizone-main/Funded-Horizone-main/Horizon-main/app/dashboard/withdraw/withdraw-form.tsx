'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { CreditCard, Mail, User, DollarSign } from 'lucide-react'

export function WithdrawForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Handle form submission
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      console.log({ username, email, paymentMethod, amount })
    } catch (error) {
      console.error('Withdrawal failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-[#0a1929] to-[#132f4c] border border-orange-500/20 shadow-xl shadow-orange-500/10">
        <div className="p-1">
          <div className="bg-gradient-to-br from-[#0a1929] to-[#132f4c] rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6 p-8">
              <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Withdraw Funds
              </h2>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <Label htmlFor="username" className="text-orange-500 font-medium">Username</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-orange-500/50" />
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="pl-10 bg-slate-900/50 border-orange-500/20 focus:border-orange-500 focus:ring-orange-500/50 transition-all"
                    required 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <Label htmlFor="email" className="text-orange-500 font-medium">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-orange-500/50" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="pl-10 bg-slate-900/50 border-orange-500/20 focus:border-orange-500 focus:ring-orange-500/50 transition-all"
                    required 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <Label htmlFor="payment-method" className="text-orange-500 font-medium">Payment Method</Label>
                <div className="relative mt-2">
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-orange-500/50" />
                  <Select onValueChange={setPaymentMethod} required>
                    <SelectTrigger className="pl-10 bg-slate-900/50 border-orange-500/20 focus:border-orange-500 focus:ring-orange-500/50 transition-all">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-orange-500/20">
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <Label htmlFor="amount" className="text-orange-500 font-medium">Amount</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-orange-500/50" />
                  <Input 
                    id="amount" 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="pl-10 bg-slate-900/50 border-orange-500/20 focus:border-orange-500 focus:ring-orange-500/50 transition-all"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 rounded-lg shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Withdraw Funds'}
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
