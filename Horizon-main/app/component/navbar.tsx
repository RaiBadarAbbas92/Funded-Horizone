'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useRouter, usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    // For hash links on the landing page
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Ensure the path starts with a forward slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    window.location.href = normalizedPath;
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Live Market', href: '#live-market' }
  ];

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center cursor-pointer">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={40} 
                height={30} 
                className="w-20 h-20 object-contain" 
                priority 
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavigation('/')}
            className="flex items-center cursor-pointer"
          >
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={40} 
              height={30} 
              className="w-20 h-20 object-contain" 
              priority 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavigation(href)}
                className="text-base text-white/90 hover:text-white transition-colors duration-200 font-medium"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Client Area */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-5 rounded-xl"
              >
                Dashboard <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('/signup')}
                  className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-5 rounded-xl"
                >
                  Sign Up <ChevronRight className="ml-2 w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNavigation('/sigin')}
                  className="hidden sm:flex bg-white/5 text-white px-6 py-5 rounded-xl border border-white/10"
                >
                  Login
                </button>
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
                    <button
                      key={label}
                      onClick={() => handleNavigation(href)}
                      className="text-lg text-white/90 hover:text-white transition-all duration-300 py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-blue-600/10 text-left"
                    >
                      {label}
                    </button>
                  ))}
                  <div className="pt-8 px-6 space-y-4">
                    {isLoggedIn ? (
                      <button
                        onClick={() => handleNavigation('/dashboard')}
                        className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 text-white w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all duration-300"
                      >
                        Dashboard <ChevronRight className="ml-2 w-4 h-4 inline" />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleNavigation('/signup')}
                          className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 text-white w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all duration-300"
                        >
                          Sign Up <ChevronRight className="ml-2 w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => handleNavigation('/sigin')}
                          className="bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 w-full rounded-xl py-6 text-base font-semibold border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                        >
                          Login
                        </button>
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
