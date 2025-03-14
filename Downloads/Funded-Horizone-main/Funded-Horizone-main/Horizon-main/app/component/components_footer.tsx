import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0A0F1C] to-black text-white">
      {/* Enhanced geometric background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute w-[800px] h-[800px] -left-96 top-0 bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -right-96 bottom-0 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Section - Mobile optimized */}
        <div className="py-12 sm:py-20 border-b border-gray-800/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Brand Section */}
            <motion.div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
                Funded Horizon
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
              Risk Disclosure: Trading financial markets carries substantial risk of loss. Content is educational only and not financial advice. Funded Horizon does not execute trades or manage funds. Services are provided through third parties. Past performance does not guarantee future results. Trade only with risk capital. Use of platform acknowledges acceptance of these risks.</p>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com/fundedhorizon1/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-7 h-7 text-gray-400 hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
                </a>
                <a href="https://t.me/fundedhorizon" target="_blank" rel="noopener noreferrer">
                  <Send className="w-7 h-7 text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110" />
                </a>
                <a href="https://www.instagram.com/fundedhorizon" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-7 h-7 text-gray-400 hover:text-orange-400 cursor-pointer transition-all duration-300 hover:scale-110" />
                </a>
                <a href="https://discord.gg/ZzG8demuuz" target="_blank" rel="noopener noreferrer">
                  <DiscordLogoIcon className="w-7 h-7 text-gray-400 hover:text-[#5865F2] cursor-pointer transition-all duration-300 hover:scale-110" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links - Mobile optimized */}
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Platform</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group"><span className="group-hover:translate-x-2 transition-transform duration-300">Trading Challenges</span></a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group"><span className="group-hover:translate-x-2 transition-transform duration-300">Risk Management</span></a></li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Company</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group"><span className="group-hover:translate-x-2 transition-transform duration-300">Contact</span></a></li>
                </ul>
              </motion.div>
            </div>

            {/* Support Section */}
            <motion.div className="space-y-6 sm:space-y-8">
              <h3 className="text-xl font-semibold text-white">Support</h3>
              <p className="text-gray-300">Need help? Contact our support team.</p>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5" />
                <a href="mailto:support@fundedhorizon.com" className="hover:text-orange-400 transition-colors duration-300">
                  support@fundedhorizon.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Mobile optimized */}
        <div className="py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Funded Horizon. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">Terms</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
