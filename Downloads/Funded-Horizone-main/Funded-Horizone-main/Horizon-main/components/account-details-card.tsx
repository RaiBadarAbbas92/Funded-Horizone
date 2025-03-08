"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, RefreshCcw, Copy, Check, Server, Globe, Key, User, Wallet, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AccountDetailsCardProps {
  orderId: string
}

interface AccountDetails {
  order_id: string
  challenge_type: string
  account_size: string
  platform: string
  username: string
  server: string
  platform_login: string
  platform_password: string
  profit_target: string
}

export function AccountDetailsCard({ orderId }: AccountDetailsCardProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentOrderId, setCurrentOrderId] = useState(orderId)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [profitTarget, setProfitTarget] = useState<string>('0')

  // Listen to localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedAccountId = localStorage.getItem('selectedAccountId')
      if (storedAccountId && storedAccountId !== currentOrderId) {
        setCurrentOrderId(storedAccountId)
      }
    }

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange)
    
    // Initial check
    const storedAccountId = localStorage.getItem('selectedAccountId')
    if (storedAccountId && storedAccountId !== currentOrderId) {
      setCurrentOrderId(storedAccountId)
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [currentOrderId])

  const fetchAccountDetails = async () => {
    if (!currentOrderId) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(
        `https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/account_detail/${currentOrderId}`
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch account details (Status: ${response.status})`)
      }

      const data = await response.json()
      
      if (!data) {
        throw new Error('No data received from server')
      }

      setAccountDetails(data)
      
      // Save credentials to localStorage
      localStorage.setItem('platform_login', data.platform_login)
      localStorage.setItem('server', data.server)
      localStorage.setItem('password', data.platform_password)
      localStorage.setItem('session_id', data.session_id)
      localStorage.setItem('terminal_id', data.terminal_id)
      localStorage.setItem('profit_target', data.profit_target)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Effect to fetch details when currentOrderId changes
  useEffect(() => {
    if (currentOrderId) {
      fetchAccountDetails()
    }
  }, [currentOrderId])

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (loading) {
    return (
      <Card className="bg-[#0a1929] border-gray-800">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCcw className="h-5 w-5 animate-spin text-orange-500" />
            <span className="text-white">Loading account details...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-[#0a1929] border-gray-800">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <p className="text-red-400">{error}</p>
            <Button 
              onClick={fetchAccountDetails}
              variant="outline" 
              className="text-orange-500 border-orange-500/50"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!accountDetails) {
    return (
      <Card className="bg-[#0a1929] border-gray-800">
        <CardContent className="p-8">
          <div className="text-center text-gray-400">
            No account details available
          </div>
        </CardContent>
      </Card>
    )
  }

  const isActive = accountDetails.server && accountDetails.platform_login && accountDetails.platform_password;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      key={currentOrderId}
    >
      <Card className="bg-gradient-to-br from-[#0a1929] to-[#132f4c] border-gray-800/50 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Account Details
            </CardTitle>
            <p className="text-sm text-gray-400">
              Manage your trading account credentials
            </p>
          </div>
          <Badge
            variant="outline"
            className={`text-lg px-4 py-2 ${isActive ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
          >
            {isActive ? "Active" : "Pending"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          {/* Account Overview Section */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <AccountInfoCard
              icon={<Globe className="h-5 w-5 text-blue-400" />}
              label="Platform"
              value={accountDetails.platform}
            />
            <AccountInfoCard
              icon={<Server className="h-5 w-5 text-purple-400" />}
              label="Server"
              value={accountDetails.server}
            />
            <AccountInfoCard
              icon={<Wallet className="h-5 w-5 text-green-400" />}
              label="Account Size"
              value={`$${parseInt(accountDetails.account_size).toLocaleString()}`}
            />
            <AccountInfoCard
              icon={<Target className="h-5 w-5 text-red-400" />}
              label="Profit Target"
              value={`$${parseInt(profitTarget).toLocaleString()}`}
            />
            <AccountInfoCard
              icon={<User className="h-5 w-5 text-orange-400" />}
              label="Account Type"
              value={accountDetails.challenge_type}
            />
          </div>

          {/* Credentials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-orange-400" />
              Trading Credentials
            </h3>
            <div className="grid gap-4 p-4 bg-black/20 rounded-lg border border-gray-800/50">
              <CredentialField
                label="Login ID"
                value={accountDetails.platform_login}
                onCopy={() => handleCopy(accountDetails.platform_login, 'login')}
                copied={copiedField === 'login'}
              />
              <CredentialField
                label="Password"
                value={accountDetails.platform_password}
                isPassword
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onCopy={() => handleCopy(accountDetails.platform_password, 'password')}
                copied={copiedField === 'password'}
              />
              <CredentialField
                label="Server"
                value={accountDetails.server}
                onCopy={() => handleCopy(accountDetails.server, 'server')}
                copied={copiedField === 'server'}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              className="w-full bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20"
              onClick={() => window.open('https://www.metatrader4.com/en/download', '_blank')}
            >
              Download MT4
            </Button>
            <Button 
              variant="outline"
              className="w-full bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20"
              onClick={() => window.open('https://www.metatrader5.com/en/download', '_blank')}
            >
              Download MT5
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Helper Components
function AccountInfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-gray-800/50 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="font-semibold text-white">{value}</p>
    </div>
  )
}

function CredentialField({ 
  label, 
  value, 
  isPassword = false,
  showPassword = false,
  onTogglePassword,
  onCopy,
  copied
}: {
  label: string
  value: string
  isPassword?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
  onCopy: () => void
  copied: boolean
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-400">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 font-medium text-white font-mono bg-black/20 p-2 rounded">
          {isPassword && !showPassword ? "••••••••" : value}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopy}
                className={`${copied ? 'text-green-400' : 'text-gray-400'} hover:text-white`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isPassword && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePassword}
            className="text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  )
}
