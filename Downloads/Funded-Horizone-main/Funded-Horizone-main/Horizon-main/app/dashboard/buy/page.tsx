"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Loader2,
  CreditCard,
  User,
  Mail,
  DollarSign,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  Copy,
  Timer,
  Globe,
  Shield,
  Zap,
  Award,
  BadgeCheck,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"

const PAYMENT_METHODS = [
   {
    value: "usdt-bep20",
    label: "USDT (BEP20)",
    image: "/Usdt BEP-20.jpg",
    address: "0x10EE69b88803a750D0315724516bB26341F1cCd9",
  },
  {
    value: "usdt-trc20",
    label: "USDT (TRC20)",
    image: "/USDT TRC-20.jpg",
    address: "TASd3e4qaayUoARZ4NWhZy8a4uEwGs3eeX",
  },
 
  {
    value: "bnb-bep20",
    label: "BNB (BEP20)",
    image: "/BNB.jpg",
    address: "0x10EE69b88803a750D0315724516bB26341F1cCd9",
  },
  {
    value: "eth-erc20",
    label: "ETH (ERC20)",
    image: "/ETH.jpg",
    address: "0x10EE69b88803a750D0315724516bB26341F1cCd9",
  },
  {
    value: "sol",
    label: "Solana (SOL)",
    image: "/SOL.jpg",
    address: "6HC7jAKnToyyFuShNteJYZvqYDtGDTu73VpRGkmYQpDJ",
  },
  {
    value: "btc",
    label: "Bitcoin (BTC)",
    image: "/BTC.jpg",
    address: "bc1qtx44fhjetxexf2pkz0unnqe3gsu3fy6tv2p4rs",
  },
]

interface ChallengeType {
  value: string
  label: string
  description: string
  features: string[]
  prices: {
    [key: string]: number
  }
  icon: React.ReactNode
  color: string
}

const CHALLENGE_TYPES: Record<string, ChallengeType> = {
  "HFT Neo": {
    value: "HFT Neo",
    label: "HFT Neo",
    description: "Advanced high-frequency trading program with institutional tools",
    features: ["Advanced algorithms", "Low latency execution", "Professional support"],
    prices: {
      "1000": 14,
      "3000": 28,
      "5000": 40,
      "10000": 68,
      "25000": 133,
      "50000": 79,
      "100000": 136,
      "200000": 498,
      "500000": 992,
    },
    icon: <Zap className="h-5 w-5" />,
    color: "from-purple-500 to-blue-500",
  },
  "One-Step": {
    value: "One-Step",
    label: "One-Step",
    description: "Intermediate level challenge with balanced risk parameters",
    features: ["Flexible trading style", "Moderate risk limits", "Weekly payouts"],
    prices: {
      "1000": 10,
      "3000": 19,
      "5000": 29,
      "10000": 47,
      "25000": 91,
      "50000": 64,
      "100000": 112,
      "200000": 371,
      "500000": 693,
    },
    icon: <Award className="h-5 w-5" />,
    color: "from-orange-500 to-amber-500",
  },
  "Two-Step": {
    value: "Two-Step",
    label: "Two-Step",
    description: "Entry level program perfect for beginning your journey",
    features: ["Basic analysis tools", "Conservative risk limits", "Learning resources"],
    prices: {
      "1000": 7,
      "3000": 14,
      "5000": 19,
      "10000": 31,
      "25000": 54,
      "50000": 47,
      "100000": 79,
      "200000": 274,
      "500000": 499,
    },
    icon: <BadgeCheck className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
  },
}

