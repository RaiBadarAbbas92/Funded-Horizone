import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Send } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import Image from 'next/image'

export function CommunityCallToAction() {
  return (
    <section className="relative min-h-[600px] w-full bg-[#0A0F1C] flex items-center justify-center py-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[80px] animate-pulse" />
        
        {/* Additional animated elements */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] animate-pulse" />
        
        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ top: `${20 * i}%` }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-8 rounded-2xl backdrop-blur-lg border border-white/5"
          >
            {/* Left Section */}
            <div className="flex-1 text-left">
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-blue-500 to-purple-600">
                  Join Funded Horizon
                </span>
                <br />
                <span className="text-white">Trading Network</span>
              </motion.h2>
              
              <motion.p 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg mb-8 backdrop-blur-sm p-4 rounded-lg bg-gray-800/30"
              >
                Connect with professional traders, access exclusive market insights, and elevate your trading journey with our vibrant community. Get real-time market analysis, trading strategies, and personalized mentorship from industry experts.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  Join Our Network
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>

            {/* Right Section - Social Media Grid */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex-1"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { Icon: Facebook, label: "Facebook", color: "from-[#1877F2] to-[#166FE5]", members: "45K+", link: "https://www.facebook.com/fundedhorizon" },
                  { Icon: Instagram, label: "Instagram", color: "from-[#E4405F] to-[#D93145]", members: "60K+", link: "https://www.instagram.com/fundedhorizon" },
                  { Icon: DiscordLogoIcon, label: "Discord", color: "from-[#5865F2] to-[#7289da]", members: "35K+", link: "https://discord.gg/kRHaaR9Yen" },
                  { Icon: Send, label: "Telegram", color: "from-[#0088cc] to-[#0099ff]", members: "25K+", link: "https://t.me/fundedhorizon" }
                ].map(({ Icon, label, color, members, link }, index) => (
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-full p-2">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg">{label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-white/80 text-sm">{members} members</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
