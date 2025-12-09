'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/nav-components/Navbar'

export default function PrivacyPolicy() {
  return (
    <>
      <div className="flex max-lg:flex-col justify-between max-lg:overflow-hidden">
        <div className="sticky max-lg:fixed top-0 left-0 lg:h-screen max-lg:w-screen max-lg:z-999 z-10">
          <Navbar />
        </div>

        <div className="relative w-full h-full min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-12"
            >
              Privacy Policy
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-lg leading-relaxed"
            >
              <section>
                <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
                <p className="opacity-80">
                  We collect information you provide directly to us, such as when you contact us through our website, subscribe to our
                  newsletter, or use our services. This may include your name, email address, phone number, and any other information you
                  choose to provide.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
                <p className="opacity-80">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical
                  notices and support messages, and communicate with you about products, services, and promotional offers.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Information Sharing</h2>
                <p className="opacity-80">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as
                  described in this privacy policy. We may share your information with trusted service providers who assist us in operating
                  our website.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Data Security</h2>
                <p className="opacity-80">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Cookies</h2>
                <p className="opacity-80">
                  Our website may use cookies to enhance your experience. Cookies are small files stored on your device that help us analyze
                  website traffic and improve our services. You can choose to disable cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Your Rights</h2>
                <p className="opacity-80">
                  You have the right to access, update, or delete your personal information. You may also opt out of receiving
                  communications from us at any time by contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Changes to This Policy</h2>
                <p className="opacity-80">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this
                  page and updating the &quot;Last Updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="opacity-80">
                  If you have any questions about this Privacy Policy, please contact us through our website or via the information provided
                  in the footer.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-current/20">
                <p className="text-sm opacity-60">Last Updated: {new Date().toLocaleDateString()}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-12">
              <Link href="/" className="inline-flex items-center text-lg opacity-80 hover:opacity-100 transition-opacity">
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
