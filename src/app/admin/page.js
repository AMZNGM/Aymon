'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { auth, db, storage } from '@/lib/firebase'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminPanel() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState([])
  const [projectImageFile, setProjectImageFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [currentImages, setCurrentImages] = useState({ primary: '', gallery: [] })
  const [projectSubmitting, setProjectSubmitting] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [draggedProjectIndex, setDraggedProjectIndex] = useState(null)
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState(null)
  const [projectForm, setProjectForm] = useState({
    id: '',
    slug: '',
    client: '',
    title: '',
    category: '',
    year: '',
    status: 'completed',
    featured: false,
    scope: '',
    process: '',
    impact: '',
    description: {
      short: '',
      detailed: '',
    },
    services: [],
    technologies: [],
    seo: {
      keywords: [],
      description: '',
    },
    metadata: {
      duration: '',
      team_size: 1,
      client_location: '',
      project_type: 'freelance',
    },
    video: {
      url: '',
      type: 'vimeo',
      title: '',
    },
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      } else {
        fetchProjects()
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

  const changeImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Primary image must be less than 1MB')
        e.target.value = ''
        return
      }
      setProjectImageFile(file)
    }
  }

  const changeGalleryImages = (e) => {
    const files = Array.from(e.target.files)

    const oversizedFiles = files.filter((file) => file.size > 500 * 1024)
    if (oversizedFiles.length > 0) {
      alert(
        `Gallery images must be less than 500KB each. The following files are too large: ${oversizedFiles.map((f) => f.name).join(', ')}`
      )
      e.target.value = ''
      return
    }

    setGalleryFiles(files)
  }

  const deleteGalleryImage = (indexToDelete) => {
    setCurrentImages((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToDelete),
    }))
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

      setProjectForm({
        id: '',
        slug: '',
        client: '',
        title: '',
        category: '',
        year: '',
        status: 'completed',
        featured: false,
        scope: '',
        process: '',
        impact: '',
        description: {
          short: '',
          detailed: '',
        },
        services: [],
        technologies: [],
        seo: {
          keywords: [],
          description: '',
        },
        metadata: {
          duration: '',
          team_size: 1,
          client_location: '',
          project_type: 'freelance',
        },
        video: {
          url: '',
          type: 'vimeo',
          title: '',
        },
      })
      setProjectImageFile(null)
      setGalleryFiles([])
      setCurrentImages({ primary: '', gallery: [] })
      const fileInput = document.querySelector('#project-file-input')
      const galleryInput = document.querySelector('#gallery-file-input')
      if (fileInput) fileInput.value = ''
      if (galleryInput) galleryInput.value = ''

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
    setCurrentImages({ primary: '', gallery: [] })
    setProjectForm({
      id: '',
      slug: '',
      client: '',
      title: '',
      category: '',
      year: '',
      status: 'completed',
      featured: false,
      scope: '',
      process: '',
      impact: '',
      description: { short: '', detailed: '' },
      services: [],
      technologies: [],
      seo: { keywords: [], description: '' },
      metadata: { duration: '', team_size: 1, client_location: '', project_type: 'freelance' },
      video: { url: '', type: 'vimeo', title: '' },
    })
    setProjectImageFile(null)
    setGalleryFiles([])
    const fileInput = document.querySelector('#project-file-input')
    const galleryInput = document.querySelector('#gallery-file-input')
    if (fileInput) fileInput.value = ''
    if (galleryInput) galleryInput.value = ''
  }

  const projectDragStart = (e, index) => {
    setDraggedProjectIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const projectDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const projectDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedProjectIndex === null || draggedProjectIndex === dropIndex) return

    projectReorder(draggedProjectIndex, dropIndex)
    setDraggedProjectIndex(null)
  }

  const projectDragEnd = () => {
    setDraggedProjectIndex(null)
  }

  const galleryDragStart = (e, index) => {
    setDraggedGalleryIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const galleryDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const galleryDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedGalleryIndex === null || draggedGalleryIndex === dropIndex) return

    galleryReorder(draggedGalleryIndex, dropIndex)
    setDraggedGalleryIndex(null)
  }

  const galleryDragEnd = () => {
    setDraggedGalleryIndex(null)
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

  const galleryReorder = async (oldIndex, newIndex) => {
    const reorderedGallery = [...currentImages.gallery]
    const [movedImage] = reorderedGallery.splice(oldIndex, 1)
    reorderedGallery.splice(newIndex, 0, movedImage)

    setCurrentImages((prev) => ({ ...prev, gallery: reorderedGallery }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-text text-bg">
        <div className="animate-pulse text-center">
          <div className="bg-bg/20 rounded-lg h-8 w-32 mx-auto mb-4"></div>
          <div className="bg-bg/10 rounded-lg h-4 w-64 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-text text-bg">
        <div className="text-center max-w-md">
          <div className="bg-red-600/20 rounded-md border border-red-600 text-red-400 px-4 py-3 text-sm w-full h-fit text-wrap whitespace-pre-wrap">
            <h3 className="font-semibold mb-2">Error Loading Admin Panel</h3>
            <p className="text-sm">{error}</p>
          </div>
          <p className="text-sm opacity-60 my-4">Please check your Firebase configuration in .env.local</p>
          <Link href="/login" className="px-4 py-2 bg-main text-text rounded-md hover:bg-main/90 transition-all">
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      {/* Loading Overlay */}
      {projectSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm">
          <div className="bg-text text-bg rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-bg/20 border-t-main"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Uploading Project...</h3>
            <p className="text-sm opacity-75">Please do not close this window</p>
          </div>
        </div>
      )}

      <div className="relativce w-screen min-h-screen overflow-hidden bg-text text-bg py-8 px-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex max-md:flex-col justify-between items-center mb-8 max-md:gap-8">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <div className="flex flex-row-reverse max-md:flex-col gap-4">
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 border border-main text-main rounded-md hover:bg-main hover:text-text transition-all text-center cursor-pointer"
              >
                Sign Out
              </button>
              <div className="flex gap-4">
                <Link
                  href={'/admin/content'}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-center"
                >
                  Edit About Page
                </Link>
                <Link href="/work" className="px-4 py-2 bg-main text-text rounded-md hover:bg-main/90 transition-all text-center">
                  View Work Page
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add New Post Form */}
            <div className="bg-bg/10 rounded-lg p-6">
              {/* Add New Project Form */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={addProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">ID</label>
                      <input
                        type="text"
                        value={projectForm.id}
                        onChange={(e) => setProjectForm((p) => ({ ...p, id: e.target.value }))}
                        placeholder="project-id"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Slug</label>
                      <input
                        type="text"
                        value={projectForm.slug}
                        onChange={(e) => setProjectForm((p) => ({ ...p, slug: e.target.value }))}
                        required
                        placeholder="url-friendly-project-title"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Client</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm((p) => ({ ...p, client: e.target.value }))}
                        required
                        placeholder="Client Name"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                        required
                        placeholder="Project Title"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))}
                        required
                        placeholder="e.g., Motion Graphics, Visual Art"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Year</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm((p) => ({ ...p, year: e.target.value }))}
                        placeholder="2025"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select
                        value={projectForm.status}
                        onChange={(e) => setProjectForm((p) => ({ ...p, status: e.target.value }))}
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="planned">Planned</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm((p) => ({ ...p, featured: e.target.checked }))}
                        className="mr-2"
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Featured Project
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Scope</label>
                    <input
                      type="text"
                      value={projectForm.scope}
                      onChange={(e) => setProjectForm((p) => ({ ...p, scope: e.target.value }))}
                      placeholder="e.g., Brand Identity Design, VFX"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Short Description</label>
                    <textarea
                      value={projectForm.description.short}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          description: { ...p.description, short: e.target.value },
                        }))
                      }
                      placeholder="Brief project description"
                      rows={2}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Detailed Description</label>
                    <textarea
                      value={projectForm.description.detailed}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          description: { ...p.description, detailed: e.target.value },
                        }))
                      }
                      placeholder="Detailed project description"
                      rows={4}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Process</label>
                    <textarea
                      value={projectForm.process}
                      onChange={(e) => setProjectForm((p) => ({ ...p, process: e.target.value }))}
                      placeholder="Project development process"
                      rows={3}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Impact</label>
                    <textarea
                      value={projectForm.impact}
                      onChange={(e) => setProjectForm((p) => ({ ...p, impact: e.target.value }))}
                      placeholder="Project impact and results"
                      rows={3}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Services (comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.services.join(', ')}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          services: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter((s) => s),
                        }))
                      }
                      placeholder="Brand Strategy, Logo Design, Marketing Materials"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologies.join(', ')}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          technologies: e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter((t) => t),
                        }))
                      }
                      placeholder="Illustrator, Figma, After Effects"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        value={projectForm.metadata.duration}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            metadata: { ...p.metadata, duration: e.target.value },
                          }))
                        }
                        placeholder="e.g., 3 months"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Team Size</label>
                      <input
                        type="number"
                        value={projectForm.metadata.team_size}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            metadata: { ...p.metadata, team_size: parseInt(e.target.value) || 1 },
                          }))
                        }
                        min="1"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Client Location</label>
                      <input
                        type="text"
                        value={projectForm.metadata.client_location}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            metadata: { ...p.metadata, client_location: e.target.value },
                          }))
                        }
                        placeholder="e.g., Los Angeles, CA"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Project Type</label>
                      <select
                        value={projectForm.metadata.project_type}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            metadata: { ...p.metadata, project_type: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      >
                        <option value="freelance">Freelance</option>
                        <option value="agency">Agency</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="in-house">In-house</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.seo.keywords.join(', ')}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          seo: {
                            ...p.seo,
                            keywords: e.target.value
                              .split(',')
                              .map((k) => k.trim())
                              .filter((k) => k),
                          },
                        }))
                      }
                      placeholder="brand identity, logo design, visual design"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Description</label>
                    <textarea
                      value={projectForm.seo.description}
                      onChange={(e) =>
                        setProjectForm((p) => ({
                          ...p,
                          seo: { ...p.seo, description: e.target.value },
                        }))
                      }
                      placeholder="SEO meta description"
                      rows={2}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Primary Image {editingProjectId ? '(Leave empty to keep current)' : '(Required - Max 1MB)'}
                    </label>
                    {editingProjectId && currentImages.primary && (
                      <div className="mb-2">
                        <img
                          src={currentImages.primary}
                          alt="Current primary"
                          className="h-20 w-20 object-cover rounded border border-bg/30"
                        />
                        <p className="text-xs opacity-60 mt-1">Current image</p>
                      </div>
                    )}
                    <input
                      id="project-file-input"
                      type="file"
                      accept="image/*"
                      onChange={changeImage}
                      required={!editingProjectId}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-main file:text-text hover:file:bg-main/90"
                    />
                    <p className="text-xs opacity-60 mt-1">Maximum file size: 1MB</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Gallery Images {editingProjectId ? '(Optional - Leave empty to keep current)' : '(Optional - Max 500KB each)'}
                    </label>
                    {editingProjectId && currentImages.gallery.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs opacity-60 mb-2">
                          Current gallery ({currentImages.gallery.length} images) - Drag to reorder, hover to delete
                        </p>
                        <div id="gallery-container" className="flex flex-wrap gap-2">
                          {currentImages.gallery.map((img, index) => (
                            <div
                              key={index}
                              draggable
                              onDragStart={(e) => galleryDragStart(e, index)}
                              onDragOver={galleryDragOver}
                              onDrop={(e) => galleryDrop(e, index)}
                              onDragEnd={galleryDragEnd}
                              className="relative group cursor-move opacity-90 hover:opacity-100 transition-opacity"
                            >
                              <img
                                src={img}
                                alt={`Current gallery ${index + 1}`}
                                className="h-16 w-16 object-cover rounded border border-bg/30"
                              />
                              <button
                                type="button"
                                onClick={() => deleteGalleryImage(index)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10"
                                title="Delete image"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <input
                      id="gallery-file-input"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={changeGalleryImages}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-main file:text-text hover:file:bg-main/90"
                    />
                    <p className="text-xs opacity-60 mt-1">Maximum file size: 500KB per image</p>
                    {galleryFiles.length > 0 && (
                      <div className="mt-2 text-sm opacity-60">
                        {galleryFiles.length} new image{galleryFiles.length > 1 ? 's' : ''} selected
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Video URL</label>
                      <input
                        type="url"
                        value={projectForm.video.url}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            video: { ...p.video, url: e.target.value },
                          }))
                        }
                        placeholder="https://vimeo.com/1072571026"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Video Type</label>
                      <select
                        value={projectForm.video.type}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            video: { ...p.video, type: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      >
                        <option value="vimeo">Vimeo</option>
                        <option value="youtube">YouTube</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Video Title</label>
                      <input
                        type="text"
                        value={projectForm.video.title}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            video: { ...p.video, title: e.target.value },
                          }))
                        }
                        placeholder="Geo - Architectural Visualization"
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={projectSubmitting}
                    className="w-full py-2 px-4 bg-main text-text rounded-md hover:bg-main/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {projectSubmitting
                      ? editingProjectId
                        ? 'Saving...'
                        : 'Adding Project...'
                      : editingProjectId
                        ? 'Update Project'
                        : 'Add Project'}
                  </button>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="w-full mt-2 py-2 px-4 border border-bg/30 text-bg rounded-md hover:bg-bg/5 transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Existing Projects */}
            <div className="bg-bg/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Existing Projects ({projects.length})</h2>
              <p className="text-xs opacity-60 mb-2">Drag and drop to reorder projects</p>

              <div id="projects-container" className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-center opacity-60 p-4">No projects yet</p>
                ) : (
                  projects.map((project, index) => (
                    <div
                      key={project.firestoreId || project.id}
                      draggable
                      onDragStart={(e) => projectDragStart(e, index)}
                      onDragOver={projectDragOver}
                      onDrop={(e) => projectDrop(e, index)}
                      onDragEnd={projectDragEnd}
                      className="bg-bg/20 rounded-lg p-4 cursor-grab active:cursor-grabbing opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm opacity-80 mt-1">{project.category}</p>
                          <p className="text-xs opacity-60 mt-2">{formatDate(project.createdAt)}</p>
                        </div>
                        <div className="ml-4 flex gap-2">
                          <button
                            onClick={() => router.push(`/work/${project.slug}`)}
                            className="px-3 py-1 bg-main/10 text-main text-sm rounded hover:bg-main/20 transition-colors"
                          >
                            View
                          </button>

                          <button
                            onClick={() => editProject(project)}
                            className="px-3 py-1 bg-main text-text text-sm rounded hover:bg-main/90 transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteProject(project.firestoreId || project.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
