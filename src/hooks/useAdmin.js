'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { auth, db, storage } from '@/lib/firebase'
import { getAboutContent, updateAboutContent, getContactContent, updateContactContent } from '@/lib/getAbout'
import { initialProjectForm } from '@/components/admin-components/ProjectFormConstants'

export function useAdmin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState([])
  const [projectImageFile, setProjectImageFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [currentImages, setCurrentImages] = useState({ primary: '', gallery: [] })
  const [projectSubmitting, setProjectSubmitting] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [projectForm, setProjectForm] = useState(initialProjectForm)

  // Content management state
  const [aboutContent, setAboutContent] = useState(null)
  const [contactContent, setContactContent] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      } else {
        fetchProjects()
        loadContent()
      }
    })
    return () => unsubscribe()
  }, [router])

  const fetchProjects = async () => {
    try {
      const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(projectsQuery)

      const projects = querySnapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }))

      const sortedProjects = projects.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order
        }
        const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0
        const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0
        return bTime - aTime
      })

      setProjects(sortedProjects)
    } catch (error) {
      setError(error.message)
    }
  }

  const formatDate = (value) => {
    if (!value) return ''
    try {
      if (typeof value.toDate === 'function') {
        const d = value.toDate()
        return d instanceof Date && !isNaN(d.getTime()) ? d.toLocaleDateString() : ''
      }
      const d = value instanceof Date ? value : new Date(value)
      return !isNaN(d.getTime()) ? d.toLocaleDateString() : ''
    } catch (e) {
      return ''
    }
  }

  const addProject = async (e) => {
    e.preventDefault()
    if (!projectForm.title || !projectForm.slug) return
    setProjectSubmitting(true)
    try {
      if (editingProjectId) {
        const projectRef = doc(db, 'projects', editingProjectId)
        const existing = projects.find((p) => p.firestoreId === editingProjectId) || {}

        let primaryUrl = existing.media?.primary || ''
        const currentGallery = Array.isArray(currentImages.gallery) ? [...currentImages.gallery] : []
        let gallery = currentGallery.length ? currentGallery : existing.media?.gallery ? [...existing.media.gallery] : []

        if (projectImageFile) {
          const imgRef = ref(storage, `projects/${projectImageFile.name}`)
          await uploadBytes(imgRef, projectImageFile)
          primaryUrl = await getDownloadURL(imgRef)
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
          scope: projectForm.scope,
          process: projectForm.process,
          impact: projectForm.impact,
          description: projectForm.description,
          services: projectForm.services,
          technologies: projectForm.technologies,
          seo: projectForm.seo,
          metadata: projectForm.metadata,
          media: {
            primary: primaryUrl,
            gallery,
            video: projectForm.video.url ? projectForm.video : null,
          },
          updatedAt: serverTimestamp(),
        }

        await updateDoc(projectRef, updateData)
        setCurrentImages({ primary: updateData.media.primary, gallery: updateData.media.gallery || [] })
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

        await addDoc(collection(db, 'projects'), {
          id: projectForm.id || projectForm.slug,
          slug: projectForm.slug,
          client: projectForm.client,
          title: projectForm.title,
          category: projectForm.category,
          year: projectForm.year,
          status: projectForm.status,
          featured: projectForm.featured,
          scope: projectForm.scope,
          process: projectForm.process,
          impact: projectForm.impact,
          description: projectForm.description,
          services: projectForm.services,
          technologies: projectForm.technologies,
          seo: projectForm.seo,
          metadata: projectForm.metadata,
          media: {
            primary: primaryUrl,
            gallery: [primaryUrl, ...galleryUrls],
            video: projectForm.video.url ? projectForm.video : null,
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

  const deleteProject = async (projectId) => {
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

          await Promise.allSettled(deletePromises)
        }

        await deleteDoc(doc(db, 'projects', projectId))
        fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project. Please try again.')
      }
    }
  }

  const editProject = (project) => {
    setEditingProjectId(project.firestoreId || project.id)
    setCurrentImages({
      primary: project.media?.primary || '',
      gallery: project.media?.gallery || [],
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
      scope: project.scope || '',
      process: project.process || '',
      impact: project.impact || '',
      description: project.description || { short: '', detailed: '' },
      services: project.services || [],
      technologies: project.technologies || [],
      seo: project.seo || { keywords: [], description: '' },
      metadata: project.metadata || { duration: '', team_size: 1, client_location: '', project_type: 'freelance' },
      video: project.media?.video || { url: '', type: 'vimeo', title: '' },
    })
    setProjectImageFile(null)
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
    setGalleryFiles([])
    setCurrentImages({ primary: '', gallery: [] })
    const fileInput = document.querySelector('#project-file-input')
    const galleryInput = document.querySelector('#gallery-file-input')
    if (fileInput) fileInput.value = ''
    if (galleryInput) galleryInput.value = ''
  }

  const projectReorder = async (oldIndex, newIndex) => {
    const reorderedProjects = [...projects]
    const [movedProject] = reorderedProjects.splice(oldIndex, 1)
    reorderedProjects.splice(newIndex, 0, movedProject)

    setProjects(reorderedProjects)

    try {
      const batch = writeBatch(db)
      reorderedProjects.forEach((project, index) => {
        const projectRef = doc(db, 'projects', project.firestoreId)
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
      setMessage('Error loading content: ' + error.message)
    } finally {
      setContentLoading(false)
    }
  }

  const updateAbout = async () => {
    setSaving(true)
    try {
      const success = await updateAboutContent(aboutContent)
      if (success) {
        setMessage('✅ About content updated successfully!')
      } else {
        setMessage('❌ Failed to update about content')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateContact = async () => {
    setSaving(true)
    try {
      const success = await updateContactContent(contactContent)
      if (success) {
        setMessage('✅ Contact content updated successfully!')
      } else {
        setMessage('❌ Failed to update contact content')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return {
    loading,
    error,
    projects,
    projectImageFile,
    setProjectImageFile,
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
  }
}
