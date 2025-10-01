import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Heart, Thermometer, Activity, Brain, Bell, Volume2, Users, BarChart3, Shield, Zap, Signal } from 'lucide-react';


const Technology = () => {
  

  const features = {
    safety: [
      { 
        title: 'Safe Zone Alerts', 
        description: 'Receive notifications if your pet leaves your chosen area.',
        icon: MapPin,
        color: 'from-blue-500 to-blue-600',
        gradient: 'from-blue-50 to-blue-100'
      },
      { 
        title: 'Lost Pet Mode', 
        description: 'Collar switches to high-frequency GPS pings when pet goes missing.',
        icon: Signal,
        color: 'from-red-500 to-red-600',
        gradient: 'from-red-50 to-red-100'
      }
    ],
    health: [
      { 
        title: 'Heart Rate Monitoring', 
        description: 'Track resting & active heart rate with MAX30102 sensor.',
        icon: Heart,
        color: 'from-pink-500 to-pink-600',
        gradient: 'from-pink-50 to-pink-100'
      },
      { 
        title: 'Temperature Monitoring', 
        description: 'Detects fever, overheating, or hypothermia with MLX90614 sensor.',
        icon: Thermometer,
        color: 'from-orange-500 to-orange-600',
        gradient: 'from-orange-50 to-orange-100'
      },
      { 
        title: 'Activity Tracking', 
        description: 'Step counting, running, jumping detection with MPU6050 sensor.',
        icon: Activity,
        color: 'from-green-500 to-green-600',
        gradient: 'from-green-50 to-green-100'
      },
      { 
        title: 'Behavioral Insights', 
        description: 'Detects patterns like scratching or licking (early signs of discomfort).',
        icon: Brain,
        color: 'from-purple-500 to-purple-600',
        gradient: 'from-purple-50 to-purple-100'
      }
    ],
    alerts: [
      { 
        title: 'Vibration Motor', 
        description: 'Haptic alerts for training cues or warnings.',
        icon: Bell,
        color: 'from-yellow-500 to-yellow-600',
        gradient: 'from-yellow-50 to-yellow-100'
      },
      { 
        title: 'Piezo Speaker', 
        description: 'Sound cues for recall beep, low battery alert.',
        icon: Volume2,
        color: 'from-indigo-500 to-indigo-600',
        gradient: 'from-indigo-50 to-indigo-100'
      }
    ],
    app: [
      { 
        title: 'Real-time Dashboard', 
        description: 'Shows location, steps, health data in one place.',
        icon: BarChart3,
        color: 'from-teal-500 to-teal-600',
        gradient: 'from-teal-50 to-teal-100'
      },
      { 
        title: 'Pet Sitter Community', 
        description: 'Find trusted local pet sitters through the app.',
        icon: Users,
        color: 'from-emerald-500 to-emerald-600',
        gradient: 'from-emerald-50 to-emerald-100'
      },
      { 
        title: 'Activity History', 
        description: 'Daily, weekly, and monthly reports.',
        icon: BarChart3,
        color: 'from-cyan-500 to-cyan-600',
        gradient: 'from-cyan-50 to-cyan-100'
      },
      { 
        title: 'Owner Notifications', 
        description: 'Pet health alerts and reminders sent to your phone.',
        icon: Shield,
        color: 'from-violet-500 to-violet-600',
        gradient: 'from-violet-50 to-violet-100'
      }
    ]
  }

  const featureCategories = [
    { id: 'safety', label: 'Safety & Security', icon: Shield, description: 'Keep your pet safe and secure with advanced monitoring' },
    { id: 'health', label: 'Health Monitoring', icon: Heart, description: 'Comprehensive health tracking with medical-grade sensors' },
    { id: 'alerts', label: 'Smart Alerts', icon: Bell, description: 'Intelligent notifications and training assistance' },
    { id: 'app', label: 'App Features', icon: Users, description: 'Powerful mobile app with community features' }
  ]

  return (
    <section id="technology" className="section-padding bg-gradient-to-br from-light-blue via-white to-light-blue/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl lg:text-6xl font-bold text-dark mb-4 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Advanced Features
          </motion.h2>
          <motion.p
            className="hidden lg:block text-xl text-dark/70 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the future of pet care with cutting-edge technology designed to keep your furry friend safe, healthy, and connected.
          </motion.p>
        </motion.div>

        {/* Feature Categories */}
        {featureCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            className="mb-12 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Category Header */}
            <motion.div
              className="text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-primary-from to-primary-to rounded-2xl mb-4 lg:mb-6 shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <category.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl lg:text-4xl font-bold text-dark mb-2 lg:mb-4">{category.label}</h3>
              <p className="hidden lg:block text-lg text-dark/60 max-w-2xl mx-auto">{category.description}</p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
              {features[category.id].map((feature, featureIndex) => (
                <motion.div
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 + featureIndex * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 group-hover:scale-105`}>
                    <div className="flex items-start space-x-3 lg:space-x-6">
                      <div className={`w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-r ${feature.color} rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <feature.icon className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-dark text-base lg:text-xl mb-1 lg:mb-3 group-hover:text-primary-from transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="hidden lg:block text-dark/70 leading-relaxed text-lg">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Technology Highlights */}
        <motion.div
          className="mt-16 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl lg:text-4xl font-bold text-dark text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            Why Choose HausPet?
          </motion.h3>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              className="text-center p-6 lg:p-10 bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-primary-from to-primary-to rounded-2xl flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-lg">
                <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-dark mb-4 lg:mb-6">AI-Powered Intelligence</h4>
              <p className="text-dark/70 text-base lg:text-lg leading-relaxed">
                Advanced machine learning algorithms analyze behavior patterns and provide predictive health insights for proactive care.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 lg:p-10 bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-primary-from to-primary-to rounded-2xl flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-lg">
                <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-dark mb-4 lg:mb-6">Solar Powered</h4>
              <p className="text-dark/70 text-base lg:text-lg leading-relaxed">
                Hybrid solar charging system ensures extended battery life and eco-friendly operation for continuous monitoring.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 lg:p-10 bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-primary-from to-primary-to rounded-2xl flex items-center justify-center mx-auto mb-6 lg:mb-8 shadow-lg">
                <Signal className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-dark mb-4 lg:mb-6">Real-time Tracking</h4>
              <p className="text-dark/70 text-base lg:text-lg leading-relaxed">
                Instant GPS location updates and real-time health monitoring with cellular connectivity for peace of mind.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Technology 