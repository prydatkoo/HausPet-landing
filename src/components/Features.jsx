import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Brain, Activity, Sun, Shield, Bell, Stethoscope, Zap, Eye } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const Features = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: Heart,
      title: 'features.list.aiPoweredVitals.title',
      description: 'features.list.aiPoweredVitals.description',
      color: 'from-red-500 to-pink-500',
      accent: 'text-red-600'
    },
    {
      icon: MapPin,
      title: 'features.list.gpsTracking.title',
      description: 'features.list.gpsTracking.description',
      color: 'from-blue-500 to-cyan-500',
      accent: 'text-blue-600'
    },
    {
      icon: Brain,
      title: 'features.list.behavioralAI.title',
      description: 'features.list.behavioralAI.description',
      color: 'from-purple-500 to-indigo-500',
      accent: 'text-purple-600'
    },
    {
      icon: Activity,
      title: 'features.list.healthInsights.title',
      description: 'features.list.healthInsights.description',
      color: 'from-green-500 to-emerald-500',
      accent: 'text-green-600'
    },
    {
      icon: Sun,
      title: 'features.list.solarCharging.title',
      description: 'features.list.solarCharging.description',
      color: 'from-yellow-500 to-orange-500',
      accent: 'text-orange-600'
    },
    {
      icon: Shield,
      title: 'features.list.waterproofDurable.title',
      description: 'features.list.waterproofDurable.description',
      color: 'from-gray-500 to-slate-500',
      accent: 'text-gray-600'
    },
    {
      icon: Bell,
      title: 'features.list.emergencyAlerts.title',
      description: 'features.list.emergencyAlerts.description',
      color: 'from-red-500 to-orange-500',
      accent: 'text-red-600'
    },
    {
      icon: Stethoscope,
      title: 'features.list.vetIntegration.title',
      description: 'features.list.vetIntegration.description',
      color: 'from-sky-500 to-blue-500',
      accent: 'text-sky-600'
    },
    {
      icon: Zap,
      title: 'features.list.fastResponse.title',
      description: 'features.list.fastResponse.description',
      color: 'from-yellow-400 to-amber-500',
      accent: 'text-amber-600'
    }
  ]

  return (
    <section id="features" className="py-12 md:py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-sky-100 text-sky-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            <span>{t('features.tag')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('features.title.beyond')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              {t('features.title.smartPetCare')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-sky-200 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">
                    {t(feature.title)}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {t(feature.description)}
                  </p>
                </div>
              </div>

              {/* Hover Effect - Bottom Accent */}
              <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-sky-200 transition-colors duration-300">
                <div className={`inline-flex items-center text-sm font-semibold ${feature.accent} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                  <Eye className="w-4 h-4 mr-2" />
                  {t('features.learnMore')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('features.cta.title')}
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {t('features.cta.description')}
            </p>
            <motion.a
              href="#early-access"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:from-sky-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              <span>{t('features.cta.button')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
