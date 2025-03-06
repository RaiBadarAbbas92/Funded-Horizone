"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, DollarSign, Percent, AlertTriangle } from "lucide-react"
import { useRouter } from 'next/navigation'
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
  profit: number
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
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

  // Add mounted ref to track component mount status
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Initialize sessionId and terminalId from localStorage
  useEffect(() => {
    setSessionId(localStorage.getItem('session_id') || '');
    setTerminalId(localStorage.getItem('terminal_id') || '');
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/sigin');
        return;
      }
      setIsAuthenticated(true);
      setIsAuthChecking(false);
    };

    checkAuth();

    // Listen for storage changes (in case token is removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' && !e.newValue) {
        router.push('/sigin');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);

  // Don't render anything while checking auth
  if (isAuthChecking) {
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

  // Only proceed if authenticated
  if (!isAuthenticated) {
    return null;
  }

  const fetchData = async () => {
    try {
      if (!isMounted.current) return;

      const formData = new FormData()
      formData.append('session', sessionId)
      formData.append('account_id', terminalId)

      const response = await fetch('https://fundedhorizon-back-65a0759eedf9.herokuapp.com/myfxbook/fetch_account_details', {
        method: 'POST',
        body: formData
      })

      if (!isMounted.current) return;

      if (!response.ok) {
        setAccountDetails({
          balance: 0,
          equity: 0,
          totalTrades: 0,
          drawdown: 0,
          profit: 0,
        });
        setTradeHistory([]);
        setDrawdownData({
          maxDrawdown: 0,
          currentDrawdown: 0,
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json()
      
      if (!isMounted.current) return;

      setAccountDetails({
        balance: data.account_info?.balance || 0,
        equity: data.account_info?.equity || 0,
        totalTrades: data.history?.length || 0,
        drawdown: data.account_info?.drawdown || 0,
        profit: data.account_info?.profit || 0,
      });
      
      const formattedTrades = (data.history || []).map((trade: TradeDetail) => ({
        id: trade.openTime || '',
        symbol: trade.symbol || '',
        type: trade.action || '',
        openPrice: trade.openPrice || 0,
        profit: trade.profit || 0,
        date: trade.openTime || '',
        volume: trade.sizing?.value || 0
      }));

      if (!isMounted.current) return;
      
      setTradeHistory(formattedTrades);
      setDrawdownData({
        maxDrawdown: data.account_info?.drawdown || 0,
        currentDrawdown: data.account_info?.drawdown || 0,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (!isMounted.current) return;
      
      setAccountDetails({
        balance: 0,
        equity: 0,
        totalTrades: 0,
        drawdown: 0,
        profit: 0,
      });
      setTradeHistory([]);
      setDrawdownData({
        maxDrawdown: 0,
        currentDrawdown: 0,
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const checkOrders = async () => {
      try {
        if (!isMounted.current) return;

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

        if (!isMounted.current) return;

        if (!response.ok) {
          setHasOrders(false);
          return;
        }

        const orders: Order[] = await response.json();
        if (isMounted.current) {
          setHasOrders(orders.length > 0);
        }
      } catch (err) {
        console.error('Error checking orders:', err);
        if (isMounted.current) {
          setHasOrders(false);
        }
      }
    };

    checkOrders();
  }, []);

  useEffect(() => {
    if (hasOrders && isMounted.current) {
      fetchData();
    }
  }, [hasOrders]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const handleStorageChange = () => {
      if (!isMounted.current) return;
      
      const newSessionId = localStorage.getItem('session_id') || '';
      const newTerminalId = localStorage.getItem('terminal_id') || '';
      
      if (newSessionId !== sessionId) {
        setSessionId(newSessionId);
      }
      if (newTerminalId !== terminalId) {
        setTerminalId(newTerminalId);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [sessionId, terminalId]);

  useEffect(() => {
    if (sessionId && terminalId && isMounted.current) {
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
          className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        >
          <OverviewCard
            title="Profit"
            value={formatBalance(accountDetails?.profit)}
            change=""
            icon={<Percent className="h-5 w-5 text-green-400" />}
          />
          <OverviewCard
            title="Account Balance"
            value={formatBalance(accountDetails?.balance)}
            change=""
            icon={<DollarSign className="h-5 w-5 text-blue-400" />}
          />
          <OverviewCard
            title="Total Trades" 
            value={accountDetails?.totalTrades?.toString() || "0"}
            change=""
            icon={<Activity className="h-5 w-5 text-purple-400" />}
          />
          <OverviewCard
            title="Daily Drawdown"
            value={calculateDrawdown(drawdownData.currentDrawdown)}
            change=""
            icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
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