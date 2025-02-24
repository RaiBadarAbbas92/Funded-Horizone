import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Send } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import Image from 'next/image'

export function CommunityCallToAction() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] w-full bg-[#0A0F1C] flex items-center justify-center py-8 sm:py-16">
      {/* Simplified background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Reduce number of blur elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-4 sm:p-8 rounded-2xl backdrop-blur-sm border border-white/5"
          >
            {/* Simplified content animations */}
            <div className="flex-1 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-600">
                  Join Funded Horizon
                </span>
                <br />
                <span className="text-white">Trading Network</span>
              </h2>
              
              <p className="text-base sm:text-lg mb-6 sm:mb-8 backdrop-blur-sm p-4 rounded-lg bg-gray-800/30">
                Connect with professional traders, access exclusive market insights, and elevate your trading journey with our vibrant community. Get real-time market analysis, trading strategies, and personalized mentorship from industry experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  className="bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  Join Our Network
                </Button>
                <Button
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Simplified social media grid */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {[
                  { Icon: Facebook, label: "Facebook", color: "from-[#1877F2] to-[#166FE5]", members: "45K+", link: "https://www.facebook.com/fundedhorizon" },
                  { Icon: Instagram, label: "Instagram", color: "from-[#E4405F] to-[#D93145]", members: "60K+", link: "https://www.instagram.com/fundedhorizon" },
                  { Icon: DiscordLogoIcon, label: "Discord", color: "from-[#5865F2] to-[#7289da]", members: "35K+", link: "https://discord.gg/kRHaaR9Yen" },
                  { Icon: Send, label: "Telegram", color: "from-[#0088cc] to-[#0099ff]", members: "25K+", link: "https://t.me/fundedhorizon" }
                ].map(({ Icon, label, color, members, link }, index) => (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-full p-2">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg">{label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-white/80 text-sm">{members} members</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
