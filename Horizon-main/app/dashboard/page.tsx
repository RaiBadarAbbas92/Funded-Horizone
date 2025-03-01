"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, DollarSign, Target, TrendingUp, Percent, ChartLine, Timer, AlertTriangle } from "lucide-react"
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData()
        formData.append('account_number', localStorage.getItem('platform_login') || '')
        formData.append('password', localStorage.getItem('platform_password') || '')
        formData.append('server', localStorage.getItem('server') || '')

        const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/meta/fetch_account_details', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()
        setAccountDetails(data.account_details)
        
        // Transform trade history data
        const formattedTrades = (data.trade_details as TradeDetail[])
          .filter(trade => trade.profit !== 0)
          .map(trade => ({
            id: trade.ticket,
            symbol: trade.symbol,
            type: trade.trade_type,
            openPrice: trade.price,
            profit: trade.profit,
            date: trade.date,
            volume: trade.volume
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

    fetchData()
  }, [])

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
    )
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Trading Chart */}
          <Card className="lg:col-span-2 p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Portfolio Performance
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-white">${accountDetails?.equity?.toLocaleString() || '0'}</span>
                  <span className={`text-sm ${accountDetails?.equity && accountDetails?.balance && 
                    accountDetails.equity > accountDetails.balance ? 'text-green-400' : 'text-red-400'}`}>
                    {accountDetails?.equity && accountDetails?.balance ? 
                      `${((accountDetails.equity - accountDetails.balance) / accountDetails.balance * 100).toFixed(2)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {['1H', '4H', '1D', '1W', '1M'].map((timeframe) => (
                    <button
                      key={timeframe}
                      className="px-3 py-1 text-sm rounded-lg bg-[#1a2b3d] text-white hover:bg-[#243a52] transition-colors"
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-rows-[1fr,auto] gap-4 h-[500px]">
              <div className="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradientArea2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#1e293b" 
                      opacity={0.1} 
                      vertical={false}
                    />
                    
                    <XAxis 
                      dataKey="period" 
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      axisLine={{ stroke: '#1e293b' }}
                    />
                    
                    <YAxis 
                      yAxisId="left"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                      axisLine={{ stroke: '#1e293b' }}
                      domain={['dataMin - 1000', 'dataMax + 1000']}
                    />
                    
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                      axisLine={{ stroke: '#1e293b' }}
                    />
                    
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      labelStyle={{ color: '#e2e8f0' }}
                      itemStyle={{ color: '#94a3b8' }}
                    />
                    
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="accountBalance"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#gradientArea)"
                      dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="portfolioEquity"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#gradientArea2)"
                      dot={{ fill: '#22c55e', strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    
                    <ReferenceLine
                      yAxisId="left"
                      y={accountDetails?.balance || 0}
                      stroke="#ef4444"
                      strokeDasharray="3 3"
                      label={{
                        value: 'Initial Balance',
                        position: 'right',
                        fill: '#ef4444'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>

                {/* Technical Indicators Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {[
                    { label: 'RSI', value: '65.4', color: 'text-purple-400' },
                    { label: 'MACD', value: 'Buy', color: 'text-green-400' },
                    { label: 'MA(20)', value: '10,245', color: 'text-blue-400' }
                  ].map((indicator) => (
                    <div 
                      key={indicator.label}
                      className="px-3 py-1 rounded-lg bg-[#1a2b3d]/80 text-sm backdrop-blur-sm flex items-center gap-2"
                    >
                      <span className="text-gray-400">{indicator.label}:</span>
                      <span className={indicator.color}>{indicator.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Chart */}
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#1e293b" 
                      opacity={0.1} 
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="period" 
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      axisLine={{ stroke: '#1e293b' }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      axisLine={{ stroke: '#1e293b' }}
                      tickFormatter={(value) => `${value}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: 'none',
                        borderRadius: '8px'
                      }}
                      cursor={{ fill: '#1e293b', opacity: 0.2 }}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#3b82f6" 
                      opacity={0.8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Trading Statistics */}
          <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6">
              Trading Statistics
            </h2>
            <div className="space-y-6">
              <StatItem
                label="Average Win"
                value={`$${(tradeHistory.filter(t => t.profit > 0).reduce((sum, t) => sum + t.profit, 0) / tradeHistory.filter(t => t.profit > 0).length).toFixed(2)}`}
                icon={<ChartLine className="h-5 w-5 text-green-400" />}
              />
              <StatItem
                label="Average Loss"
                value={`$${Math.abs(tradeHistory.filter(t => t.profit < 0).reduce((sum, t) => sum + t.profit, 0) / tradeHistory.filter(t => t.profit < 0).length).toFixed(2)}`}
                icon={<ChartLine className="h-5 w-5 text-red-400" />}
              />
              <StatItem
                label="Average Hold Time"
                value="2h 15m"
                icon={<Timer className="h-5 w-5 text-blue-400" />}
              />
              <StatItem
                label="Risk/Reward Ratio"
                value="1:2.5"
                icon={<Target className="h-5 w-5 text-purple-400" />}
              />
            </div>
          </Card>
        </motion.div>

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
