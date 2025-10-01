import React from 'react'
import Hero from '../components/Hero'
import TrustedPartners from '../components/TrustedPartners'
import Features from '../components/Features'
import EmotionalQuote from '../components/EmotionalQuote'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import EarlyAccess from '../components/EarlyAccess'
import StickyButton from '../components/StickyButton'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Hero />
      <TrustedPartners />
      <Features />
      <EmotionalQuote />
      <Testimonials />
      <Pricing />
      <EarlyAccess />
      <StickyButton />
    </div>
  )
}

export default HomePage