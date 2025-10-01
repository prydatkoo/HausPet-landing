import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Construction, Clock, Code, Users } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage';

const UnderDevelopment = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-gray-100">
        <div className="container-custom py-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('language') === 'DE' ? 'Zurück zur Startseite' : 'Back to Homepage'}
          </Link>
        </div>
      </header>

      <div className="container-custom py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Construction className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('language') === 'DE' ? 'In Entwicklung' : 'Under Development'}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl lg:text-2xl text-dark/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('language') === 'DE' 
              ? 'Diese Seite wird derzeit entwickelt. Wir arbeiten hart daran, Ihnen bald eine großartige Erfahrung zu bieten!'
              : 'This page is currently under development. We\'re working hard to bring you an amazing experience soon!'
            }
          </motion.p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">
                {t('language') === 'DE' ? 'Kommt Bald' : 'Coming Soon'}
              </h3>
              <p className="text-dark/60">
                {t('language') === 'DE' 
                  ? 'Wir entwickeln diese Funktion mit Sorgfalt und Liebe zum Detail.'
                  : 'We\'re crafting this feature with care and attention to detail.'
                }
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">
                {t('language') === 'DE' ? 'Innovative Features' : 'Innovative Features'}
              </h3>
              <p className="text-dark/60">
                {t('language') === 'DE' 
                  ? 'Neue Technologien und Funktionen werden integriert.'
                  : 'New technologies and features are being integrated.'
                }
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">
                {t('language') === 'DE' ? 'Benutzerfreundlich' : 'User-Friendly'}
              </h3>
              <p className="text-dark/60">
                {t('language') === 'DE' 
                  ? 'Optimiert für die beste Benutzererfahrung.'
                  : 'Optimized for the best user experience.'
                }
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link
              to="/"
              className="btn-gradient inline-flex items-center justify-center space-x-2"
            >
              <span>{t('language') === 'DE' ? 'Zurück zur Startseite' : 'Back to Homepage'}</span>
            </Link>
            
            <Link
              to="/pre-order"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <span>{t('language') === 'DE' ? 'Jetzt Vorbestellen' : 'Pre-Order Now'}</span>
            </Link>
          </motion.div>


        </div>
      </div>
    </div>
  )
}

export default UnderDevelopment 