export default function BuyPage() {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 3,
    minutes: 0,
    seconds: 0,
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
  const [selectedMethod, setSelectedMethod] = useState<(typeof PAYMENT_METHODS)[0] | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [showCopied, setShowCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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
    const method = PAYMENT_METHODS.find((m) => m.value === value)
    setSelectedMethod(method || null)
    setFormData((prev) => ({ ...prev, payment_method: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "challenge_type") {
      const challengeType = Object.values(CHALLENGE_TYPES).find((type) => type.value === value)
      if (challengeType && formData.account_size) {
        setPrice(challengeType.prices[formData.account_size as keyof typeof challengeType.prices] || null)
      }
    }

    if (field === "account_size") {
      const challengeType = Object.values(CHALLENGE_TYPES).find((type) => type.value === formData.challenge_type)
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

    // Validate all fields
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const selectedMethod = PAYMENT_METHODS.find((method) => method.value === formData.payment_method)
      formDataToSend.append("img", selectedMethod?.image || "")

      const accessToken = localStorage.getItem("access_token")
      const response = await fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to submit order")
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
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error submitting order:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    return (
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.challenge_type !== "" &&
      formData.account_size !== "" &&
      formData.platform !== "" &&
      formData.payment_method !== "" &&
      formData.txid.trim() !== ""
    )
  }

  const isFormValid = validateForm()

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="relative mb-6">
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-orange-400 to-blue-400 bg-clip-text text-transparent">
                Funded Horizon
              </h1>
              <motion.div
                className="absolute -z-10 inset-0 blur-3xl opacity-20 rounded-full"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%)",
                    "radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 70%)",
                    "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%)",
                  ],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
              Join the exclusive community of funded horizon and access institutional-grade capital
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="bg-gradient-to-r from-blue-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl px-6 py-3 text-lg md:text-xl text-white font-semibold flex items-center shadow-lg border border-blue-500/10">
                <Timer className="mr-2 h-5 w-5 text-orange-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
                  Sale ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-gray-800/30 backdrop-blur-xl border border-blue-500/20 shadow-2xl overflow-hidden hover:shadow-blue-500/5 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500 shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                      <p className="text-gray-300">Let's get to know you better</p>
                    </div>
                  </div>

                  <Separator className="bg-blue-500/20" />
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="username" className="text-lg font-medium text-white">
                          Full Name <span className="text-orange-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="username"
                            placeholder="Enter Account Name"
                            className="h-14 pl-12 bg-gray-900/50 border-blue-500/20 focus:border-blue-500 rounded-xl text-base text-white"
                            onChange={handleInputChange}
                            value={formData.username}
                            required
                          />
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-lg font-medium text-white">
                          Email Address <span className="text-orange-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-14 pl-12 bg-gray-900/50 border-blue-500/20 focus:border-blue-500 rounded-xl text-base text-white"
                            onChange={handleInputChange}
                            value={formData.email}
                            required
                          />
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Challenge Configuration Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-gray-800/30 backdrop-blur-xl border border-blue-500/20 shadow-2xl overflow-hidden hover:shadow-blue-500/5 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500 shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white">Challenge Configuration</h2>
                      <p className="text-gray-300">Choose your trading parameters</p>
                    </div>
                  </div>

                  <Separator className="bg-blue-500/20" />
                  <div className="p-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-medium text-white">
                          Challenge Type <span className="text-orange-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("challenge_type", value)}
                          value={formData.challenge_type}
                          required
                        >
                          <SelectTrigger className="h-14 bg-gray-900/50 border-blue-500/20 rounded-xl text-white">
                            <SelectValue placeholder="Select your challenge" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-blue-500/20 text-white">
                            {Object.entries(CHALLENGE_TYPES).map(([name, type]) => (
                              <SelectItem key={type.value} value={type.value} className="text-white">
                                <div className="py-2 flex items-center gap-2">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${type.color}`}
                                  >
                                    {type.icon}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">{name}</div>
                                    <div className="text-sm text-gray-300">{type.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-lg font-medium text-white">
                          Account Size <span className="text-orange-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("account_size", value)}
                          value={formData.account_size}
                          required
                        >
                          <SelectTrigger className="h-14 bg-gray-900/50 border-blue-500/20 rounded-xl text-white">
                            <SelectValue placeholder="Select account size" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-blue-500/20 text-white">
                            {["1000", "3000", "5000", "10000", "25000", "50000", "100000", "200000", "500000"].map(
                              (size) => (
                                <SelectItem key={size} value={size} className="text-white">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                      <DollarSign className="h-4 w-4 text-green-500" />
                                    </div>
                                    <span className="text-white">${size.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                  </div>
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-lg font-medium text-white">
                          Trading Platform <span className="text-orange-500">*</span>
                        </Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("platform", value)}
                          value={formData.platform}
                          required
                        >
                          <SelectTrigger className="h-14 bg-gray-900/50 border-blue-500/20 rounded-xl text-white">
                            <SelectValue placeholder="Choose platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-blue-500/20 text-white">
                            <SelectItem value="mt4" className="text-white">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <Globe className="h-4 w-4 text-blue-400" />
                                </div>
                                <span className="text-white">MetaTrader 4</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="mt5" className="text-white">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <Globe className="h-4 w-4 text-blue-400" />
                                </div>
                                <span className="text-white">MetaTrader 5</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.challenge_type && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-xl border border-blue-500/10"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${CHALLENGE_TYPES[formData.challenge_type]?.color}`}
                          >
                            {CHALLENGE_TYPES[formData.challenge_type]?.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-white">{formData.challenge_type} Features</h3>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {CHALLENGE_TYPES[formData.challenge_type]?.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-white">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Details Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gray-800/30 backdrop-blur-xl border border-blue-500/20 shadow-2xl overflow-hidden hover:shadow-blue-500/5 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500 shadow-lg">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white">Payment Details</h2>
                      <p className="text-gray-300">Complete your purchase securely</p>
                    </div>
                  </div>

                  <Separator className="bg-blue-500/20" />
                  <div className="p-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <Label className="text-lg font-medium text-white">
                          Select Payment Method <span className="text-orange-500">*</span>
                        </Label>
                        <Select onValueChange={handleCoinSelect} value={formData.payment_method} required>
                          <SelectTrigger className="h-14 bg-gray-900/50 border-blue-500/20 rounded-xl text-white">
                            <SelectValue placeholder="Choose payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-blue-500/20 text-white">
                            {PAYMENT_METHODS.map((method) => (
                              <SelectItem key={method.value} value={method.value} className="text-white">
                                <div className="flex items-center gap-3 py-1">
                                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <Image
                                      src={method.image || "/placeholder.svg"}
                                      alt={method.label}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-white">{method.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {selectedMethod && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-gray-900/50 rounded-xl space-y-4 border border-blue-500/10 shadow-lg"
                          >
                            <div className="flex justify-center">
                              <div className="bg-white p-4 rounded-xl shadow-lg">
                                <Image
                                  src={selectedMethod.image || "/placeholder.svg"}
                                  alt={selectedMethod.label}
                                  width={180}
                                  height={180}
                                  className="rounded-lg"
                                  priority
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-white">Send payment to:</p>
                              <div className="flex items-center gap-2 bg-gray-800/80 p-4 rounded-lg relative">
                                <code className="text-blue-400 flex-1 break-all text-sm">{selectedMethod.address}</code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  type="button"
                                  onClick={() => handleCopyAddress(selectedMethod.address)}
                                  className="hover:bg-blue-500/20"
                                >
                                  <Copy className="h-4 w-4 text-white" />
                                </Button>
                                {showCopied && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -top-8 right-0 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg"
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
                        <Label htmlFor="txid" className="text-lg font-medium text-white">
                          Transaction ID <span className="text-orange-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="txid"
                            placeholder="Enter your transaction ID"
                            className="h-14 pl-12 bg-gray-900/50 border-blue-500/20 focus:border-blue-500 rounded-xl text-base text-white"
                            onChange={handleInputChange}
                            value={formData.txid}
                            required
                          />
                          <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        {selectedMethod && (
                          <p className="text-sm text-white ml-2">
                            Please enter the transaction ID after sending {selectedMethod.label}
                          </p>
                        )}

                        {price && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-xl space-y-4 border border-blue-500/10 shadow-lg"
                          >
                            <div className="flex justify-between text-white">
                              <span>Subtotal</span>
                              <span>${price}</span>
                            </div>
                            <div className="flex justify-between text-white">
                              <span>Processing Fee</span>
                              <span>$0</span>
                            </div>
                            <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-semibold">
                              <span className="text-white">Total</span>
                              <span className="text-blue-400">${price}</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center pt-6"
            >
              <Button
                type="submit"
                className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 h-16 px-16 text-lg font-medium rounded-xl shadow-lg text-white"
                disabled={isSubmitting}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "linear",
                  }}
                />
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6" />
                    <span>Complete Purchase</span>
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-gray-800 border-blue-500/20 rounded-xl max-w-md text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full"
                />
              </div>
              <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Purchase Successful!</h2>
            <p className="text-white">
              Thank you for joining our trading challenge. Check your email for account details and next steps.
            </p>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 w-full h-12 rounded-xl text-white"
            >
              Got it
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

