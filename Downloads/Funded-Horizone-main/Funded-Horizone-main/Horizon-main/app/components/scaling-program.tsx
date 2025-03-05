"use client"

import { motion } from 'framer-motion'
import { TrendingUp, Target, Award, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ScalingProgram() {
  const levels = [
    {
      level: "Level 1",
      funding: "$100,000",
      profitTarget: "8%",
      profitSplit: "80%",
      requirements: [
        "Maximum Daily Loss: $5,000",
        "Maximum Total Loss: $10,000",
        "Minimum Trading Days: 10"
      ]
    },
    {
      level: "Level 2",
      funding: "$200,000",
      profitTarget: "5%",
      profitSplit: "85%",
      requirements: [
        "Maximum Daily Loss: $10,000",
        "Maximum Total Loss: $20,000",
        "Minimum Trading Days: 15"
      ]
    },
    {
      level: "Level 3",
      funding: "$400,000",
      profitTarget: "4%",
      profitSplit: "90%",
      requirements: [
        "Maximum Daily Loss: $20,000",
        "Maximum Total Loss: $40,000",
        "Minimum Trading Days: 20"
      ]
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div 
          className="absolute w-[500px] h-[500px] -left-64 -top-64 bg-blue-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-6">
            Scaling Program
          </h2>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
            Grow your trading account with our performance-based scaling program
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                {index === 0 ? (
                  <Target className="w-10 h-10 text-orange-400" />
                ) : index === 1 ? (
                  <TrendingUp className="w-10 h-10 text-blue-400" />
                ) : (
                  <Award className="w-10 h-10 text-green-400" />
                )}
                <h3 className="text-2xl font-bold text-white">{level.level}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-400">Account Size</p>
                  <p className="text-3xl font-bold text-white">{level.funding}</p>
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-400">Profit Target</p>
                    <p className="text-xl font-bold text-green-400">{level.profitTarget}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Profit Split</p>
                    <p className="text-xl font-bold text-blue-400">{level.profitSplit}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {level.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {req}
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
                >
                  Get Started <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}