import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCard } from "@/components/overview-card"
import { Users, DollarSign, ShoppingCart, CheckCircle, XCircle, TrendingUp, BarChart2, Activity, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AdminOverviewProps {
  onSelectSection: (section: "users" | "orders" | "completedOrders" | "failedOrders" | "analytics" | "reports") => void
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | "analytics" | "reports" | null
}

export function AdminOverview({ onSelectSection, selectedSection }: AdminOverviewProps) {
  const [todayLogins, setTodayLogins] = useState(0)
  const [yesterdayLogins, setYesterdayLogins] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [completedOrders, setCompletedOrders] = useState(0)

  useEffect(() => {
    // Fetch login statistics
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/auth/login-stats")
      .then((response) => response.json())
      .then((data) => {
        setTodayLogins(data.today_logins || 0)
        setYesterdayLogins(data.yesterday_logins || 0)
      })
      .catch((error) => console.error("Error fetching login stats:", error))

    // Fetch order statistics
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/stats")
      .then((response) => response.json())
      .then((data) => {
        setTotalOrders(data.total_orders || 0)
        setCompletedOrders(data.completed_orders || 0)
      })
      .catch((error) => console.error("Error fetching order stats:", error))
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          {
            title: "Today's Logins",
            value: todayLogins.toString(),
            change: "+0%",
            icon: <Calendar className="h-5 w-5 text-green-500" />,
            gradient: "from-green-500/10 to-emerald-500/10",
            border: "border-green-500/20"
          },
          {
            title: "Yesterday's Logins",
            value: yesterdayLogins.toString(),
            change: "+0%",
            icon: <Calendar className="h-5 w-5 text-blue-500" />,
            gradient: "from-blue-500/10 to-purple-500/10",
            border: "border-blue-500/20"
          },
          {
            title: "Total Orders",
            value: totalOrders.toString(),
            change: "+0%",
            icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
            gradient: "from-orange-500/10 to-red-500/10",
            border: "border-orange-500/20"
          },
          {
            title: "Completed Orders",
            value: completedOrders.toString(),
            change: "+0%",
            icon: <CheckCircle className="h-5 w-5 text-teal-500" />,
            gradient: "from-teal-500/10 to-cyan-500/10",
            border: "border-teal-500/20"
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
      </motion.div>

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
