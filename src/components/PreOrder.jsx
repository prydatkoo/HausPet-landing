import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Shield, Truck, Gift, Zap } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage';

const PreOrder = () => {
  const { t } = useLanguage()

  const benefits = [
    {
      icon: Gift,
      title: '€45 Early Bird Discount',
      description: 'Save €45 off the regular price of €180 - Limited time offer for early supporters'
    },
    {
      icon: Zap,
      title: '3 Months Free AI Subscription',
      description: 'Get 3 months of AI Pro subscription free (worth €30) - includes advanced health insights & vet notifications'
    },
    {
      icon: Truck,
      title: t('priorityShipping'),
      description: t('priorityShippingDesc')
    },
    {
      icon: Shield,
      title: t('extendedWarranty'),
      description: t('extendedWarrantyDesc')
    },
    {
      icon: CreditCard,
      title: t('securePreOrder'),
      description: t('securePreOrderDesc')
    }
  ]

  return (
    <section id="pre-order" className="section-padding bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                className="text-3xl lg:text-5xl font-bold text-dark mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('preOrderTitle')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-from to-primary-to">
                  {' '}HausPet Smart Collar
                </span>
              </motion.h2>
              
              <motion.p
                className="text-xl text-dark/70 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {t('preOrderSubtitle')}
              </motion.p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <motion.h3
                className="text-2xl font-bold text-dark"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {t('preOrderBenefits')}
              </motion.h3>
              
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">{benefit.title}</h4>
                      <p className="text-dark/70">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Price Info */}
            <motion.div
              className="bg-white rounded-card p-6 shadow-lg border-2 border-green-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{t('price179')}</div>
                <div className="text-lg text-dark/60 line-through mb-2">{t('price259')}</div>
                <div className="text-sm text-green-600 font-semibold">{t('save80')}</div>
                <div className="text-xs text-dark/50 mt-2">{t('noPayment')}</div>
                <div className="text-xs text-blue-600 mt-2 font-medium">
                  {t('language') === 'DE' ? 'Nur für die ersten 100 Kunden!' : 'Only for the first 100 customers!'}
                </div>
              </div>
            </motion.div>

            {/* Customer Counter */}
            
          </motion.div>

          {/* Right Content - Pre-Order CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-card p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">{t('preOrderNow')}</h3>
                <p className="text-dark/60">{t('preOrderSecure')}</p>
              </div>

              <div className="space-y-6">
                <Link to="/pre-order">
                  <motion.button
                    type="button"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-button font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{t('preOrderButton')}</span>
                  </motion.button>
                </Link>

                <p className="text-xs text-dark/50 text-center">
                  {t('preOrderTerms')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PreOrder 