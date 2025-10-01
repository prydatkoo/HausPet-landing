import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#features', label: t('header.features') },
    { href: '#testimonials', label: t('header.stories') },
    { href: '#early-access', label: t('header.earlyAccess') },
  ]

  const handleNavClick = (href) => {
    // Always close mobile menu first
    setIsMobileMenuOpen(false)
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      if (!isHomePage) {
        // If not on homepage, navigate to homepage first then scroll
        window.location.href = '/' + href
      } else {
        // If on homepage, just scroll to section
        const element = document.querySelector(href)
        if (element) {
          // Calculate offset for fixed header
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }, 150)
  }

  const languages = ['EN', 'DE']

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/assets/logo.png" 
                alt="HausPet Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-dark">HausPet</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-dark hover:text-primary-from transition-colors duration-300 font-medium cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-light-blue rounded-button p-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    language === lang
                      ? 'bg-white text-dark shadow-sm'
                      : 'text-dark/60 hover:text-dark'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Pre-Order Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/pre-order" className="btn-gradient">
                {language === 'DE' ? 'Vorbestellen' : 'Pre-Order'}
              </Link>
            </motion.div>

            {/* Contact Button */}
            <motion.button
              onClick={() => handleNavClick('#early-access')}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('header.contactUs')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-dark" />
            ) : (
              <Menu className="w-6 h-6 text-dark" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
            <motion.div
              className="absolute top-0 right-0 h-screen w-[320px] max-w-[90vw] bg-white shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center space-x-2 min-w-0">
                  <img 
                    src="/assets/logo.png" 
                    alt="HausPet Logo" 
                    className="h-6 w-auto"
                  />
                  <span className="text-lg font-bold text-dark">HausPet</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5 text-dark" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                {/* Navigation Items */}
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left text-base font-medium text-dark hover:text-primary-from transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-gray-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Language Toggle */}
                <div className="flex items-center space-x-2 py-4 border-t border-gray-100">
                  <Globe className="w-4 h-4 text-dark/60 flex-shrink-0" />
                  <div className="flex bg-gray-100 rounded-lg p-1 flex-1 min-w-0">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 min-w-0 ${
                          language === lang
                            ? 'bg-white text-dark shadow-sm'
                            : 'text-dark/60 hover:text-dark'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <Link
                    to="/pre-order"
                    className="block w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === 'DE' ? 'Vorbestellen' : 'Pre-Order'}
                  </Link>
                  
                  <button
                    onClick={() => handleNavClick('#early-access')}
                    className="block w-full bg-dark text-white font-semibold py-3 px-4 rounded-xl text-center hover:bg-gray-800 transition-all duration-300 text-sm"
                  >
                    {t('header.contactUs')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header 