import { useState, useEffect } from 'react'
import { getProjects } from '@/lib/getProjects'
import type { Project } from '@/types/project.types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true

    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        if (mounted) setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProjects()

    return () => {
      mounted = false
    }
  }, [])

  return { projects, loading }
}
