"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Trophy, Users } from "lucide-react"

export default function LearnEarnPage() {
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
            Learn & Earn
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Master trading while earning rewards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <Video className="h-8 w-8 text-orange-500" />,
              title: "Video Courses",
              description: "Comprehensive video tutorials from expert traders"
            },
            {
              icon: <BookOpen className="h-8 w-8 text-blue-500" />,
              title: "Trading Guides",
              description: "In-depth guides and strategy documentation"
            },
            {
              icon: <Trophy className="h-8 w-8 text-purple-500" />,
              title: "Trading Challenges",
              description: "Practice with challenges and win rewards"
            },
            {
              icon: <Users className="h-8 w-8 text-green-500" />,
              title: "Community",
              description: "Join our trading community and learn together"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 bg-[#0d2339]/80 border-gray-800/50 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline"
                      className="border-orange-500/20 hover:bg-orange-500/10"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 