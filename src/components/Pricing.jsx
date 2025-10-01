import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Heart, Brain, Zap, Crown, Star } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const Pricing = () => {
  const { t, language } = useLanguage()
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const plans = [
    {
      name: 'pricing.plans.basic.name',
      description: 'pricing.plans.basic.description',
      price: { monthly: 0, yearly: 0 },
      popular: false,
      color: 'from-gray-500 to-slate-500',
      icon: Heart,
      features: [
        'pricing.plans.basic.features.monitoring',
        'pricing.plans.basic.features.gps',
        'pricing.plans.basic.features.app',
        'pricing.plans.basic.features.email',
        'pricing.plans.basic.features.support',
        'pricing.plans.basic.features.reports'
      ]
    },
    {
      name: 'pricing.plans.pro.name',
      description: 'pricing.plans.pro.description',
      price: { monthly: 10, yearly: 96 },
      popular: true,
      color: 'from-sky-500 to-blue-500',
      icon: Brain,
      features: [
        'pricing.plans.pro.features.basic',
        'pricing.plans.pro.features.insights',
        'pricing.plans.pro.features.vetNotifications',
        'pricing.plans.pro.features.analysis',
        'pricing.plans.pro.features.alerts',
        'pricing.plans.pro.features.analytics',
        'pricing.plans.pro.features.support',
        'pricing.plans.pro.features.integration',
        'pricing.plans.pro.features.predictions'
      ]
    },
    {
      name: 'pricing.plans.premium.name',
      description: 'pricing.plans.premium.description',
      price: { monthly: 25, yearly: 240 },
      popular: false,
      color: 'from-orange-500 to-yellow-500',
      icon: Crown,
      features: [
        'pricing.plans.premium.features.pro',
        'pricing.plans.premium.features.consultation',
        'pricing.plans.premium.features.plans',
        'pricing.plans.premium.features.response',
        'pricing.plans.premium.features.multiPet',
        'pricing.plans.premium.features.protocols',
        'pricing.plans.premium.features.manager',
        'pricing.plans.premium.features.coverage',
        'pricing.plans.premium.features.referrals'
      ]
    }
  ]

  const getSavings = (plan) => {
    if (billingPeriod === 'yearly' && plan.price.monthly > 0) {
      const monthlyTotal = plan.price.monthly * 12
      const savings = monthlyTotal - plan.price.yearly
      return savings
    }
    return 0
  }
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  return (
    <section id="pricing" className="py-12 md:py-20 bg-gradient-to-br from-sky-50 via-white to-blue-50">
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
            <span>{t('pricing.tag')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('pricing.title.choose')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              {t('pricing.title.aiPlan')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('pricing.description')}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 relative ${
                billingPeriod === 'yearly'
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('pricing.yearly')}
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {t('pricing.save', { amount: formatCurrency(24) })}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const savings = getSavings(plan)
            
            return (
              <motion.div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  plan.popular ? 'ring-4 ring-sky-500 ring-opacity-20 lg:scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1 md:px-6 md:py-2 rounded-full font-bold text-xs md:text-sm shadow-lg">
                      <Star className="w-4 h-4 inline mr-1" />
                      {t('pricing.mostPopular')}
                    </div>
                  </div>
                )}
                <div className={`bg-gradient-to-r ${plan.color} p-6 md:p-8 text-white`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{t(plan.name)}</h3>
                      <p className="text-white/80 text-sm md:text-base">{t(plan.description)}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-end space-x-2">
                      <span className="text-4xl md:text-5xl font-bold">
                        {formatCurrency(billingPeriod === 'monthly' ? plan.price.monthly : Math.round(plan.price.yearly / 12))}
                      </span>
                      <span className="text-white/80 text-base md:text-lg mb-1 md:mb-2">/{t('pricing.month')}</span>
                    </div>
                    {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                      <div className="text-white/80 text-sm">
                        {t('pricing.billedYearly', { amount: formatCurrency(plan.price.yearly) })}
                        {savings > 0 && (
                          <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
                            {t('pricing.save', { amount: formatCurrency(savings) })}
                          </span>
                        )}
                      </div>
                    )}
                    {plan.price.monthly === 0 && (
                      <div className="text-white/80 text-sm">{t('pricing.alwaysFree')}</div>
                    )}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href="#early-access"
                    className={`w-full block text-center py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t(plan.price.monthly === 0 ? 'pricing.cta.getStarted' : 'pricing.cta.startTrial')}
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </div>
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {t('pricing.allPlans.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.allPlans.trial.title')}</h4>
                <p className="text-gray-600 text-sm">{t('pricing.allPlans.trial.description')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.allPlans.cancel.title')}</h4>
                <p className="text-gray-600 text-sm">{t('pricing.allPlans.cancel.description')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.allPlans.upgrades.title')}</h4>
                <p className="text-gray-600 text-sm">{t('pricing.allPlans.upgrades.description')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
