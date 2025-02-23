import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCard } from "@/components/overview-card"
import { Users, DollarSign, ShoppingCart, CheckCircle, XCircle, TrendingUp, BarChart2, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface AdminOverviewProps {
  onSelectSection: (section: "users" | "orders" | "completedOrders" | "failedOrders" | "analytics" | "reports") => void
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | "analytics" | "reports" | null
}

export function AdminOverview({ onSelectSection, selectedSection }: AdminOverviewProps) {
  // Sample data for charts
  const chartData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1800 },
    { name: 'Mar', value: 1600 },
    { name: 'Apr', value: 2200 },
    { name: 'May', value: 2800 },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-6">
        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a',
                        border: '1px solid #1e293b',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fillOpacity={1}
                      fill="url(#colorGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-white">$892,453</h3>
                </div>
                <BarChart2 className="h-8 w-8 text-blue-400" />
              </div>
              <div className="mt-4">
                <div className="h-2 bg-blue-900 rounded-full">
                  <div className="h-2 bg-blue-400 rounded-full w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <h3 className="text-2xl font-bold text-white">8,749</h3>
                </div>
                <Activity className="h-8 w-8 text-purple-400" />
              </div>
              <div className="mt-4">
                <div className="h-2 bg-purple-900 rounded-full">
                  <div className="h-2 bg-purple-400 rounded-full w-2/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {[
            {
              title: "Total Users",
              value: "1,234",
              change: "+8%",
              icon: <Users className="h-5 w-5 text-blue-500" />,
              gradient: "from-blue-500/10 to-purple-500/10",
              border: "border-blue-500/20"
            },
            {
              title: "Total Payout",
              value: "$543,210",
              change: "+12%",
              icon: <DollarSign className="h-5 w-5 text-green-500" />,
              gradient: "from-green-500/10 to-emerald-500/10",
              border: "border-green-500/20"
            },
            {
              title: "Orders Created",
              value: "789",
              change: "+5%",
              icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
              gradient: "from-orange-500/10 to-red-500/10",
              border: "border-orange-500/20"
            },
            {
              title: "Orders Completed",
              value: "456",
              change: "-2%",
              icon: <CheckCircle className="h-5 w-5 text-teal-500" />,
              gradient: "from-teal-500/10 to-cyan-500/10",
              border: "border-teal-500/20"
            },
            {
              title: "Failed Orders",
              value: "23",
              change: "-15%",
              icon: <XCircle className="h-5 w-5 text-red-500" />,
              gradient: "from-red-500/10 to-pink-500/10", 
              border: "border-red-500/20"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <OverviewCard
                title={item.title}
                value={item.value}
                change={item.change}
                icon={item.icon}
                className={`bg-gradient-to-br ${item.gradient} ${item.border} hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["users", "orders", "completedOrders", "failedOrders", "analytics", "reports"].map((section) => (
          <motion.div
            key={section}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => onSelectSection(section as any)}
              variant={selectedSection === section ? "default" : "outline"}
              className={`
                group flex items-center gap-2 px-6 py-3 rounded-lg font-medium
                ${selectedSection === section 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border-slate-700'
                }
                transition-all duration-300
              `}
            >
              <span className={`
                ${selectedSection === section 
                  ? 'text-white'
                  : 'text-gray-400 group-hover:text-white'
                }
              `}>
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
