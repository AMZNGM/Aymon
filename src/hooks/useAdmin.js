'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { auth, db, storage } from '@/lib/firebase'
import { getAboutContent, updateAboutContent, getContactContent, updateContactContent } from '@/lib/getAbout'
import { getConceptArt } from '@/lib/getConceptArt'
import { getLogos } from '@/lib/getLogos'
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
  const [conceptArts, setConceptArts] = useState([])
  const [conceptArtLoading, setConceptArtLoading] = useState(false)
  const [conceptArtSubmitting, setConceptArtSubmitting] = useState(false)
  const [editingConceptArtId, setEditingConceptArtId] = useState(null)
  const [logos, setLogos] = useState([])
  const [logosLoading, setLogosLoading] = useState(false)
  const [logoSubmitting, setLogoSubmitting] = useState(false)

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
        fetchConceptArt()
        fetchLogos()
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

  const fetchConceptArt = async () => {
    setConceptArtLoading(true)
    try {
      const data = await getConceptArt()
      setConceptArts(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setConceptArtLoading(false)
    }
  }

  const fetchLogos = async () => {
    setLogosLoading(true)
    try {
      const data = await getLogos()
      setLogos(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLogosLoading(false)
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
        let gallery = currentGallery

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
          showInSelectedWork: !!projectForm.showInSelectedWork,
          scope: projectForm.scope,
          process: projectForm.process,
          impact: projectForm.impact,
          description: projectForm.description,
          services: Array.isArray(projectForm.services) ? projectForm.services : [],
          technologies: Array.isArray(projectForm.technologies) ? projectForm.technologies : [],
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
          showInSelectedWork: !!projectForm.showInSelectedWork,
          scope: projectForm.scope,
          process: projectForm.process,
          impact: projectForm.impact,
          description: projectForm.description,
          services: Array.isArray(projectForm.services) ? projectForm.services : [],
          technologies: Array.isArray(projectForm.technologies) ? projectForm.technologies : [],
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
      showInSelectedWork: !!project.showInSelectedWork,
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

  const addConceptArt = async (data, file) => {
    setConceptArtSubmitting(true)
    try {
      let imageUrl = data.imageUrl || ''
      if (file) {
        const imgRef = ref(storage, `projects/concept-art/${Date.now()}_${file.name}`)
        await uploadBytes(imgRef, file)
        imageUrl = await getDownloadURL(imgRef)
      }

      const docData = {
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        imageUrl,
        videoUrl: data.videoUrl || '',
        updatedAt: serverTimestamp(),
      }

      if (editingConceptArtId) {
        await updateDoc(doc(db, 'conceptArt', editingConceptArtId), docData)
        setEditingConceptArtId(null)
      } else {
        await addDoc(collection(db, 'conceptArt'), {
          ...docData,
          order: conceptArts.length,
          createdAt: serverTimestamp(),
        })
      }
      fetchConceptArt()
    } catch (err) {
      console.error('Error adding/updating concept art:', err)
      throw err
    } finally {
      setConceptArtSubmitting(false)
    }
  }

  const editConceptArt = (item) => {
    setEditingConceptArtId(item.firestoreId)
    // We need to return the data to the form or have the form listen to editingConceptArtId
    // But since ConceptArtForm manages its own state, we'll pass the item to it via props in page.js
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelConceptArtEdit = () => {
    setEditingConceptArtId(null)
  }

  const deleteConceptArt = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const item = conceptArts.find((c) => c.firestoreId === id)
        if (item?.imageUrl) {
          try {
            const imgRef = ref(storage, item.imageUrl)
            await deleteObject(imgRef)
          } catch (e) {
            console.warn('Failed to delete storage object:', e)
          }
        }
        await deleteDoc(doc(db, 'conceptArt', id))
        fetchConceptArt()
      } catch (err) {
        console.error('Error deleting concept art:', err)
      }
    }
  }

  const reorderConceptArt = async (oldIndex, newIndex) => {
    const reordered = [...conceptArts]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)

    setConceptArts(reordered)

    try {
      const batch = writeBatch(db)
      reordered.forEach((item, index) => {
        const ref = doc(db, 'conceptArt', item.firestoreId)
        batch.update(ref, { order: index })
      })
      await batch.commit()
    } catch (err) {
      console.error('Error reordering concept art:', err)
      fetchConceptArt()
    }
  }

  const addLogo = async (file) => {
    if (!file) return
    setLogoSubmitting(true)
    try {
      const imgRef = ref(storage, `projects/logos/${Date.now()}_${file.name}`)
      await uploadBytes(imgRef, file)
      const imageUrl = await getDownloadURL(imgRef)

      await addDoc(collection(db, 'logos'), {
        src: imageUrl,
        order: logos.length,
        createdAt: serverTimestamp(),
      })
      fetchLogos()
    } catch (err) {
      console.error('Error adding logo:', err)
      throw err
    } finally {
      setLogoSubmitting(false)
    }
  }

  const deleteLogo = async (id) => {
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
        await deleteDoc(doc(db, 'logos', id))
        fetchLogos()
      } catch (err) {
        console.error('Error deleting logo:', err)
      }
    }
  }

  const reorderLogos = async (oldIndex, newIndex) => {
    const reordered = [...logos]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)

    setLogos(reordered)

    try {
      const batch = writeBatch(db)
      reordered.forEach((item, index) => {
        const ref = doc(db, 'logos', item.firestoreId)
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
    // Concept Art
    conceptArts,
    conceptArtLoading,
    conceptArtSubmitting,
    editingConceptArtId,
    addConceptArt,
    deleteConceptArt,
    reorderConceptArt,
    editConceptArt,
    cancelConceptArtEdit,
    fetchConceptArt,
    // Logos
    logos,
    logosLoading,
    logoSubmitting,
    addLogo,
    deleteLogo,
    reorderLogos,
    fetchLogos,
  }
}
