'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setIsScrolled(window.scrollY > 0);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Check localStorage only on client side
      setIsLoggedIn(!!window.localStorage.getItem('accessToken'));

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(path);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Trading', href: '/pages/trading' },
    { label: 'Learn & Earn', href: '/pages/learn-earn' },
    { label: 'How it Works', href: '/pages/how-it-works' },
    { label: 'About Us', href: '/pages/about' },
    { label: 'Be a Partner', href: '/pages/partner' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={(e) => handleNavigation('/', e)} className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={40} height={30} className="w-20 h-20 object-contain" priority />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ label, href }) => (
              <Link 
                key={label} 
                href={href}
                onClick={(e) => handleNavigation(href, e)}
                className="text-base text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                {label}
              </Link>
            ))}
          </div>
          {/* Client Area */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link 
                href="/dashboard"
                onClick={(e) => handleNavigation('/dashboard', e)}
                className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-5 rounded-xl"
              >
                Dashboard <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link 
                  href="/signup"
                  onClick={(e) => handleNavigation('/signup', e)}
                  className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-5 rounded-xl"
                >
                  Sign Up <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
                <Link 
                  href="/signin"
                  onClick={(e) => handleNavigation('/signin', e)}
                  className="hidden sm:flex bg-white/5 text-white px-6 py-5 rounded-xl border border-white/10"
                >
                  Login
                </Link>
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
                  {navItems.map(({ label, href }) => (
                    <Link 
                      key={label} 
                      href={href}
                      onClick={(e) => handleNavigation(href, e)}
                      className="text-lg text-white/90 hover:text-white transition-all duration-300 py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-blue-600/10 group"
                    >
                      <span className="relative">
                        {label}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-8 px-6 space-y-4">
                    {isLoggedIn ? (
                      <Link 
                        href="/dashboard"
                        onClick={(e) => handleNavigation('/dashboard', e)}
                        className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 text-white w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all duration-300"
                      >
                        Dashboard <ChevronRight className="ml-2 w-4 h-4" />
                      </Link>
                    ) : (
                      <>
                        <Link 
                          href="/signup"
                          onClick={(e) => handleNavigation('/signup', e)}
                          className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 text-white w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all duration-300"
                        >
                          Sign Up <ChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link 
                          href="/signin"
                          onClick={(e) => handleNavigation('/signin', e)}
                          className="bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 w-full rounded-xl py-6 text-base font-semibold border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                        >
                          Login
                        </Link>
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
  );
}
