"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, DollarSign, Target, TrendingUp, Percent, Timer, AlertTriangle } from "lucide-react"
import { ResponsiveSankey } from '@nivo/sankey'

import { Header } from "@/components/header"
import { OverviewCard } from "@/components/overview-card"
import { AccountDetailsCard } from "@/components/account-details-card"
import { Card } from "@/components/ui/card"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Bar, BarChart, ReferenceLine 
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TradingChallenge from '../component/trading-challenge'

interface TradeDetail {
  ticket: string
  symbol: string
  trade_type: string
  price: number
  profit: number
  date: string
  volume: number
}

interface AccountDetail {
  balance: number
  equity: number
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
  recoveryProgress: number
  startDate: string
  lowestPoint: string
}

interface CandleData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface SankeyNode {
  id: string
  nodeColor: string
}

interface SankeyLink {
  source: string
  target: string
  value: number
  color: string
}

interface Order {
  order_id: string;
  balance: string;
  username: string;
}

export default function DashboardPage() {
  const [accountDetails, setAccountDetails] = useState<AccountDetail | null>(null)
  const [tradeHistory, setTradeHistory] = useState<FormattedTrade[]>([])
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [drawdownData, setDrawdownData] = useState<DrawdownData>({
    maxDrawdown: 5.2,
    currentDrawdown: 2.8,
    recoveryProgress: 65,
    startDate: '2024-01-15',
    lowestPoint: '2024-01-20'
  })
  const [candleData, setCandleData] = useState<CandleData[]>([
    { date: '2024-01-01', open: 10200, high: 10400, low: 10000, close: 10300, volume: 1000 },
    { date: '2024-01-02', open: 10300, high: 10500, low: 10200, close: 10400, volume: 1200 },
    // ... add more data points
  ])
  const [sankeyData, setSankeyData] = useState({
    nodes: [
      { id: 'Initial Balance', nodeColor: '#3b82f6' },
      { id: 'Trading', nodeColor: '#22c55e' },
      { id: 'Profit', nodeColor: '#22c55e' },
      { id: 'Loss', nodeColor: '#ef4444' },
      { id: 'Commission', nodeColor: '#f59e0b' },
      { id: 'Final Balance', nodeColor: '#3b82f6' },
    ],
    links: [
      { source: 'Initial Balance', target: 'Trading', value: 10000, color: '#3b82f6' },
      { source: 'Trading', target: 'Profit', value: 3500, color: '#22c55e' },
      { source: 'Trading', target: 'Loss', value: 1200, color: '#ef4444' },
      { source: 'Trading', target: 'Commission', value: 300, color: '#f59e0b' },
      { source: 'Profit', target: 'Final Balance', value: 3500, color: '#22c55e' },
      { source: 'Loss', target: 'Final Balance', value: 1200, color: '#ef4444' },
      { source: 'Commission', target: 'Final Balance', value: 300, color: '#f59e0b' },
    ]
  })
  const [hasOrders, setHasOrders] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        // Don't set error here to allow dashboard to load even if order check fails
      }
    };

    checkOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        formData.append('session', localStorage.getItem('session_id') || '')
        formData.append('account_id', localStorage.getItem('terminal_id') || '')

        const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/myfxbook/fetch_account_details', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()
        setAccountDetails(data.account_info)
        
        // Transform trade history data
        const formattedTrades = (data.history as TradeDetail[])
          .filter(trade => trade.profit !== 0)
          .map(trade => ({
            id: trade.openTime, // Assuming openTime is unique for each trade
            symbol: trade.symbol,
            type: trade.action,
            openPrice: trade.openPrice,
            profit: trade.profit,
            date: trade.openTime,
            volume: trade.sizing.value
          }))
        setTradeHistory(formattedTrades)

        // Create performance data from trade history
        const perfData = (data.trade_details as TradeDetail[])
          .filter(trade => trade.date)
          .reduce<PerformanceData[]>((acc, trade) => {
            const date = trade.date
            const existingEntry = acc.find(entry => entry.period === date)
            if (existingEntry) {
              existingEntry.accountBalance += trade.profit
              existingEntry.portfolioEquity = existingEntry.accountBalance
            } else {
              acc.push({
                period: date,
                accountBalance: data.account_details.balance,
                portfolioEquity: data.account_details.equity
              })
            }
            return acc
          }, [])
        setPerformanceData(perfData)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    // Only fetch dashboard data if we have orders
    if (hasOrders) {
      fetchData();
    }
  }, [hasOrders]);

  const formatBalance = (balance?: number) => {
    return balance ? `$${balance.toLocaleString()}` : '$0'
  }

  const formatPercentage = (value?: number) => {
    return value ? `${value.toFixed(2)}%` : '0%'
  }

  const calculateWinRate = (trades: FormattedTrade[]) => {
    if (!trades.length) return '0%'
    const winRate = (trades.filter(t => t.profit > 0).length / trades.length) * 100
    return `${winRate.toFixed(1)}%`
  }

  const calculateNetProfit = (trades: FormattedTrade[]) => {
    const total = trades.reduce((sum, trade) => sum + trade.profit, 0)
    return `$${total.toLocaleString()}`
  }

  const calculateDrawdown = (trades: FormattedTrade[], balance?: number) => {
    if (!trades.length || !balance) return '0%'
    const minProfit = Math.min(...trades.map(trade => trade.profit))
    return `${((minProfit / balance) * 100).toFixed(2)}%`
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

  // If we've confirmed there are no orders, show trading challenge
  if (hasOrders === false) {
    return <TradingChallenge />;
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Header />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <OverviewCard
            title="Account Balance"
            value={formatBalance(accountDetails?.balance)}
            change=""
            icon={<DollarSign className="h-5 w-5 text-blue-400" />}
            trend="up"
          />
          <OverviewCard
            title="Total Trades" 
            value={tradeHistory.length.toString()}
            change=""
            icon={<Activity className="h-5 w-5 text-purple-400" />}
            trend="up"
          /> 
          <OverviewCard 
            title="Win Rate" 
            value={calculateWinRate(tradeHistory)}
            change=""
            icon={<Target className="h-5 w-5 text-green-400" />}
            trend="up"
          />
          <OverviewCard
            title="Net Profit"
            value={calculateNetProfit(tradeHistory)}
            change=""
            icon={<TrendingUp className="h-5 w-5 text-orange-400" />}
            trend="up"
          />
          <OverviewCard
            title="Daily Drawdown"
            value={calculateDrawdown(tradeHistory, accountDetails?.balance)}
            change=""
            icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
            trend="up"
          />
        </motion.div>

        <AccountDetailsCard
          orderId={localStorage.getItem('selectedAccountId') || ""}
        />

        {/* Recent Trades Table */}
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