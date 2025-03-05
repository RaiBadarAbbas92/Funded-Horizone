"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Account {
  id: string
  name: string
  balance: number
  username: string
  order_id: string
}

interface AccountSwitcherProps {
  accounts: Account[]
  onSwitch: (account: Account) => void
  selectedAccountId: string
}

export function AccountSwitcher({ accounts, onSwitch, selectedAccountId }: AccountSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayName, setDisplayName] = useState('Select Account')

  useEffect(() => {
    const storedAccountId = localStorage.getItem('selectedAccountId')
    const storedName = localStorage.getItem('Name')
    
    if (accounts.length > 0) {
      if (storedAccountId) {
        // Compare with numeric part of order_id
        const savedAccount = accounts.find(acc => 
          acc.order_id.replace(/[^\d]/g, '') === storedAccountId
        )
        if (savedAccount) {
          setDisplayName(savedAccount.username)
        }
      } else {
        setDisplayName(accounts[0]?.username || 'Select Account')
      }
    }
  }, [accounts])

  const handleSwitch = (account: Account) => {
    setDisplayName(account.username)
    onSwitch(account)
    setIsOpen(false)
  }

  if (!accounts.length) {
    return (
      <Button variant="outline" className="w-[200px] justify-between" disabled>
        No Accounts Available
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[200px] justify-between bg-[#1a1f2d]/80 border-gray-800"
        >
          <span className="truncate">{displayName}</span>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? 'up' : 'down'}
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              exit={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[200px] bg-[#1a1f2d]/95 backdrop-blur-lg border-gray-800"
      >
        <AnimatePresence>
          {accounts.map((account) => (
            <motion.div
              key={account.order_id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem 
                onSelect={() => handleSwitch(account)}
                className={`
                  cursor-pointer
                  ${selectedAccountId === account.order_id.replace(/[^\d]/g, '') 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'hover:bg-blue-500/10'
                  }
                `}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{account.username}</span>
                  <span className="text-xs text-gray-400">
                    Balance: ${account.balance.toLocaleString()}
                  </span>
                </div>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
