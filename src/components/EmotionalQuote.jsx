import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Quote } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const EmotionalQuote = () => {
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-blue-900/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt={t('emotionalQuote.imageAlt')}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Quote Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 md:mb-8 shadow-xl"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Quote className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          {/* Main Quote */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('emotionalQuote.mainQuote.start')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
              {t('emotionalQuote.mainQuote.highlight')}
            </span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            className="text-lg md:text-2xl text-sky-100 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {t('emotionalQuote.supportingText')}
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-base md:text-lg text-sky-200 font-medium">{t('emotionalQuote.stats.healthMonitoring')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2" dangerouslySetInnerHTML={{ __html: t('emotionalQuote.stats.emergencyResponse') }} />
              <div className="text-base md:text-lg text-sky-200 font-medium">{t('emotionalQuote.stats.emergencyResponseLabel')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.8%</div>
              <div className="text-base md:text-lg text-sky-200 font-medium">{t('emotionalQuote.stats.accuracyRate')}</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#early-access"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-6 h-6" />
              <span>{t('emotionalQuote.cta.button')}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
    </section>
  )
}

export default EmotionalQuote
