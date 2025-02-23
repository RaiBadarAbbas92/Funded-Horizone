"use client"

import { motion } from "framer-motion"
import { Target, Shield, DollarSign } from "lucide-react"

export function EvaluationProcess() {
  const steps = [
    {
      step: "01",
      title: "Funded Horizon Challenge",
      description: "Demonstrate your professional trading expertise by achieving a 10% profit target while adhering to strict risk management protocols.",
      icon: Target
    },
    {
      step: "02",
      title: "Verification Phase",
      description: "Validate your consistent performance by reaching a 5% profit target while maintaining disciplined risk management practices.",
      icon: Shield
    },
    {
      step: "03",
      title: "Professional Funded Account",
      description: "Access institutional-grade funding up to $200,000. Retain up to 90% of your trading profits with flexible trading conditions.",
      icon: DollarSign
    }
  ]

  return (
    <section className="py-20 bg-[#0A0F1C]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">
            Three Steps
          </span>
          <span className="text-white"> to Funded Account</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-orange-500">{step.step}</span>
                <step.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 