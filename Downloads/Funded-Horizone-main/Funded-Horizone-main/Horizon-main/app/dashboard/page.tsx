"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, DollarSign, Percent, AlertTriangle } from "lucide-react"
import { ResponsiveSankey } from '@nivo/sankey'

import { Header } from "@/components/header"
import { OverviewCard } from "@/components/overview-card"
import { AccountDetailsCard } from "@/components/account-details-card"
import { Card } from "@/components/ui/card"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import TradingChallenge from '../component/trading-challenge'

interface TradeDetail {
  openTime: string
  closeTime: string
  symbol: string
  action: string
  sizing: {
    type: string
    value: string
  }
  openPrice: number
  closePrice: number
  profit: number
}

interface AccountDetail {
  balance: number
  equity: number
  totalTrades: number
  drawdown: number
}

interface FormattedTrade {
  id: string
  symbol: string
  type: string
  openPrice: number
  profit: number
  date: string
  volume: number
}

interface PerformanceData {
  period: string
  accountBalance: number
  portfolioEquity: number
}

interface DrawdownData {
  maxDrawdown: number
  currentDrawdown: number
}

interface Order {
  id: string;
  symbol: string;
  action: string;
  sizing: {
    type: string;
    value: string;
  };
  openPrice: number;
  closePrice: number;
  profit: number;
}

export default function DashboardPage() {
  const [accountDetails, setAccountDetails] = useState<AccountDetail | null>(null)
  const [tradeHistory, setTradeHistory] = useState<FormattedTrade[]>([])
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [drawdownData, setDrawdownData] = useState<DrawdownData>({
    maxDrawdown: 0,
    currentDrawdown: 0,
  })
  const [hasOrders, setHasOrders] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [terminalId, setTerminalId] = useState('');

  // Initialize sessionId and terminalId from localStorage
  useEffect(() => {
    setSessionId(localStorage.getItem('session_id') || '');
    setTerminalId(localStorage.getItem('terminal_id') || '');
  }, []);

  const fetchData = async () => {
    try {
      const formData = new FormData()
      formData.append('session', sessionId)
      formData.append('account_id', terminalId)

      const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/myfxbook/fetch_account_details', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setAccountDetails({
        balance: data.account_info.balance,
        equity: data.account_info.equity,
        totalTrades: data.history.length,
        drawdown: data.account_info.drawdown,
      });
      
      // Transform trade history data
      const formattedTrades = data.history.map((trade: TradeDetail) => ({
        id: trade.openTime,
        symbol: trade.symbol,
        type: trade.action,
        openPrice: trade.openPrice,
        profit: trade.profit,
        date: trade.openTime,
        volume: trade.sizing.value
      }));
      setTradeHistory(formattedTrades)

      // Set drawdown data
      setDrawdownData({
        maxDrawdown: data.account_info.drawdown,
        currentDrawdown: data.account_info.drawdown,
      });

      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const checkOrders = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/order_ids', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const orders: Order[] = await response.json();
        setHasOrders(orders.length > 0);
      } catch (err) {
        console.error('Error checking orders:', err);
      }
    };

    checkOrders();
  }, []);

  useEffect(() => {
    if (hasOrders) {
      fetchData();
    }
  }, [hasOrders]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newSessionId = localStorage.getItem('session_id') || '';
      const newTerminalId = localStorage.getItem('terminal_id') || '';
      
      if (newSessionId !== sessionId) {
        setSessionId(newSessionId);
      }
      if (newTerminalId !== terminalId) {
        setTerminalId(newTerminalId);
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes every second
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [sessionId, terminalId]);

  // Fetch data when sessionId or terminalId changes
  useEffect(() => {
    if (sessionId && terminalId) {
      fetchData();
    }
  }, [sessionId, terminalId]);

  const formatBalance = (balance?: number) => {
    return balance ? `$${balance.toLocaleString()}` : '$0'
  }

  const calculateDrawdown = (drawdown?: number) => {
    return drawdown ? `${drawdown.toFixed(2)}%` : '0%'
  }

  if (isLoading && hasOrders !== false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-center">
          <p className="text-xl font-semibold">Error loading dashboard</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (hasOrders === false) {
    return <TradingChallenge isDashboard={true} />;
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Header />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4"
        >
          <OverviewCard
            title="Account Size"
            value={formatBalance(accountDetails?.equity)}
            change=""
            icon={<DollarSign className="h-5 w-5 text-blue-400" />}
            trend="up"
          />
          <OverviewCard
            title="Profit Target"
            value="10%"
            change=""
            icon={<Percent className="h-5 w-5 text-green-400" />}
            trend="up"
          />
          <OverviewCard
            title="Account Balance"
            value={formatBalance(accountDetails?.balance)}
            change=""
            icon={<DollarSign className="h-5 w-5 text-blue-400" />}
            trend="up"
          />
          <OverviewCard
            title="Total Trades" 
            value={accountDetails?.totalTrades.toString()}
            change=""
            icon={<Activity className="h-5 w-5 text-purple-400" />}
            trend="up"
          />
          <OverviewCard
            title="Daily Drawdown"
            value={calculateDrawdown(drawdownData.currentDrawdown)}
            change=""
            icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
            trend="up"
          />
        </motion.div>

        <AccountDetailsCard
          orderId={localStorage.getItem('selectedAccountId') || ""}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">
              Recent Trades
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-400">Symbol</TableHead>
                    <TableHead className="text-gray-400">Type</TableHead>
                    <TableHead className="text-gray-400">Volume</TableHead>
                    <TableHead className="text-gray-400">Entry Price</TableHead>
                    <TableHead className="text-gray-400">P/L</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tradeHistory.slice(0, 5).map((trade, index) => (
                    <TableRow key={trade.id} className="hover:bg-white/5">
                      <TableCell className="font-medium">{trade.symbol}</TableCell>
                      <TableCell className={trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'}>
                        {trade.type}
                      </TableCell>
                      <TableCell>{trade.volume}</TableCell>
                      <TableCell>{trade.openPrice}</TableCell>
                      <TableCell className={trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}>
                        ${trade.profit.toLocaleString()}
                      </TableCell>
                      <TableCell>{trade.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

function StatItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <span className="text-gray-400">{label}</span>
      </div>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}