import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageSquare } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Heart className="w-4 h-4" />
              <span>{t('heroInnovativeTech')}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('heroMainTitle')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                {t('heroMainTitleHighlight')}
              </span>{' '}
              {t('heroMainTitleEnd')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
{t('heroMainSubtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.a
                href="#early-access"
                className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-sky-600 hover:to-blue-600 transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                <span>{t('heroJoinWaitlist')}</span>
              </motion.a>
              
              <motion.a
                href="#early-access"
                className="bg-white text-sky-600 border-2 border-sky-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sky-50 transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t('heroContactUs')}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10">
              {/* Hero Image - Pet with Vet */}
              <div className="relative bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional veterinarian examining a golden retriever"
                  className="w-full rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Live Health Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Elements */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-sky-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-orange-200/30 to-sky-200/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero