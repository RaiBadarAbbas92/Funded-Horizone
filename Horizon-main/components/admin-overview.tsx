import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, ShoppingCart, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AdminOverviewProps {
  onSelectSection: (section: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders") => void
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders" | null
}

export function AdminOverview({ onSelectSection, selectedSection }: AdminOverviewProps) {
  const [totalOrders, setTotalOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [failedOrders] = useState(0); // Set to 0 as per instruction
  const [rejectedOrders] = useState(0); // Set to 0 as per instruction
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/stats")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.total_users);
        setTotalOrders(data.total_orders);
        setCompletedOrders(data.completed_orders);
      })
      .catch((error) => console.error("Error fetching order stats:", error));
  }, []);

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
            value: totalUsers
          },
          {
            title: "Total Orders",
            icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
            value: totalOrders
          },
          {
            title: "Completed Orders",
            icon: <CheckCircle className="h-5 w-5 text-teal-500" />,
            value: completedOrders
          },
          {
            title: "Failed Orders",
            icon: <XCircle className="h-5 w-5 text-red-500" />,
            value: failedOrders
          },
          {
            title: "Rejected Orders",
            icon: <XCircle className="h-5 w-5 text-yellow-500" />,
            value: rejectedOrders
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
            <Card className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center mb-2">
                {item.icon}
                <h3 className="ml-2 text-lg font-semibold">{item.title}</h3>
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
            </Card>
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
