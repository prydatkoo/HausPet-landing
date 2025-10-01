import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage()
  
  const footerLinks = {
    product: [
      { label: t('header.features'), href: '#features' },
      { label: t('language') === 'DE' ? 'Technologie' : 'Technology', href: '#technology' },
      { label: t('header.earlyAccess'), href: '#early-access' }
    ],
    support: [
      { label: t('language') === 'DE' ? 'Hilfecenter' : 'Help Center', href: '/under-development' },
      { label: t('header.contactUs'), href: '#early-access' },
      { label: t('language') === 'DE' ? 'Garantie' : 'Warranty', href: '/under-development' },
      { label: t('language') === 'DE' ? 'Rückgabe' : 'Returns', href: '/under-development' }
    ],
    company: [
      { label: t('language') === 'DE' ? 'Über uns' : 'About Us', href: '/under-development' },
      { label: t('language') === 'DE' ? 'Karriere' : 'Careers', href: '/under-development' },
      { label: t('language') === 'DE' ? 'Presse' : 'Press', href: '/under-development' },
      { label: t('language') === 'DE' ? 'Blog' : 'Blog', href: '/under-development' }
    ],
    legal: [
      { label: t('language') === 'DE' ? 'Datenschutz' : 'Privacy Policy', href: '/under-development' },
      { label: t('language') === 'DE' ? 'Nutzungsbedingungen' : 'Terms of Service', href: '/under-development' },
      { label: t('language') === 'DE' ? 'Cookie-Richtlinie' : 'Cookie Policy', href: '/under-development' },
      { label: 'GDPR', href: '/under-development' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '/under-development', label: 'Facebook' },
    { icon: Twitter, href: '/under-development', label: 'Twitter' },
    { icon: Instagram, href: '/under-development', label: 'Instagram' },
    { icon: Linkedin, href: '/under-development', label: 'LinkedIn' },
    { icon: Youtube, href: '/under-development', label: 'YouTube' }
  ]

  const contactInfo = [
    { icon: Mail, label: t('language') === 'DE' ? 'E-Mail' : 'Email', value: t('emailContact'), href: `mailto:${t('emailContact')}` },
    { icon: Phone, label: t('language') === 'DE' ? 'Telefon' : 'Phone', value: t('phoneContact'), href: `tel:${t('phoneContact').replace(/\s/g, '')}` }
  ]

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="/assets/logo.png" 
                alt="HausPet Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-white">HausPet</span>
            </motion.div>
            
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('language') === 'DE' 
                ? 'Revolutionierung der Haustierpflege mit KI-gesteuerten intelligenten Halsbändern, die die Gesundheit überwachen, den Standort verfolgen und Haustierbesitzern weltweit Sicherheit bieten.'
                : 'Revolutionizing pet care with AI-powered smart collars that monitor health, track location, and provide peace of mind for pet owners worldwide.'
              }
            </motion.p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-primary-from transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <info.icon className="w-4 h-4" />
                  <span className="text-sm">{info.label}: {info.value}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <motion.a
                        href={link.href}
                        className="text-gray-300 hover:text-primary-from transition-colors duration-300 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 + index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {link.label}
                      </motion.a>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 + index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-primary-from transition-colors duration-300 text-sm"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              © 2024 HausPet. {t('language') === 'DE' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-primary-from hover:bg-white/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 