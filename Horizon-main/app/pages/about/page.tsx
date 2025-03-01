"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { 
  Globe, 
  Users, 
  Target, 
  Award,
  BarChart,
  Shield
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
      </div>

      <Header />

      <div className="container mx-auto py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">
            About Funded Horizon
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Empowering traders worldwide with institutional-grade capital and professional tools
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm h-full">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-500" />
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To democratize access to institutional capital and empower traders to achieve their financial goals through our innovative funding solutions.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm h-full">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-500" />
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To become the world's leading proprietary trading firm, known for our trader-centric approach and innovative technology.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
        >
          {[
            { value: "10,000+", label: "Active Traders", icon: Users },
            { value: "$50M+", label: "Capital Allocated", icon: BarChart },
            { value: "150+", label: "Countries", icon: Globe },
            { value: "99.9%", label: "Success Rate", icon: Award }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 text-orange-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-orange-500" />,
                title: "Transparency",
                description: "Clear rules and open communication with our traders"
              },
              {
                icon: <Award className="h-8 w-8 text-blue-500" />,
                title: "Excellence",
                description: "Commitment to providing the best trading environment"
              },
              {
                icon: <Users className="h-8 w-8 text-purple-500" />,
                title: "Community",
                description: "Supporting and growing together as traders"
              }
            ].map((value, index) => (
              <Card key={index} className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-white/5 rounded-lg mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 