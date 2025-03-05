'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  comment: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Professional Trader",
    comment: "The funded trader program transformed my trading career. The platform's support and resources are unmatched.",
    rating: 5,
    image: "/r.jpg"
  },
  {
    id: 2,
    name: "Michael Chen", 
    role: "Day Trader",
    comment: "I was skeptical at first, but the results speak for themselves. The evaluation process is fair and transparent.",
    rating: 5,
    image: "/re.jpg"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Forex Trader", 
    comment: "The best decision I made for my trading journey. The funding process is smooth and professional.",
    rating: 4,
    image: "/rr.jpg"
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0F1C] overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[120px]"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-[100px]"
          animate={{
            x: ["100%", "0%", "100%"],
            y: ["50%", "0%", "50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Trader Success Stories
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Join the community of successful traders who have transformed their careers with our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl p-6 sm:p-8 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-orange-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                  <p className="text-orange-400 text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">"{testimonial.comment}"</p>

              <motion.div 
                className="flex gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 }
                    }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
