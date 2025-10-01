import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Shield, Truck, Gift, ArrowLeft, Star, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage';

const PreOrderPage = () => {
  const { t } = useLanguage()
  
  // Scroll to top when component mounts - smoother scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petType: '',
    petName: '',
    collarSize: '',
    address: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `HP-${timestamp}-${random}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newOrderNumber = generateOrderNumber()
    setOrderNumber(newOrderNumber)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'pre-order',
          orderNumber: newOrderNumber
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          petType: '',
          petName: '',
          collarSize: '',
          address: '',
          message: ''
        })

        // Track conversion with Meta Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            value: 134.99,
            currency: 'EUR',
            content_name: 'HausPet Smart Collar Pre-Order',
            content_category: 'Smart Collar',
            content_ids: ['hauspet-collar'],
            content_type: 'product'
          })
        }
        
        // Show success message
        alert(`🎉 ${t('preOrderSuccess')} ${t('orderNumber')} ${newOrderNumber}\n${t('checkEmails')}`)
      } else {
        // Handle specific validation errors
        let errorMessage = result.message || t('somethingWentWrong')
        
        if (result.error === 'email_send_failed') {
          errorMessage = t('emailSendFailed')
        }
        
        throw new Error(errorMessage)
      }
    } catch (error) {
      alert(error.message || t('preOrderError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: CreditCard,
      title: t('securePreOrderDesc'),
      description: t('preOrderNow'),
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Gift,
      title: t('discount30'),
      description: t('discountDesc'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: t('freeSubscription'),
      description: t('freeSubscriptionDesc'),
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Truck,
      title: t('priorityShipping'),
      description: t('priorityShippingDesc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: t('extendedWarranty'),
      description: t('extendedWarrantyDesc'),
      color: 'from-purple-500 to-indigo-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Back to Homepage Link */}
      <div className="pt-24 pb-4">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('language') === 'DE' ? 'Zurück zur Startseite' : 'Back to Homepage'}
          </Link>
        </div>
      </div>

      <div className="container-custom py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="text-center lg:text-left">
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Star className="w-4 h-4" />
                <span>{t('language') === 'DE' ? 'ZEITLICH BEGRENZTES ANGEBOT' : 'LIMITED TIME OFFER'}</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-dark mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('preOrderTitle')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  {' '}HausPet Smart Collar
                </span>
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl text-dark/70 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('preOrderSubtitle')}
              </motion.p>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <motion.h3
                className="text-3xl font-bold text-dark text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('preOrderBenefits')}
              </motion.h3>

              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-white/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl`}>
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-dark mb-3">{benefit.title}</h4>
                        <p className="text-dark/70 text-lg leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Price Info */}
            <motion.div
              className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="mb-4">
                <div className="text-5xl font-bold mb-2">{t('price179')}</div>
                <div className="text-xl text-white/80 line-through mb-2">{t('price259')}</div>
                <div className="text-lg font-semibold bg-white/20 px-4 py-2 rounded-full inline-block">
                  {t('save80')}
                </div>
                <div className="text-2xl font-bold text-white mt-4">
                  {t('noPayment')}
                </div>
                <div className="text-sm text-yellow-200 mt-2 font-medium">
                  {t('limitedTimeOffer')}
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{t('secureOrder')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{t('noHiddenFees')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{t('thirtyDayReturns')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Pre-Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 max-w-2xl w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-dark mb-4">{t('preOrderNow')}</h3>
                <p className="text-dark/60 text-xl">{t('preOrderSecure')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
                      {t('name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                      placeholder={t('namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                      placeholder={t('emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                      placeholder={t('phonePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="petType" className="block text-sm font-semibold text-dark mb-2">
                      {t('petType')} *
                    </label>
                    <select
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                    >
                      <option value="">{t('selectPetType')}</option>
                      <option value={t('language') === 'DE' ? 'Hund' : 'Dog'}>{t('language') === 'DE' ? 'Hund' : 'Dog'}</option>
                      <option value={t('language') === 'DE' ? 'Katze' : 'Cat'}>{t('language') === 'DE' ? 'Katze' : 'Cat'}</option>
                      <option value={t('language') === 'DE' ? 'Andere' : 'Other'}>{t('language') === 'DE' ? 'Andere' : 'Other'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="petName" className="block text-sm font-semibold text-dark mb-2">
                      {t('petName')}
                    </label>
                    <input
                      type="text"
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                      placeholder={t('language') === 'DE' ? 'Luna' : 'Luna'}
                    />
                  </div>

                  <div>
                    <label htmlFor="collarSize" className="block text-sm font-semibold text-dark mb-2">
                      {t('collarSize')}
                    </label>
                    <select
                      id="collarSize"
                      name="collarSize"
                      value={formData.collarSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                    >
                      <option value="">{t('selectSize')}</option>
                      <option value="XS">XS (20-30cm)</option>
                      <option value="S">S (25-35cm)</option>
                      <option value="M">M (30-45cm)</option>
                      <option value="L">L (40-55cm)</option>
                      <option value="XL">XL (50-70cm)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-dark mb-2">
                    {t('language') === 'DE' ? 'Adresse *' : 'Address *'}
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 resize-none"
                    placeholder={t('addressPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-dark mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                </div>

                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-5 px-12 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl min-w-[280px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('processing')}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-7 h-7" />
                        <span>{t('preOrderSubmit')}</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="text-sm text-dark/50 text-center leading-relaxed mt-6">
                  {t('preOrderTerms')}
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PreOrderPage 