import { useState, useEffect } from 'react'
import { getConceptArt } from '@/lib/getConceptArt'

export function useConceptArt() {
  const [conceptArt, setConceptArt] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const data = await getConceptArt()
        setConceptArt(data)
      } catch (error) {
        console.error('Error fetching concept art:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArt()
  }, [])

  return { conceptArt, loading }
}
