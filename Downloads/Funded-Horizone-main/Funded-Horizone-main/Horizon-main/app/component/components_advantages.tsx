import { Calendar, DollarSign, Percent, Database, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export function Advantages() {
  const advantages = [
    {
      icon: Calendar,
      title: "No max or min evaluation days",
      description: "Enjoy unlimited trading days across all plan types and phases. Get funded in as little as one trading day."
    },
    {
      icon: DollarSign,
      title: "No maximum request amount", 
      description: "Request up to full above-buffer profit after 14 calendar days, exclusively on Expert."
    },
    {
      icon: Percent,
      title: "Profits up to $10,000 is all yours",
      description: "After first $10,000 in profits beyond the minimum threshold is entirely yours. After that, benefit from a generous 90% profit split."
    },
    {
      icon: Database,
      title: "Free level 1 data",
      description: "Even when you get funded"
    },
    {
      icon: Lock,
      title: "No set days for payouts",
      description: "After 14 days, you may submit a request, and it will be processed within 48 hours"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -45 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  }

  return (
    <section className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-black to-orange-900 overflow-hidden px-4 py-12 sm:px-6 sm:py-20">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] sm:w-[1000px] h-[600px] sm:h-[1000px] -left-1/3 -top-1/3 bg-blue-500/10 rounded-full blur-[100px] sm:blur-[150px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute w-[600px] sm:w-[1000px] h-[600px] sm:h-[1000px] -right-1/3 -bottom-1/3 bg-orange-500/10 rounded-full blur-[100px] sm:blur-[150px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-12 sm:mb-24"
        >
          <h2 className="text-4xl sm:text-7xl font-extrabold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-8 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
            Our Unique Advantages
          </h2>
          <p className="text-lg sm:text-2xl text-blue-200/90 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Discover what sets us apart and makes us the preferred choice for traders worldwide
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-2 sm:px-0"
        >
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="group relative perspective-1000"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-lg" />
              <div className="relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-gray-900/95 border border-white/10 backdrop-blur-xl shadow-2xl transform-gpu transition-all duration-500 group-hover:border-white/20">
                <div className="flex flex-col sm:flex-row items-center sm:gap-8 mb-6 sm:mb-8">
                  <div className="flex-none w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-lg mb-4 sm:mb-0">
                    <advantage.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-orange-400 transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-center sm:text-left bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-white transition-all duration-500">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed font-light text-center sm:text-left">
                  {advantage.description}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
