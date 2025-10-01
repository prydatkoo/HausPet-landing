import React from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Quote, User } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const Testimonials = () => {
  const { t } = useLanguage()

  const petOwnerTestimonials = [
    {
      name: "Talia",
      location: "testimonials.petOwner.location",
      petName: "Poppy",
      petType: "Maltese",
      image: "/assets/poppy.jpeg",
      quote: "testimonials.petOwner.quote",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-sky-50">
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
            <Heart className="w-4 h-4" />
            <span>{t('testimonials.tag')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            {t('testimonials.title.storiesOf')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              {t('testimonials.title.trustAndCare')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.description')}
          </p>
        </motion.div>

        {/* Pet Owner Testimonials */}
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-8 md:mb-12">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-sky-600" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{t('testimonials.petParentStories')}</h3>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md w-full">
              {petOwnerTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    &ldquo;{t(testimonial.quote)}&rdquo;
                  </p>
                  <div className="mb-6 p-4 bg-sky-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-sky-700">
                      <Heart className="w-4 h-4" />
                      <span className="font-semibold">{testimonial.petName}</span>
                      <span className="text-gray-500">•</span>
                      <span>{testimonial.petType}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{t(testimonial.location)}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {t('testimonials.cta.title')}
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {t('testimonials.cta.description')}
            </p>
            <motion.a
              href="#early-access"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-sky-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              <span>{t('testimonials.cta.button')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

