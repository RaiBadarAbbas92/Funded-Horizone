"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CreditCard, User, Mail, Coins, DollarSign, ShieldCheck, Wallet, Star, CheckCircle2, Copy, Timer, AlertCircle, ChevronRight, Sparkles, Globe, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PAYMENT_METHODS = [
  {
    value: "usdt-trc20",
    label: "USDT (TRC20)", 
    image: "/USDT TRC-20.jpg",
    address: "TASd3e4qaayUoARZ4NWhZy8a4uEwGs3eeX"
  },
  {
    value: "usdt-bep20",
    label: "USDT (BEP20)",
    image: "/Usdt BEP-20.jpg",
    address: "0x10EE69b88803a750D0315724516bB26341F1cCd9"
  },
  {
    value: "bnb-bep20",
    label: "BNB (BEP20)",
    image: "/BNB.jpg", 
    address: "0x10EE69b88803a750D0315724516bB26341F1cCd9"
  },
  {
    value: "eth-erc20",
    label: "ETH (ERC20)",
    image: "/ETH.jpg",
    address: "0x10EE69b88803a750D0315724516bB26341F1cCd9"
  },
  {
    value: "sol",
    label: "Solana (SOL)", 
    image: "/SOL.jpg",
    address: "6HC7jAKnToyyFuShNteJYZvqYDtGDTu73VpRGkmYQpDJ"
  },
  {
    value: "btc",
    label: "Bitcoin (BTC)",
    image: "/BTC.jpg",
    address: "bc1qtx44fhjetxexf2pkz0unnqe3gsu3fy6tv2p4rs"
  }
]

interface ChallengeType {
  value: string
  label: string
  description: string
  features: string[]
  prices: {
    [key: string]: number
  }
}

const CHALLENGE_TYPES: Record<string, ChallengeType> = {
  'HFT Neo': {
    value: 'HFT Neo',
    label: 'HFT Neo',
    description: 'Advanced high-frequency trading program with institutional tools',
    features: ['Advanced algorithms', 'Low latency execution', 'Professional support'],
    prices: {
      "1000": 14,
      "3000": 28,
      "5000": 40,
      "10000": 68,
      "25000": 133,
      "50000": 79,
      "100000": 136,
      "200000": 498,
      "500000": 992
    }
  },
  'One-Step': {
    value: 'One-Step',
    label: 'One-Step',
    description: 'Intermediate level challenge with balanced risk parameters',
    features: ['Flexible trading style', 'Moderate risk limits', 'Weekly payouts'],
    prices: {
      "1000": 10,
      "3000": 19,
      "5000": 29,
      "10000": 47,
      "25000": 91,
      "50000": 64,
      "100000": 112,
      "200000": 371,
      "500000": 693
    }
  },
  'Two-Step': {
    value: 'Two-Step',
    label: 'Two-Step',
    description: 'Entry level program perfect for beginning your journey',
    features: ['Basic analysis tools', 'Conservative risk limits', 'Learning resources'],
    prices: {
      "1000": 7,
      "3000": 14,
      "5000": 19,
      "10000": 31,
      "25000": 54,
      "50000": 47,
      "100000": 79,
      "200000": 274,
      "500000": 499
    }
  }
}

