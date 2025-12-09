'use client'

import personalInfo from '@/data/personal-info.json'
import VariableFontHoverByRandomLetter from '../ui/text/VariableFontHoverByRandomLetter'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FooterContent() {
  return (
    <div>
      <div className="flex justify-center items-center h-full w-full">
        <h4 className="text-[20rem] max-2xl:text-7xl max-xl:text-7xl font-extrabold tracking-[-2px] uppercase">
          <VariableFontHoverByRandomLetter
            label={personalInfo.nickname}
            fromFontVariationSettings="'wght' 900, 'slnt' 0"
            toFontVariationSettings="'wght' 400, 'slnt' -10"
            className="z-10"
          />
        </h4>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h5 className="text-2xl font-bold uppercase">Get in Touch</h5>
              <p className="text-lg opacity-80">{personalInfo.email}</p>
              <p className="text-lg opacity-80">{personalInfo.phone}</p>
              <p className="text-lg opacity-80">{personalInfo.location}</p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h5 className="text-2xl font-bold uppercase">Quick Links</h5>
              <nav className="space-y-2">
                <Link href="/" className="block text-lg opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
                <Link href="/work" className="block text-lg opacity-80 hover:opacity-100 transition-opacity">
                  Work
                </Link>
                <Link href="/about" className="block text-lg opacity-80 hover:opacity-100 transition-opacity">
                  About
                </Link>
                <Link href="/contact" className="block text-lg opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </nav>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h5 className="text-2xl font-bold uppercase">Follow</h5>
              <div className="flex space-x-4">
                {personalInfo.social?.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-current/20"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm opacity-60">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <p className="text-sm opacity-60 mt-2 md:mt-0">Built with passion and creativity</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
