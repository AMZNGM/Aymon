'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/nav-components/Navbar'

export default function TermsOfService() {
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
              Terms of Service
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 text-lg leading-relaxed"
            >
              <section>
                <h2 className="text-3xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="opacity-80">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you
                  do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Description of Service</h2>
                <p className="opacity-80">
                  This website showcases our portfolio, services, and creative work. We provide information about our projects, contact
                  details, and related content. The service is provided on an &quot;as is&quot; basis.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">User Conduct</h2>
                <p className="opacity-80">
                  You agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the
                  service. You agree not to attempt to gain unauthorized access to any portion of the website, other accounts, computer
                  systems, or networks connected to the service.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Intellectual Property</h2>
                <p className="opacity-80">
                  All content, including but not limited to text, graphics, images, logos, and software, is the property of the website
                  owner and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or
                  distribute any content without express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Privacy</h2>
                <p className="opacity-80">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to
                  understand our practices. By using this website, you agree to the collection and use of information as outlined in our
                  Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
                <p className="opacity-80">
                  In no event shall the website owner be liable for any direct, indirect, incidental, special, or consequential damages
                  resulting from your use of the website or inability to use the website.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Termination</h2>
                <p className="opacity-80">
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the terms.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Changes to Terms</h2>
                <p className="opacity-80">
                  We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide
                  at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Governing Law</h2>
                <p className="opacity-80">
                  These terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance
                  with the laws of our jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                <p className="opacity-80">
                  If you have any questions about these Terms of Service, please contact us through our website or via the information
                  provided in the footer.
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
