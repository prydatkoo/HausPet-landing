import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, ShoppingCart, Eye } from 'lucide-react';

const Marketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState(0)

  const products = [
    {
      id: 1,
      name: 'HausPet Smart Collar',
      description: 'AI-powered pet health and location tracking collar',
      price: 299,
      originalPrice: 399,
      features: [
        'Real-time GPS tracking',
        'Health monitoring',
        'Solar charging',
        'Waterproof design',
        'AI behavior analysis',
        'Mobile app included'
      ],
      rating: 4.8,
      reviews: 1247,
      image: '/collar-main.jpg',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'HausPet Collar + Charging Dock',
      description: 'Complete package with wireless charging station',
      price: 349,
      originalPrice: 449,
      features: [
        'Everything in Smart Collar',
        'Wireless charging dock',
        'Extended warranty',
        'Premium support',
        'Custom collar sizes',
        'Free shipping'
      ],
      rating: 4.9,
      reviews: 892,
      image: '/collar-dock.jpg',
      badge: 'Most Popular'
    },
    {
      id: 3,
      name: 'HausPet Family Pack',
      description: 'Multi-pet solution for households with multiple pets',
      price: 799,
      originalPrice: 999,
      features: [
        '3 Smart Collars included',
        'Family dashboard',
        'Bulk discount',
        'Priority support',
        'Custom engraving',
        'Extended warranty'
      ],
      rating: 4.7,
      reviews: 456,
      image: '/family-pack.jpg',
      badge: 'Best Value'
    }
  ]

  const benefits = [
    'Free 30-day trial',
    '30-day money-back guarantee',
    'Free shipping worldwide',
    '24/7 customer support',
    '2-year warranty',
    'Lifetime software updates'
  ]

  return (
    <section id="marketplace" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl lg:text-5xl font-bold text-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose Your{' '}
            <span className="gradient-text">Perfect Package</span>
          </motion.h2>
          <motion.p
            className="text-lg text-dark/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Select the perfect HausPet solution for your furry friend with flexible pricing and comprehensive packages.
          </motion.p>
        </motion.div>

        {/* Product Showcase */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`relative bg-white rounded-card shadow-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedProduct === index
                  ? 'border-primary-from shadow-2xl scale-105'
                  : 'border-gray-100 hover:border-primary-from/30'
              }`}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProduct(index)}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-primary-from to-primary-to text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-light-blue to-light-gray flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-from to-primary-to rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-dark/60 font-medium">{product.name}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">{product.name}</h3>
                <p className="text-dark/70 mb-4">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-dark/60">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-dark">${product.price}</span>
                    <span className="text-lg text-dark/50 line-through">${product.originalPrice}</span>
                    <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-dark/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <motion.button
                    className="w-full btn-gradient"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    className="w-full btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="bg-light-blue rounded-card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-dark mb-6 text-center">
            Why Choose HausPet?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-from to-primary-to rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-dark font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#early-access"
            className="btn-gradient inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Early Access</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Marketplace 