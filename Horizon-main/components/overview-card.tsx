import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  className?: string
}

export function OverviewCard({ title, value, change, icon, className }: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative"
    >
      <Card className={cn("overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-700"
          >
            {icon}
          </motion.div>
        </CardHeader>

        <CardContent className="relative">
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {value}
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </CardContent>
      </Card>
    </motion.div>
  )
}
