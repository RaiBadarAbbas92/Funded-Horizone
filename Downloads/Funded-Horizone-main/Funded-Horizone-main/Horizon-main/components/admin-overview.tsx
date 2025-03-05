import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, ShoppingCart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AdminOverviewProps {
  onSelectSection: (section: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders" | "runningOrders" | "analytics" | "reports") => void
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders" | "runningOrders" | "analytics" | "reports" | null
}

export function AdminOverview({ onSelectSection, selectedSection }: AdminOverviewProps) {
  const [stats, setStats] = useState({ users: 0, orders: 0, completed: 0, passed: 0, live: 0, running: 0 });

  useEffect(() => {
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/stats")
      .then((response) => response.json())
      .then((data) => setStats({ 
        users: data.total_users, 
        orders: data.total_orders, 
        completed: data.completed_orders,
        passed: data.passed_orders || 0,
        live: data.live_orders || 0,
        running: data.running_orders || 0
      }))
      .catch((error) => console.error("Error fetching order stats:", error));
  }, []);

  return (
    <div className="space-y-4">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { title: "Users", icon: <Users className="h-4 w-4 text-blue-500" />, value: stats.users },
          { title: "Orders", icon: <ShoppingCart className="h-4 w-4 text-orange-500" />, value: stats.orders },
          { title: "Completed", icon: <CheckCircle className="h-4 w-4 text-teal-500" />, value: stats.completed },
          { title: "Passed", icon: <CheckCircle className="h-4 w-4 text-green-500" />, value: stats.passed },
          { title: "Live", icon: <CheckCircle className="h-4 w-4 text-yellow-500" />, value: stats.live },
          { title: "Running", icon: <CheckCircle className="h-4 w-4 text-purple-500" />, value: stats.running }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="flex flex-col items-center p-2 bg-gray-800 shadow-lg rounded-lg">
              <div className="flex items-center mb-1">
                {item.icon}
                <h3 className="ml-1 text-xs font-semibold text-white">{item.title}</h3>
              </div>
              <div className="text-lg font-bold text-white">{item.value}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["users", "orders", "completedOrders", "failedOrders", "rejectedOrders", "runningOrders"].map((section) => (
          <motion.div key={section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onSelectSection(section as any)}
              variant={selectedSection === section ? "default" : "outline"}
              className={`
                group flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium
                ${selectedSection === section 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 border-slate-700'
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
