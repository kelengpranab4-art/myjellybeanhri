import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'The Bouquet', href: '#the-bouquet' },
  { label: 'Little Notes', href: '#little-notes' },
  { label: 'Our Moments', href: '#our-moments' },
  { label: 'The Date?', href: '#final-date' },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'the-bouquet', 'little-notes', 'our-moments', 'final-date'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-7 py-2.5 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel border border-dustypink-400/20 shadow-2xl'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo / Monogram */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-2 group text-left"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-dustypink-500 to-lavender-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-white text-white" />
          </span>
          <span className="font-serif italic text-lg sm:text-xl font-medium tracking-wide text-white group-hover:text-dustypink-300 transition-colors">
            For You <span className="text-dustypink-400 not-italic">♡</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-dustypink-500/30 to-lavender-500/30 border border-dustypink-400/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-full text-stone-300 hover:text-white glass-panel focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 mx-auto max-w-sm rounded-2xl glass-panel p-4 border border-dustypink-400/25 shadow-2xl flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={`mobile-${item.label}`}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full py-2.5 px-4 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-dustypink-500/20 text-white border border-dustypink-400/30'
                      : 'text-stone-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
