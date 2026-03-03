import { useState, useEffect } from 'react'
import { getAboutContent } from '@/lib/getAbout'
import type { AboutContent } from '@/types/about.types'

export function useAbout() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true

    const fetchContent = async () => {
      try {
        const content = await getAboutContent()
        if (mounted) setAboutContent(content)
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchContent()

    return () => {
      mounted = false
    }
  }, [])

  return { aboutContent, loading }
}
