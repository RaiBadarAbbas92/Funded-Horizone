"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, ChevronRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check login status
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trading", href: "/pages/trading" },
    { label: "Learn & Earn", href: "/pages/learn-earn" },
    { label: "How it Works", href: "/pages/how-it-works" },
    { label: "About Us", href: "/pages/about" },
    { label: "Be a Partner", href: "/pages/partner" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-110 duration-300">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={40} 
              height={30} 
              className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,106,0,0.3)]" 
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base text-white/90 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                <span>{item.label}</span>
                <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </div>

          {/* Client Area Button */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button 
                className="hidden sm:inline-flex items-center text-sm bg-gradient-to-r from-orange-500 to-blue-600 text-white hover:from-blue-600 hover:to-orange-500 px-6 py-5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 font-semibold"
                onClick={() => router.push('/dashboard')}
              >
                Dashboard <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button 
                  className="hidden sm:inline-flex items-center text-sm bg-gradient-to-r from-orange-500 to-blue-600 text-white hover:opacity-90 px-6 py-5 rounded-xl transition-opacity duration-200"
                  onClick={() => router.push('/Signup')}
                >
                  Sign Up <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  className="hidden sm:flex text-sm bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 px-6 py-5 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 font-semibold" 
                  onClick={() => router.push('/sigin')}
                >
                  Login
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden rounded-xl border border-white/10 hover:border-orange-500/50 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-black to-zinc-900 border-white/10 rounded-l-3xl">
                <div className="flex flex-col space-y-6 mt-10">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg text-white/90 hover:text-white transition-all duration-300 py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-blue-600/10 group"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </span>
                    </Link>
                  ))}
                  <div className="pt-8 px-6 space-y-4">
                    {isLoggedIn ? (
                      <Button 
                        className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 text-white w-full rounded-xl py-6 text-base font-semibold shadow-lg shadow-orange-500/20 hover:shadow-blue-600/30 transition-all duration-300"
                        onClick={() => router.push('/dashboard')}
                      >
                        Dashboard <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    ) : (
                      <>
                        <Button 
                          className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 text-white w-full rounded-xl py-6 text-base font-semibold shadow-lg shadow-orange-500/20 hover:shadow-blue-600/30 transition-all duration-300" 
                          onClick={() => router.push('/Signup')}
                        >
                          Sign Up <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button 
                          className="bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 w-full rounded-xl py-6 text-base font-semibold border border-white/10 hover:border-orange-500/50 transition-all duration-300" 
                          onClick={() => router.push('/sigin')}
                        >
                          Login
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
