'use client'

import { useState, useEffect } from 'react'
import { getAboutContent } from '@/lib/getAbout'

export function useAboutContent() {
  const [aboutContent, setAboutContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getAboutContent()
        setAboutContent(content)
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { aboutContent, loading }
}
