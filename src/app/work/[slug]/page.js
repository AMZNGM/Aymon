'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { use } from 'react'
import marwanPablo from '../../../../public/images/selectedImgs/marwanPablo/halal.webp'
import geo from '../../../../public/images/selectedImgs/geo/geo1.webp'
import menage from '../../../../public/images/selectedImgs/ghadaAbdelrazikXMenage07/menage.webp'
import blitz from '../../../../public/images/selectedImgs/blitz/blitz1.webp'

const workData = {
  'marwan-pablo': {
    title: 'Marwan Pablo',
    image: marwanPablo,
    description:
      'A dynamic visual identity project for Egyptian rapper Marwan Pablo, featuring bold typography and urban aesthetics that capture his unique musical style and cultural impact.',
    details: ['Brand Identity Design', 'Visual Direction', 'Digital Assets', 'Social Media Templates'],
    year: '2024',
    category: 'Music & Entertainment',
  },
  'geo-project': {
    title: 'Geo Project',
    image: geo,
    description:
      'An innovative architectural visualization project that combines geometric precision with organic forms, creating a unique visual language for modern spatial design.',
    details: ['3D Visualization', 'Concept Development', 'Architectural Rendering', 'Interactive Presentations'],
    year: '2024',
    category: 'Architecture & Design',
  },
  'menage-ghada': {
    title: 'Menage x Ghada',
    image: menage,
    description:
      'A collaborative fashion campaign between Menage and designer Ghada Abdelrazik, exploring the intersection of contemporary fashion and cultural heritage.',
    details: ['Campaign Photography', 'Art Direction', 'Fashion Styling', 'Brand Collaboration'],
    year: '2024',
    category: 'Fashion & Lifestyle',
  },
  blitz: {
    title: 'Blitz',
    image: blitz,
    description:
      'A high-energy sports branding project that captures the speed and intensity of competitive athletics through dynamic visual elements and bold color schemes.',
    details: ['Brand Strategy', 'Logo Design', 'Marketing Materials', 'Digital Campaign'],
    year: '2024',
    category: 'Sports & Athletics',
  },
}

export default function WorkPage({ params }) {
  const { slug } = use(params)
  const work = workData[slug]

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Work not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="container mx-auto px-6 py-12">
        {/* Back Navigation */}

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h1 className="text-6xl font-bold mb-4">{work.title}</h1>
            <div className="flex gap-4 mb-6">
              <span className="text-gray-500">{work.year}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{work.category}</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{work.description}</p>

            {/* Project Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Services</h3>
              {work.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="sticky top-12">
              <Image src={work.image} alt={work.title} className="w-full rounded-3xl shadow-2xl" priority />
            </div>
          </motion.div>
        </div>

        {/* Additional Content Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t pt-16"
        >
          <h2 className="text-3xl font-bold mb-8">Project Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
              <p className="text-gray-700 leading-relaxed">
                This project required a unique approach to visual storytelling, balancing aesthetic appeal with functional requirements
                while maintaining brand consistency across all touchpoints.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">The Solution</h3>
              <p className="text-gray-700 leading-relaxed">
                Through careful research and iterative design processes, we developed a comprehensive visual system that effectively
                communicates the brand&apos;s values and resonates with the target audience.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
