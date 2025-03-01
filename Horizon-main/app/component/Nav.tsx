'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'FAQs', href: '/faqs' },
    { name: 'Live Market', href: '/live-market' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A1428]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('/')}
            className="cursor-pointer"
          >
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={40} 
              height={30} 
              className="w-20 h-20 object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.href)}
                className="cursor-pointer"
              >
                <span 
                  className="text-gray-300 hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/login')}
              className="px-4 py-2 text-gray-300 hover:text-orange-400 font-medium transition-colors duration-200"
            >
              Login
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/signup')}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-[#1E3A5F] hover:from-orange-600 hover:to-[#0A1428] text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-orange-400 p-2"
                >
                  <Menu className="h-6 w-6" />
                </motion.button>
              </SheetTrigger>
              <SheetContent 
                side="right"
                className="w-[300px] bg-[#0A1428]/95 border-gray-800"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleNavigation(item.href)}
                      className="cursor-pointer"
                    >
                      <span
                        className="text-gray-300 hover:text-orange-400 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-lg block transition-colors duration-200"
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                  <div className="pt-6 space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleNavigation('/login')}
                      className="w-full px-4 py-3 text-gray-300 hover:text-orange-400 font-medium hover:bg-white/5 rounded-lg text-left"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleNavigation('/signup')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-[#1E3A5F] hover:from-orange-600 hover:to-[#0A1428] text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
