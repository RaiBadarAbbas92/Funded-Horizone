"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Handshake, 
  PieChart, 
  Users, 
  Globe,
  ArrowRight,
  BadgePercent,
  Building2,
  Rocket
} from "lucide-react"

export default function PartnerPage() {
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
            Become Our Partner
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join our global network of partners and grow together
          </p>
        </motion.div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {[
            {
              icon: <BadgePercent className="h-8 w-8 text-orange-500" />,
              title: "High Commission",
              description: "Earn competitive commissions on referred traders"
            },
            {
              icon: <Building2 className="h-8 w-8 text-blue-500" />,
              title: "Institutional Support",
              description: "Access to dedicated partner success managers"
            },
            {
              icon: <Globe className="h-8 w-8 text-purple-500" />,
              title: "Global Network",
              description: "Connect with partners worldwide"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-white/5 rounded-lg mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partnership Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">Partnership Programs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Affiliate Partner",
                description: "Earn commission by referring traders to our platform",
                features: ["Up to 30% commission", "Marketing materials", "Real-time tracking"],
                icon: <Handshake className="h-8 w-8 text-orange-500" />
              },
              {
                title: "Business Partner",
                description: "Strategic partnership for businesses and institutions",
                features: ["Custom solutions", "API access", "Dedicated support"],
                icon: <Rocket className="h-8 w-8 text-blue-500" />
              }
            ].map((program, index) => (
              <Card key={index} className="p-8 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-lg">
                    {program.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{program.description}</p>
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400">
                      <ArrowRight className="h-4 w-4 text-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 