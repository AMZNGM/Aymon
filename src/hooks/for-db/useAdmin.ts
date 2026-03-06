'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { auth, db, storage } from '@/lib/firebase'
import { getAboutContent, updateAboutContent, getContactContent, updateContactContent } from '@/lib/getAbout'
import { getLogos } from '@/lib/getLogos'
import { initialProjectForm } from '@/components/admin-components/ProjectFormConstants'
import { Project, Logo, AboutContent, ContactContent } from '@/types/admin.types'

export function useAdmin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null)
  const [projectGifFile, setProjectGifFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [currentImages, setCurrentImages] = useState<{ primary: string; gallery: string[]; gif: string }>({
    primary: '',
    gallery: [],
    gif: '',
  })
  const [projectSubmitting, setProjectSubmitting] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [logos, setLogos] = useState<Logo[]>([])
  const [logosLoading, setLogosLoading] = useState(false)
  const [logoSubmitting, setLogoSubmitting] = useState(false)
  const [editingLogoId, setEditingLogoId] = useState<string | null>(null)

  // Content management state
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [contactContent, setContactContent] = useState<ContactContent | null>(null)
  const [contentLoading, setContentLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      } else {
        fetchProjects()
        fetchLogos()
        loadContent()
      }
    })
    return () => unsubscribe()
  }, [router])

  const fetchProjects = async () => {
    if (!db) return

    try {
      const projectsQuery = query(collection(db!, 'projects'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(projectsQuery)

      const projects = querySnapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      })) as Project[]

      const sortedProjects = projects.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order
        }
        const aTime = a.createdAt
          ? typeof a.createdAt === 'object' && 'toMillis' in a.createdAt
            ? a.createdAt.toMillis()
            : a.createdAt instanceof Date
              ? a.createdAt.getTime()
              : 0
          : 0
        const bTime = b.createdAt
          ? typeof b.createdAt === 'object' && 'toMillis' in b.createdAt
            ? b.createdAt.toMillis()
            : b.createdAt instanceof Date
              ? b.createdAt.getTime()
              : 0
          : 0
        return bTime - aTime
      })

      setProjects(sortedProjects)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const fetchLogos = async () => {
    setLogosLoading(true)
    try {
      const data = await getLogos()
      setLogos(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLogosLoading(false)
    }
  }

  const formatDate = (value: { toDate(): Date } | Date | string | number) => {
    if (!value) return ''
    try {
      if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
        const d = value.toDate()
        return d instanceof Date && !isNaN(d.getTime()) ? d.toLocaleDateString() : ''
      }
      const d = value instanceof Date ? value : new Date(value as string | number | Date)
      return !isNaN(d.getTime()) ? d.toLocaleDateString() : ''
    } catch (e) {
      return ''
    }
  }

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!projectForm.title || !projectForm.slug || !db || !storage) return
    setProjectSubmitting(true)
    try {
      if (editingProjectId) {
        const projectRef = doc(db!, 'projects', editingProjectId)
        const existing = projects.find((p) => p.firestoreId === editingProjectId) as Project | undefined

        let primaryUrl = existing?.media?.primary || ''
        let gifUrl = existing?.media?.gif || ''
        const currentGallery = Array.isArray(currentImages.gallery) ? [...currentImages.gallery] : []
        const gallery = currentGallery

        if (projectImageFile) {
          const imgRef = ref(storage, `projects/${projectImageFile.name}`)
          await uploadBytes(imgRef, projectImageFile)
          primaryUrl = await getDownloadURL(imgRef)
        }

        if (projectGifFile) {
          const gifRef = ref(storage, `projects/gifs/${projectGifFile.name}`)
          await uploadBytes(gifRef, projectGifFile)
          gifUrl = await getDownloadURL(gifRef)
        }

        for (const file of galleryFiles) {
          const galleryRef = ref(storage, `projects/gallery/${file.name}`)
          await uploadBytes(galleryRef, file)
          const url = await getDownloadURL(galleryRef)
          gallery.push(url)
        }

        const updateData = {
          id: projectForm.id || projectForm.slug,
          slug: projectForm.slug,
          client: projectForm.client,
          title: projectForm.title,
          category: projectForm.category,
          year: projectForm.year,
          status: projectForm.status,
          featured: projectForm.featured,
          showInSelectedWork: !!projectForm.showInSelectedWork,
          scope: projectForm.scope,
          process: projectForm.process,
          impact: projectForm.impact,
          description: projectForm.description,
          seo: projectForm.seo,
          metadata: projectForm.metadata,
          media: {
            primary: primaryUrl,
            gallery,
            gif: gifUrl,
            reels: projectForm.media?.reels || [],
            video: projectForm.video?.url
              ? { url: projectForm.video.url, type: projectForm.video.type || '', title: projectForm.video.title || '' }
              : null,
          },
          updatedAt: serverTimestamp(),
        }

        await updateDoc(projectRef, updateData)
        setCurrentImages({ primary: updateData.media.primary, gallery: updateData.media.gallery || [], gif: updateData.media.gif || '' })
        setEditingProjectId(null)
      } else {
        if (!projectImageFile) {
          throw new Error('Primary image is required for new projects')
        }
        const imgRef = ref(storage, `projects/${projectImageFile.name}`)
        await uploadBytes(imgRef, projectImageFile)
        const primaryUrl = await getDownloadURL(imgRef)

        const galleryUrls = []
        for (const file of galleryFiles) {
          const galleryRef = ref(storage, `projects/gallery/${file.name}`)
          await uploadBytes(galleryRef, file)
          const url = await getDownloadURL(galleryRef)
          galleryUrls.push(url)
        }

        let gifUrlUploaded = ''
        if (projectGifFile) {
          const gifRef = ref(storage, `projects/gifs/${projectGifFile.name}`)
          await uploadBytes(gifRef, projectGifFile)
          gifUrlUploaded = await getDownloadURL(gifRef)
        }

        await addDoc(collection(db!, 'projects'), {
          id: projectForm.id || projectForm.slug,
          slug: projectForm.slug,
          client: projectForm.client,
          title: projectForm.title,
          category: projectForm.category,
          year: projectForm.year,
          status: projectForm.status,
          featured: projectForm.featured,
          showInSelectedWork: !!projectForm.showInSelectedWork,
          scope: projectForm.scope,
          process: projectForm.process,
          impact: projectForm.impact,
          description: projectForm.description,
          seo: projectForm.seo,
          metadata: projectForm.metadata,
          media: {
            primary: primaryUrl,
            gallery: [primaryUrl, ...galleryUrls],
            gif: gifUrlUploaded,
            reels: projectForm.media?.reels || [],
            video: projectForm.video?.url
              ? { url: projectForm.video.url, type: projectForm.video.type || '', title: projectForm.video.title || '' }
              : null,
          },
          order: projects.length,
          createdAt: serverTimestamp(),
        })
      }

      resetForm()
      fetchProjects()
    } catch (err) {
      console.error('Error adding/updating project:', err)
    } finally {
      setProjectSubmitting(false)
    }
  }

  const deleteProject = async (projectId: string) => {
    if (!db || !storage) return
    if (confirm('Are you sure you want to delete this project and all its images?')) {
      try {
        const project = projects.find((p) => (p.firestoreId || p.id) === projectId)

        if (project?.media) {
          const deletePromises = []

          if (project.media.primary) {
            try {
              const primaryRef = ref(storage, project.media.primary)
              deletePromises.push(deleteObject(primaryRef))
            } catch (error) {
              console.warn('Failed to delete primary image:', error)
            }
          }

          if (project.media.gallery && Array.isArray(project.media.gallery)) {
            for (const imageUrl of project.media.gallery) {
              try {
                const imgRef = ref(storage, imageUrl)
                deletePromises.push(deleteObject(imgRef))
              } catch (error) {
                console.warn('Failed to delete gallery image:', error)
              }
            }
          }

          if (project.media.gif) {
            try {
              const gifRef = ref(storage, project.media.gif)
              deletePromises.push(deleteObject(gifRef))
            } catch (error) {
              console.warn('Failed to delete gif image:', error)
            }
          }

          await Promise.allSettled(deletePromises)
        }

        await deleteDoc(doc(db!, 'projects', projectId))
        fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project. Please try again.')
      }
    }
  }

  const editProject = (project: Project) => {
    setEditingProjectId(project.firestoreId || project.id || null)
    setCurrentImages({
      primary: project.media?.primary || '',
      gallery: project.media?.gallery || [],
      gif: project.media?.gif || '',
    })
    setProjectForm({
      id: project.id || project.slug || '',
      slug: project.slug || '',
      client: project.client || '',
      title: project.title || '',
      category: project.category || '',
      year: project.year || '',
      status: project.status || 'completed',
      featured: !!project.featured,
      showInSelectedWork: !!project.showInSelectedWork,
      scope: project.scope || '',
      process: project.process || '',
      impact: project.impact || '',
      description: project.description || { short: '', detailed: '' },
      seo: project.seo || { keywords: [] as string[], description: '' },
      metadata: project.metadata || { duration: '', team_size: 1, client_location: '', project_type: 'freelance' },
      video: project.media?.video || { url: '', type: '', title: '' },
      media: {
        gif: project.media?.gif || '',
        reels: project.media?.reels || [],
      },
    } as typeof initialProjectForm)
    setProjectImageFile(null)
    setProjectGifFile(null)
    setGalleryFiles([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingProjectId(null)
    resetForm()
  }

  const resetForm = () => {
    setProjectForm(initialProjectForm)
    setProjectImageFile(null)
    setProjectGifFile(null)
    setGalleryFiles([])
    setCurrentImages({ primary: '', gallery: [], gif: '' })
    const fileInput = document.querySelector('#project-file-input') as HTMLInputElement
    const fileGifInput = document.querySelector('#project-gif-input') as HTMLInputElement
    const galleryInput = document.querySelector('#gallery-file-input') as HTMLInputElement
    if (fileInput) fileInput.value = ''
    if (fileGifInput) fileGifInput.value = ''
    if (galleryInput) galleryInput.value = ''
  }

  const projectReorder = async (oldIndex: number, newIndex: number) => {
    if (!db) return
    const reorderedProjects = [...projects]
    const [movedProject] = reorderedProjects.splice(oldIndex, 1)
    reorderedProjects.splice(newIndex, 0, movedProject)

    setProjects(reorderedProjects)

    try {
      const batch = writeBatch(db!)
      reorderedProjects.forEach((project, index) => {
        const projectRef = doc(db!, 'projects', project.firestoreId!)
        batch.update(projectRef, { order: index })
      })
      await batch.commit()
    } catch (error) {
      console.error('Error updating project order:', error)
      setProjects(projects)
    }
  }

  const loadContent = async () => {
    try {
      const [about, contact] = await Promise.all([getAboutContent(), getContactContent()])
      setAboutContent(about)
      setContactContent(contact)
    } catch (error) {
      setMessage(error instanceof Error ? 'Error loading content: ' + error.message : 'Unknown error')
    } finally {
      setContentLoading(false)
    }
  }

  const updateAbout = async () => {
    setSaving(true)
    try {
      const success = await updateAboutContent(aboutContent || ({} as AboutContent))
      if (success) {
        setMessage('✅ About content updated successfully!')
      } else {
        setMessage('❌ Failed to update about content')
      }
    } catch (error) {
      setMessage(error instanceof Error ? 'Error: ' + error.message : 'Unknown error')
    } finally {
      setSaving(false)
    }
  }

  const updateContact = async () => {
    setSaving(true)
    try {
      const success = await updateContactContent(contactContent || ({} as ContactContent))
      if (success) {
        setMessage('✅ Contact content updated successfully!')
      } else {
        setMessage('❌ Failed to update contact content')
      }
    } catch (error) {
      setMessage(error instanceof Error ? 'Error: ' + error.message : 'Unknown error')
    } finally {
      setSaving(false)
    }
  }

  const addLogo = async (file: File | string | null, link: string = '') => {
    if (!db || !storage) return
    setLogoSubmitting(true)
    try {
      let imageUrl = ''
      if (file) {
        // If it's a new file (not just a string URL from an existing logo)
        if (typeof file !== 'string') {
          const imgRef = ref(storage, `projects/logos/${Date.now()}_${file.name}`)
          await uploadBytes(imgRef, file)
          imageUrl = await getDownloadURL(imgRef)
        } else {
          imageUrl = file
        }
      }

      const docData = {
        src: imageUrl,
        link: link,
        updatedAt: serverTimestamp(),
      }

      if (editingLogoId) {
        await updateDoc(doc(db!, 'logos', editingLogoId), docData)
        setEditingLogoId(null)
      } else {
        await addDoc(collection(db!, 'logos'), {
          ...docData,
          order: logos.length,
          createdAt: serverTimestamp(),
        })
      }
      fetchLogos()
    } catch (err) {
      console.error('Error adding/updating logo:', err)
      throw err
    } finally {
      setLogoSubmitting(false)
    }
  }

  const editLogo = (logo: Logo) => {
    setEditingLogoId(logo.firestoreId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelLogoEdit = () => {
    setEditingLogoId(null)
  }

  const deleteLogo = async (id: string) => {
    if (!db || !storage) return
    if (confirm('Are you sure you want to delete this logo?')) {
      try {
        const item = logos.find((l) => l.firestoreId === id)
        if (item?.src) {
          try {
            const imgRef = ref(storage, item.src)
            await deleteObject(imgRef)
          } catch (e) {
            console.warn('Failed to delete storage object:', e)
          }
        }
        await deleteDoc(doc(db!, 'logos', id))
        fetchLogos()
      } catch (err) {
        console.error('Error deleting logo:', err)
      }
    }
  }

  const reorderLogos = async (oldIndex: number, newIndex: number) => {
    if (!db) return
    const reordered = [...logos]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)

    setLogos(reordered)

    try {
      const batch = writeBatch(db!)
      reordered.forEach((item, index) => {
        const ref = doc(db!, 'logos', item.firestoreId!)
        batch.update(ref, { order: index })
      })
      await batch.commit()
    } catch (err) {
      console.error('Error reordering logos:', err)
      fetchLogos()
    }
  }

  return {
    loading,
    error,
    projects,
    projectImageFile,
    setProjectImageFile,
    projectGifFile,
    setProjectGifFile,
    galleryFiles,
    setGalleryFiles,
    currentImages,
    setCurrentImages,
    projectSubmitting,
    editingProjectId,
    projectForm,
    setProjectForm,
    formatDate,
    addProject,
    deleteProject,
    editProject,
    cancelEdit,
    projectReorder,
    // Content management
    aboutContent,
    setAboutContent,
    contactContent,
    setContactContent,
    contentLoading,
    saving,
    message,
    setMessage,
    loadContent,
    updateAbout,
    updateContact,
    // Logos
    logos,
    logosLoading,
    logoSubmitting,
    editingLogoId,
    addLogo,
    deleteLogo,
    reorderLogos,
    fetchLogos,
    editLogo,
    cancelLogoEdit,
  }
}