export default function BuyPage() {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 3,
    minutes: 0,
    seconds: 0
  })
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    challenge_type: "",
    account_size: "",
    platform: "",
    payment_method: "",
    txid: "",
  })
  const [selectedMethod, setSelectedMethod] = useState<typeof PAYMENT_METHODS[0] | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [showCopied, setShowCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCoinSelect = (value: string) => {
    const method = PAYMENT_METHODS.find(m => m.value === value)
    setSelectedMethod(method || null)
    setFormData(prev => ({ ...prev, payment_method: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (field === 'challenge_type') {
      const challengeType = Object.values(CHALLENGE_TYPES).find(type => type.value === value)
      if (challengeType && formData.account_size) {
        setPrice(challengeType.prices[formData.account_size as keyof typeof challengeType.prices] || null)
      }
    }
    
    if (field === 'account_size') {
      const challengeType = Object.values(CHALLENGE_TYPES).find(type => type.value === formData.challenge_type)
      if (challengeType) {
        setPrice(challengeType.prices[value as keyof typeof challengeType.prices] || null)
      }
    }
  }

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const selectedMethod = PAYMENT_METHODS.find(method => method.value === formData.payment_method)
      formDataToSend.append('img', selectedMethod?.image || '')

      const accessToken = localStorage.getItem('access_token')
      const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Failed to submit order')
      }

      const data = await response.json()
      setShowConfirmation(true)
      setFormData({
        username: "",
        email: "",
        challenge_type: "",
        account_size: "",
        platform: "",
        payment_method: "",
        txid: "",
      })

      // Show confirmation for 2 seconds then redirect
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Error submitting order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const validateStep = (step: number) => {
    if (step === 1) {
      return formData.username.trim() !== "" && formData.email.trim() !== "";
    } else if (step === 2) {
      return formData.challenge_type !== "" && formData.account_size !== "" && formData.platform !== "";
    } else if (step === 3) {
      return formData.payment_method !== "" && formData.txid.trim() !== "";
    }
    return false;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-orange-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Funded Horizon
            </h1>
            <p className="text-gray-300 text-2xl max-w-2xl mx-auto">
              Join the exclusive community of funded horizon and access institutional-grade capital
            </p>
            <div className="mt-6 text-xl text-blue-400 font-semibold">
              Sale ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4 bg-gray-800/30 rounded-full p-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${currentStep === step ? 'text-blue-400' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step ? 'bg-blue-500/20 border-2 border-blue-400' : 'bg-gray-700'
                  }`}>
                    {step === 1 ? <User className="h-5 w-5" /> : 
                     step === 2 ? <Shield className="h-5 w-5" /> :
                     <CreditCard className="h-5 w-5" />}
                  </div>
                  {step < 3 && <ChevronRight className="h-5 w-5 text-gray-600 mx-2" />}
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-gray-800/30 backdrop-blur-xl border border-blue-500/20 shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">Personal Information</h2>
                        <p className="text-gray-400">Let's get to know you better</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-lg">Full Name <span className="text-red-500">*</span></Label>
                          <Input 
                            id="username"
                            placeholder="Enter Account Name"
                            className="h-12 bg-gray-900/50 border-blue-500/20 focus:border-blue-500"
                            onChange={handleInputChange}
                            value={formData.username}
                            required
                          />
                          {formData.username.trim() === "" && <p className="text-red-500 text-sm"></p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-lg">Email Address <span className="text-red-500">*</span></Label>
                          <Input 
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 bg-gray-900/50 border-blue-500/20 focus:border-blue-500"
                            onChange={handleInputChange}
                            value={formData.email}
                            required
                          />
                          {formData.email.trim() === "" && <p className="text-red-500 text-sm"></p>}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 h-12 px-8"
                        >
                          Next Step
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">Challenge Configuration</h2>
                        <p className="text-gray-400">Choose your trading parameters</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Label className="text-lg">Challenge Type <span className="text-red-500">*</span></Label>
                          <Select onValueChange={(value) => handleSelectChange("challenge_type", value)} required>
                            <SelectTrigger className="h-12 bg-gray-900/50 border-blue-500/20">
                              <SelectValue placeholder="Select your challenge" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(CHALLENGE_TYPES).map(([name, type]) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="py-2">
                                    <div className="font-semibold">{name}</div>
                                    <div className="text-sm text-gray-400">{type.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formData.challenge_type === "" && <p className="text-red-500 text-sm"></p>}
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg">Account Size <span className="text-red-500">*</span></Label>
                          <Select onValueChange={(value) => handleSelectChange("account_size", value)} required>
                            <SelectTrigger className="h-12 bg-gray-900/50 border-blue-500/20">
                              <SelectValue placeholder="Select account size" />
                            </SelectTrigger>
                            <SelectContent>
                              {["1000", "3000", "5000", "10000", "25000", "50000", "100000", "200000", "500000"].map((size) => (
                                <SelectItem key={size} value={size}>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-green-500" />
                                    ${size.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formData.account_size === "" && <p className="text-red-500 text-sm"></p>}
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg">Trading Platform <span className="text-red-500">*</span></Label>
                          <Select onValueChange={(value) => handleSelectChange("platform", value)} required>
                            <SelectTrigger className="h-12 bg-gray-900/50 border-blue-500/20">
                              <SelectValue placeholder="Choose platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mt4">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  MetaTrader 4
                                </div>
                              </SelectItem>
                              <SelectItem value="mt5">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  MetaTrader 5
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {formData.platform === "" && <p className="text-red-500 text-sm"></p>}
                        </div>
                      </div>

                      {price && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-center mt-8"
                        >
                          <div className="bg-blue-500/20 rounded-xl p-6 text-center">
                            <div className="text-gray-400 mb-2">Total Investment</div>
                            <div className="text-4xl font-bold text-blue-400">${price}</div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="h-12 px-8 border-blue-500/20"
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 h-12 px-8"
                        >
                          Continue to Payment
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">Payment Details</h2>
                        <p className="text-gray-400">Complete your purchase securely</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Label className="text-lg">Select Payment Method <span className="text-red-500">*</span></Label>
                          <Select onValueChange={handleCoinSelect} required>
                            <SelectTrigger className="h-12 bg-gray-900/50 border-blue-500/20">
                              <SelectValue placeholder="Choose payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              {PAYMENT_METHODS.map((method) => (
                                <SelectItem key={method.value} value={method.value}>
                                  <div className="flex items-center gap-3 py-1">
                                    <Image
                                      src={method.image}
                                      alt={method.label}
                                      width={24}
                                      height={24}
                                      className="rounded-full"
                                    />
                                    <span>{method.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formData.payment_method === "" && <p className="text-red-500 text-sm"></p>}
                          {selectedMethod && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-6 bg-gray-900/50 rounded-xl space-y-4"
                            >
                              <div className="flex justify-center">
                                <div className="bg-white p-4 rounded-xl">
                                  <Image
                                    src={selectedMethod.image}
                                    alt={selectedMethod.label}
                                    width={150}
                                    height={150}
                                    className="rounded-lg"
                                    priority
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-400">Send payment to:</p>
                                <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-lg relative">
                                  <code className="text-blue-400 flex-1 break-all text-sm">
                                    {selectedMethod.address}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCopyAddress(selectedMethod.address)}
                                    className="hover:bg-blue-500/20"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  {showCopied && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0 }}
                                      className="absolute -top-8 right-0 bg-green-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                      Copied!
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="txid" className="text-lg">Transaction ID <span className="text-red-500">*</span></Label>
                          <Input 
                            id="txid"
                            placeholder="Enter your transaction ID"
                            className="h-12 bg-gray-900/50 border-blue-500/20 focus:border-blue-500"
                            onChange={handleInputChange}
                            value={formData.txid}
                            required
                          />
                          {formData.txid.trim() === "" && <p className="text-red-500 text-sm"></p>}
                          {selectedMethod && (
                            <p className="text-sm text-gray-400">
                              Please enter the transaction ID after sending {selectedMethod.label}
                            </p>
                          )}

                          {price && (
                            <div className="mt-8 p-6 bg-gray-900/50 rounded-xl space-y-4">
                              <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${price}</span>
                              </div>
                              <div className="flex justify-between text-gray-400">
                                <span>Processing Fee</span>
                                <span>$0</span>
                              </div>
                              <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span className="text-blue-400">${price}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          className="h-12 px-8 border-blue-500/20"
                        >
                          Previous
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 h-12 px-8"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Processing...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5" />
                              Complete Purchase
                            </div>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-gray-800 border-blue-500/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 space-y-4"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full"
                />
              </div>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Purchase Successful!</h2>
            <p className="text-gray-300">
              Thank you for joining our trading challenge. Check your email for account details and next steps.
            </p>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600"
            >
              Got it
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
