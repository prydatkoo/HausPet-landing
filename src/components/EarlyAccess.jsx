import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Gift, Users, Zap } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const EarlyAccess = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petType: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          petType: '',
          message: ''
        })
        
        // Track conversion with Meta Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Early Access Form',
            content_category: 'Lead Generation'
          })
        }
        
        // Show success message
        alert(t('language') === 'DE' ? 'Vielen Dank für Ihre Bewerbung! Überprüfen Sie Ihre E-Mails für die Bestätigung.' : 'Thank you for your application! Check your email for confirmation.')
      } else {
        // Handle specific validation errors
        let errorMessage = result.message || (t('language') === 'DE' ? 'Etwas ist schiefgelaufen' : 'Something went wrong')
        
        if (result.error === 'email_send_failed') {
          errorMessage = t('language') === 'DE' 
            ? 'Formular übermittelt, aber E-Mail konnte nicht gesendet werden. Bitte überprüfen Sie Ihre E-Mail-Adresse und versuchen Sie es erneut.'
            : 'Form submitted but email could not be sent. Please check your email address and try again.'
        } else if (result.error === 'missing_phone') {
          errorMessage = t('language') === 'DE' 
            ? 'Telefonnummer ist für Early Access Bewerbungen erforderlich.'
            : 'Phone number is required for early access applications.'
        }
        
        throw new Error(errorMessage)
      }
    } catch (error) {
      alert(error.message || (t('language') === 'DE' ? 'Entschuldigung, bei der Übermittlung Ihrer Bewerbung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.' : 'Sorry, there was an error submitting your application. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: Gift,
      title: "€45 Early Access Discount",
      description: "Get HausPet for just €135 instead of €180 - Exclusive early supporter price"
    },
    {
      icon: Zap,
      title: "3 Months Free AI Pro Subscription",
      description: "Worth €30 value! Free AI health insights & vet notifications (normally €10/month or €96/year)"
    },
    {
      icon: Users,
      title: "Priority Access",
      description: "Be among the first to receive your HausPet device when we launch"
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: t('language') === 'DE' ? 'E-Mail' : 'Email',
      value: t('emailContact'),
      href: `mailto:${t('emailContact')}`
    },
    {
      icon: Phone,
      label: t('language') === 'DE' ? 'Telefon' : 'Phone',
      value: t('phoneContact'),
      href: `tel:${t('phoneContact').replace(/\s/g, '')}`
    }
  ]

  return (
    <section id="early-access" className="section-padding bg-gradient-to-br from-light-gray to-light-blue">
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
                {t('language') === 'DE' ? 'Erhalten Sie' : 'Get'}{' '}
                <span className="gradient-text">{t('earlyAccess')}</span>
              </motion.h2>
              <motion.p
                className="text-lg text-dark/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {t('earlyAccessSubtitle')}
              </motion.p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-from to-primary-to rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark mb-2">{benefit.title}</h3>
                    <p className="text-dark/70">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-dark">{t('language') === 'DE' ? 'Kontakt aufnehmen' : 'Get in Touch'}</h3>
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center space-x-3 text-dark/70 hover:text-primary-from transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <info.icon className="w-5 h-5" />
                  <span>{info.label}: {info.value}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-card p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-dark mb-6">{t('language') === 'DE' ? 'Early Access anfordern' : 'Request Early Access'}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                      {t('name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary-from focus:border-transparent transition-all duration-300"
                      placeholder={t('language') === 'DE' ? 'Max Mustermann' : 'John Doe'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary-from focus:border-transparent transition-all duration-300"
                      placeholder={t('language') === 'DE' ? 'max@beispiel.de' : 'john@example.com'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                      {t('phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary-from focus:border-transparent transition-all duration-300"
                      placeholder={t('language') === 'DE' ? '+49 (0) 160 121 8642' : '+49 (0) 160 121 8642'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="petType" className="block text-sm font-medium text-dark mb-2">
                      {t('petType')}
                    </label>
                    <select
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary-from focus:border-transparent transition-all duration-300"
                    >
                      <option value="">{t('language') === 'DE' ? 'Haustierart wählen' : 'Select pet type'}</option>
                      <option value={t('language') === 'DE' ? 'Hund' : 'Dog'}>{t('language') === 'DE' ? 'Hund' : 'Dog'}</option>
                      <option value={t('language') === 'DE' ? 'Katze' : 'Cat'}>{t('language') === 'DE' ? 'Katze' : 'Cat'}</option>
                      <option value={t('language') === 'DE' ? 'Andere' : 'Other'}>{t('language') === 'DE' ? 'Andere' : 'Other'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary-from focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={t('language') === 'DE' ? 'Erzählen Sie uns von Ihrem Haustier und besonderen Anforderungen...' : 'Tell us about your pet and any specific requirements...'}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('language') === 'DE' ? 'Wird übermittelt...' : 'Submitting...'}</span>
                    </div>
                  ) : (
                    <span>{t('language') === 'DE' ? 'Early Access anfordern' : 'Request Early Access'}</span>
                  )}
                </motion.button>
              </form>

              <p className="text-sm text-dark/60 mt-4 text-center">
                {t('language') === 'DE' ? 'Wir kontaktieren Sie innerhalb von 24 Stunden, um Ihre Early Access Anfrage zu besprechen.' : 'We\'ll contact you within 24 hours to discuss your early access request.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EarlyAccess 