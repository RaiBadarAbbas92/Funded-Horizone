"use client"

import { motion } from "framer-motion"

export function AccountOptions() {
  const accounts = [
    {
      size: "$10,000",
      price: "$97",
      features: [
        "Maximum Daily Loss: $500",
        "Maximum Loss: $1,000",
        "Profit Target: $1,000",
        "Profit Split: Up to 90%"
      ]
    },
    {
      size: "$50,000",
      price: "$297",
      popular: true,
      features: [
        "Maximum Daily Loss: $2,500",
        "Maximum Loss: $5,000",
        "Profit Target: $5,000",
        "Profit Split: Up to 90%"
      ]
    },
    {
      size: "$200,000",
      price: "$997",
      features: [
        "Maximum Daily Loss: $10,000",
        "Maximum Loss: $20,000",
        "Profit Target: $20,000",
        "Profit Split: Up to 90%"
      ]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0F1C] to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-white">Choose Your </span>
          <span className="bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent">
            Account Size
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {accounts.map((account) => (
            <motion.div
              key={account.size}
              className={`relative bg-white/5 rounded-2xl p-8 border ${
                account.popular ? 'border-orange-500' : 'border-white/10'
              }`}
            >
              {/* Account content */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 