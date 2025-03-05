import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCard } from "@/components/overview-card"
import { Users, ShoppingCart, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AdminOverviewProps {
  onSelectSection: (section: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders") => void
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders" | null
}

export function AdminOverview({ onSelectSection, selectedSection }: AdminOverviewProps) {
  const [totalOrders, setTotalOrders] = useState(0)
  const [completedOrders, setCompletedOrders] = useState(0)
  const [failedOrders, setFailedOrders] = useState(0)
  const [rejectedOrders, setRejectedOrders] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/stats")
      .then((response) => response.json())
      .then((data) => {
        setTotalOrders(data.total_orders || 0)
        setCompletedOrders(data.completed_orders || 0)
        setFailedOrders(data.failed_orders || 0)
        setRejectedOrders(data.rejected_orders || 0) // Assuming the API provides rejected orders
      })
      .catch((error) => console.error("Error fetching order stats:", error))

    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/user/stats")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.total_users || 0)
      })
      .catch((error) => console.error("Error fetching user stats:", error))
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
            title: "Total Users",
            icon: <Users className="h-5 w-5 text-blue-500" />,
            gradient: "from-blue-500/10 to-purple-500/10",
            border: "border-blue-500/20",
            graphData: [totalUsers]
          },
          {
            title: "Total Orders",
            icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
            gradient: "from-orange-500/10 to-red-500/10",
            border: "border-orange-500/20",
            graphData: [totalOrders]
          },
          {
            title: "Completed Orders",
            icon: <CheckCircle className="h-5 w-5 text-teal-500" />,
            gradient: "from-teal-500/10 to-cyan-500/10",
            border: "border-teal-500/20",
            graphData: [completedOrders]
          },
          {
            title: "Failed Orders",
            icon: <XCircle className="h-5 w-5 text-red-500" />,
            gradient: "from-red-500/10 to-pink-500/10",
            border: "border-red-500/20",
            graphData: [failedOrders]
          },
          {
            title: "Rejected Orders",
            icon: <XCircle className="h-5 w-5 text-yellow-500" />, // Assuming a different icon for rejected orders
            gradient: "from-yellow-500/10 to-orange-500/10",
            border: "border-yellow-500/20",
            graphData: [rejectedOrders]
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
              icon={item.icon}
              className={`bg-gradient-to-br ${item.gradient} ${item.border} hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300`}
            >
              {/* Render histogram graph using item.graphData */}
              <div className="h-10 bg-gray-200 rounded">
                <div className="h-full bg-blue-500" style={{ width: `${item.graphData[0]}%` }} />
              </div>
            </OverviewCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {["users", "orders", "completedOrders", "failedOrders", "rejectedOrders"].map((section) => (
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
