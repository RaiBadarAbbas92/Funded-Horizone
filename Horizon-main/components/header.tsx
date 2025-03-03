"use client"

import { Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccountSwitcher } from "@/components/account-switcher"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Account {
  id: string
  name: string
  balance: number
  username: string
  order_id: string
}

interface HeaderProps {
  isAdmin?: boolean
  onAccountSwitch?: (account: Account) => void
}

interface AccountData {
  order_id: string
  account_size: string
  platform: string
  payment_method: string
}

export function Header({ isAdmin, onAccountSwitch }: HeaderProps) {
  const [accounts, setAccounts] = useState<AccountData[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [username, setUsername] = useState("")
  const [selectedAccountId, setSelectedAccountId] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const storedName = localStorage.getItem('Name')
    const storedAccountId = localStorage.getItem('selectedAccountId')
    if (storedName) {
      setUsername(storedName)
    }
    if (storedAccountId) {
      setSelectedAccountId(storedAccountId)
    }
  }, [])

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accessToken = localStorage.getItem('access_token')
        const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/order_ids', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }) 
        const data = await response.json()
        setAccounts(Array.isArray(data) ? data : [])
        
        if (data.length > 0 && !selectedAccountId) {
          const firstAccount = data[0] 
          const numericId = firstAccount.order_id.replace(/[^\d]/g, '')
          handleAccountSwitch({
            id: firstAccount.order_id,
            name: `${firstAccount.order_id}`,
            balance: 0, // Assuming balance is not provided in the response
            username: firstAccount.order_id, // Assuming username is not provided in the response
            order_id: numericId
          })
        }
        
        if (selectedAccountId) {
          const selectedAccount = data.find(acc => 
            acc.order_id.replace(/[^\d]/g, '') === selectedAccountId
          )
          if (selectedAccount) {
            setUsername(selectedAccount.order_id) // Assuming username is not provided in the response
            localStorage.setItem('Name', selectedAccount.order_id)
          }
        }
      } catch (error) {
        console.error('Error fetching accounts:', error)
      }
    }

    fetchAccounts()
  }, [selectedAccountId])

  const handleAccountSwitch = (account: Account) => {
    const numericId = account.order_id.replace(/[^\d]/g, '')
    
    // Save to localStorage and dispatch storage event
    localStorage.setItem('selectedAccountId', numericId)
    localStorage.setItem('Name', account.username)
    
    // Dispatch storage event manually since we're in the same window
    window.dispatchEvent(new Event('storage'))
    
    setSelectedAccountId(numericId)
    setUsername(account.username)
    
    if (onAccountSwitch) {
      onAccountSwitch({
        ...account,
        order_id: numericId
      })
    }
  }

  const formattedAccounts = Array.isArray(accounts) ? accounts.map(account => ({
    id: account.order_id,
    name: `${account.order_id}`,
    balance: 0, // Assuming balance is not provided in the response
    username: account.order_id, // Assuming username is not provided in the response
    order_id: account.order_id.replace(/[^\d]/g, '')
  })) : []

  return (
    <motion.header 
      className={`sticky top-0 z-40 w-full border-b border-gray-800/50 bg-[#0a1929]/95 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-blue-900/20' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <AccountSwitcher 
          accounts={formattedAccounts} 
          onSwitch={handleAccountSwitch}
          selectedAccountId={selectedAccountId}
        />
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div></div>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 group">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium">{username ? username[0].toUpperCase() : 'A'}</span>
                  </div>
                  <span className="hidden md:inline group-hover:text-blue-400">{username || 'Account'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-lg bg-[#0a1929]/95">
                <DropdownMenuLabel className="text-blue-400">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-500/10 cursor-pointer gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 cursor-pointer gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
