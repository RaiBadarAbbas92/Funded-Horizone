"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Gift, Users, Coins, TrendingUp } from "lucide-react"

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
      </div>

      <Header />

      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-[#0d2339]/90 to-[#132f4c]/90 border-gray-800/50 shadow-xl p-8">
            <div className="text-center space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
              >
                Referral Program
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300"
              >
                Earn rewards by inviting friends to join our platform
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  {
                    icon: <Gift className="h-10 w-10 text-orange-400" />,
                    title: "Welcome Bonus",
                    description: "Get $50 for each referral"
                  },
                  {
                    icon: <Users className="h-10 w-10 text-blue-400" />,
                    title: "Network Growth",
                    description: "Build your trading community"
                  },
                  {
                    icon: <Coins className="h-10 w-10 text-purple-400" />,
                    title: "Commission Earnings",
                    description: "Earn from referral trades"
                  },
                  {
                    icon: <TrendingUp className="h-10 w-10 text-green-400" />,
                    title: "Performance Rewards",
                    description: "Extra bonuses for top referrers"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * (index + 1) }}
                    className="bg-white/5 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-500/20"
              >
                <p className="text-2xl font-semibold text-orange-400">
                  Coming Soon
                </p>
                <p className="text-gray-300 mt-2">
                  Our referral program is under development. Stay tuned for the launch!
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

