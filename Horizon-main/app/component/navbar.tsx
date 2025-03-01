'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0A0F1C]/80 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={40} 
              height={30} 
              className="w-20 h-20 object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signup">
              <Button
                className="bg-gradient-to-r from-orange-500 to-[#1E3A5F] hover:from-orange-600 hover:to-[#0A1428] text-white"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-orange-400"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right"
                className="w-[300px] bg-[#0A0F1C]/95 border-gray-800"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-orange-400 px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-6">
                    <Link href="/signup" className="block w-full">
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-[#1E3A5F] hover:from-orange-600 hover:to-[#0A1428] text-white"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}
