'use client'

import { DollarSign, TrendingUp, Clock, Award, Briefcase } from 'lucide-react'
import Image from 'next/image'

export function PayoutSection() {
  const recentPayouts = [
    {
      name: "Alexander Thompson, CFA",
      amount: "$12,450",
      date: "2 hours ago", 
      image: "/rr.jpg",
      profit: "+24.5%",
      account: "Professional",
      experience: "15+ years"
    },
    {
      name: "Dr. Sarah Chen", 
      amount: "$8,320",
      date: "5 hours ago",
      image: "/harr.jpg",
      profit: "+18.2%",
      account: "Enterprise",
      experience: "12+ years"
    },
    {
      name: "Michael Davis, MBA",
      amount: "$15,780", 
      date: "12 hours ago",
      image: "/rrr.jpg",
      profit: "+31.4%",
      account: "Professional",
      experience: "10+ years"
    },
    {
      name: "Emma Wilson, CAIA",
      amount: "$6,940",
      date: "1 day ago",
      image: "/r.jpg",
      profit: "+15.8%",
      account: "Starter",
      experience: "8+ years"
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0A0F1C] to-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Elite Trader Performance
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Showcasing our distinguished traders and their exceptional market achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentPayouts.map((payout, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#1a1f2d] to-[#252a3a] rounded-xl p-6 shadow-xl border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:shadow-orange-500/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all">
                    <Image
                      src={payout.image}
                      alt={payout.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{payout.name}</h3>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-orange-400">{payout.account}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400">{payout.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-orange-400" />
                    <span className="text-2xl font-bold text-white">{payout.amount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{payout.profit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm border-t border-gray-700/50 pt-4">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>{payout.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}