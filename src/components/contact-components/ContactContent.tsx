'use client'

import { useState, useEffect } from 'react'
import { getContactContent, type ContactContent } from '@/lib/getAbout'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function ContactContent() {
  const [contactContent, setContactContent] = useState<ContactContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getContactContent()
        setContactContent(content)
      } catch (error) {
        console.error('Error fetching contact content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading || !contactContent) {
    return <LoadingOverlay />
  }

  const LINKS = [
    { href: `mailto:${contactContent.email}`, label: `Email: ${contactContent.email}`, display: contactContent.email },
    {
      href: `tel:${contactContent.mobile.replace(/\s/g, '')}`,
      label: `Phone: ${contactContent.mobile}`,
      display: contactContent.mobile,
    },
    { href: contactContent.socialLinks.linkedin.replace(/\s/g, ''), label: 'LinkedIn', display: 'LinkedIn' },
    { href: contactContent.socialLinks.instagram.replace(/\s/g, ''), label: 'Instagram', display: 'Instagram' },
    { href: contactContent.socialLinks.behance.replace(/\s/g, ''), label: 'Behance', display: 'Béhance' },
  ]

  return (
    <section className="relative w-full max-w-4xl">
      <AnimIn center blur delay={0.2} className="flex justify-between items-center w-full text-center">
        {LINKS.map((link, i) => (
          <a
            key={i}
            target="_blank"
            href={link.href}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="max-md:text-[10px] text-nowrap px-2 max-md:px-1 cursor-pointer"
          >
            <TextWghtGrow label={link.display} />
          </a>
        ))}
      </AnimIn>
    </section>
  )
}
