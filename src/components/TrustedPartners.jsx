import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Heart, Users, Award } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const TrustedPartners = () => {
  const { t } = useLanguage()

  const stats = [
    {
      icon: Shield,
      number: "100%",
      label: "trustedPartners.stats.veterinaryStandards",
      color: "from-sky-500 to-blue-500"
    },
    {
      icon: Heart,
      number: "24/7",
      label: "trustedPartners.stats.healthMonitoring",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Users,
      number: "AI",
      label: "trustedPartners.stats.aiPoweredInsights",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      number: "99.8%",
      label: "trustedPartners.stats.healthDetectionAccuracy",
      color: "from-purple-500 to-indigo-500"
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('trustedPartners.title.trustedBy')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              {t('trustedPartners.title.professionals')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('trustedPartners.description')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">{t(stat.label)}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {t('trustedPartners.partnershipGoals.title')}
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              {t('trustedPartners.partnershipGoals.description')}
            </p>
          </div>

          {/* Partnership Goals */}
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 md:p-8 bg-sky-50 rounded-xl">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-sky-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('trustedPartners.partnershipGoals.insuranceIntegration.title')}</h4>
                <p className="text-gray-600">{t('trustedPartners.partnershipGoals.insuranceIntegration.description')}</p>
              </div>
              <div className="p-6 md:p-8 bg-orange-50 rounded-xl">
                <Heart className="w-10 h-10 md:w-12 md:h-12 text-orange-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-700 mb-3">{t('trustedPartners.partnershipGoals.veterinaryCollaboration.title')}</h4>
                <p className="text-gray-600">{t('trustedPartners.partnershipGoals.veterinaryCollaboration.description')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedPartners
