import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Send } from 'lucide-react'
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import Image from 'next/image'
import Link from 'next/link'

export function CommunityCallToAction() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] w-full bg-[#0A0F1C] py-8 sm:py-16">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-4 sm:p-8 rounded-2xl border border-white/5">
            <div className="flex-1 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center lg:text-left">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-600">
                  Join Funded Horizon
                </span>
                <br />
                <span className="text-white">Trading Network</span>
              </h2>
              
              <p className="text-base sm:text-lg mb-6 sm:mb-8 p-4 rounded-lg bg-gray-800/30 text-white">
                Connect with professional traders, access exclusive market insights, and elevate your trading journey with our vibrant community. Get real-time market analysis, trading strategies, and personalized mentorship from industry experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold">
                    Join Our Network
                  </Button>
                </Link>
                <Button className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold border border-white/20">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-auto">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {[
                  { Icon: Facebook, label: "Facebook", link: "https://www.facebook.com/fundedhorizon" },
                  { Icon: Instagram, label: "Instagram", link: "https://www.instagram.com/fundedhorizon" },
                  { Icon: DiscordLogoIcon, label: "Discord", link: "https://discord.gg/ZzG8demuuz" },
                  { Icon: Send, label: "Telegram", link: "https://t.me/fundedhorizon" }
                ].map(({ Icon, label, link }) => (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10"
                  >
                    <div className="bg-white/10 rounded-full p-2">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg">{label}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
