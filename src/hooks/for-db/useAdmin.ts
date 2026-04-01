'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '@/lib/cloudinary'
import { getAboutContent, updateAboutContent, getContactContent, updateContactContent } from '@/lib/getAbout'
import { getLogos } from '@/lib/getLogos'
import { getVideos } from '@/lib/getVideos'
import { getProfileImage } from '@/lib/getProfileImage'
import { initialProjectForm } from '@/components/admin-components/ProjectFormConstants'
import { Project, Logo, AboutContent, ContactContent, Video, ProfileImage } from '@/types/admin.types'

export function useAdmin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null)
  const [projectGifFile, setProjectGifFile] = useState<File | null>(null)
  const [gifFiles, setGifFiles] = useState<File[]>([])
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [currentImages, setCurrentImages] = useState<{ primary: string; gallery: string[]; gifs: string[] }>({
    primary: '',
    gallery: [],
    gifs: [],
  })
  const [projectSubmitting, setProjectSubmitting] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [logos, setLogos] = useState<Logo[]>([])
  const [logosLoading, setLogosLoading] = useState(false)
  const [logoSubmitting, setLogoSubmitting] = useState(false)
  const [editingLogoId, setEditingLogoId] = useState<string | null>(null)

  // Video management state
  const [videos, setVideos] = useState<Video[]>([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [videoSubmitting, setVideoSubmitting] = useState(false)
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoThumbnailFile, setVideoThumbnailFile] = useState<File | null>(null)

  // Profile image management state
  const [profileImage, setProfileImage] = useState<ProfileImage | null>(null)
  const [profileImageSubmitting, setProfileImageSubmitting] = useState(false)

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
        fetchVideos()
        fetchProfileImage()
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
      const data = await getLogos(true) // Bypass cache for real-time updates
      setLogos(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLogosLoading(false)
    }
  }

  const fetchVideos = async () => {
    setVideosLoading(true)
    try {
      const data = await getVideos(true) // Bypass cache for real-time updates
      setVideos(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setVideosLoading(false)
    }
  }

  const fetchProfileImage = async () => {
    try {
      const data = await getProfileImage(true) // Bypass cache for real-time updates
      setProfileImage(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
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
    } catch {
      return ''
    }
  }

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!projectForm.title || !projectForm.slug || !db) return
    setProjectSubmitting(true)
    try {
      if (editingProjectId) {
        const projectRef = doc(db!, 'projects', editingProjectId)
        const existing = projects.find((p) => p.firestoreId === editingProjectId) as Project | undefined

        let primaryUrl = existing?.media?.primary || ''

        const existingGifs: string[] = existing?.media?.gifs ?? (existing?.media?.gif ? [existing.media.gif] : [])
        const currentGallery = Array.isArray(currentImages.gallery) ? [...currentImages.gallery] : []
        const gallery = currentGallery

        if (projectImageFile) {
          primaryUrl = await uploadToCloudinary(projectImageFile, 'data/projects')
        }

        const removedGifs = existingGifs.filter((url) => !currentImages.gifs.includes(url))
        // Delete removed GIFs from Cloudinary
        await Promise.allSettled(
          removedGifs.map(async (url) => {
            try {
              const publicId = getPublicIdFromUrl(url)
              if (publicId) {
                await deleteFromCloudinary(publicId, 'image')
              }
            } catch (e) {
              console.warn('Failed to delete GIF from Cloudinary:', e)
            }
          })
        )

        // Upload new GIF files
        const uploadedGifUrls = [...currentImages.gifs]

        // Handle single GIF file
        if (projectGifFile) {
          const gifUrl = await uploadToCloudinary(projectGifFile, 'data/projects/gifs')
          uploadedGifUrls.push(gifUrl)
        }

        // Handle multiple GIF files
        for (const file of gifFiles) {
          const gifUrl = await uploadToCloudinary(file, 'data/projects/gifs')
          uploadedGifUrls.push(gifUrl)
        }

        for (const file of galleryFiles) {
          const url = await uploadToCloudinary(file, 'data/projects/gallery')
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
            gifs: uploadedGifUrls,
            reels: projectForm.media?.reels || [],
            video: projectForm.media?.video?.url
              ? { url: projectForm.media.video.url, type: projectForm.media.video.type || '', title: projectForm.media.video.title || '' }
              : null,
          },
          updatedAt: serverTimestamp(),
        }

        await updateDoc(projectRef, updateData)
        setCurrentImages({ primary: updateData.media.primary, gallery: updateData.media.gallery || [], gifs: updateData.media.gifs || [] })
        setEditingProjectId(null)
      } else {
        if (!projectImageFile) {
          throw new Error('Primary image is required for new projects')
        }
        const primaryUrl = await uploadToCloudinary(projectImageFile, 'data/projects')

        const galleryUrls = []
        for (const file of galleryFiles) {
          const url = await uploadToCloudinary(file, 'data/projects/gallery')
          galleryUrls.push(url)
        }

        const uploadedGifUrls: string[] = []

        // Handle single GIF file
        if (projectGifFile) {
          const gifUrl = await uploadToCloudinary(projectGifFile, 'data/projects/gifs')
          uploadedGifUrls.push(gifUrl)
        }

        // Handle multiple GIF files
        for (const file of gifFiles) {
          const gifUrl = await uploadToCloudinary(file, 'data/projects/gifs')
          uploadedGifUrls.push(gifUrl)
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
            gifs: uploadedGifUrls,
            reels: projectForm.media?.reels || [],
            video: projectForm.media?.video?.url
              ? { url: projectForm.media.video.url, type: projectForm.media.video.type || '', title: projectForm.media.video.title || '' }
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
    if (!db) return
    if (confirm('Are you sure you want to delete this project and all its images?')) {
      try {
        const project = projects.find((p) => (p.firestoreId || p.id) === projectId)

        if (project?.media) {
          const deletePromises = []

          // Delete primary image
          if (project.media.primary) {
            const publicId = getPublicIdFromUrl(project.media.primary)
            if (publicId) {
              deletePromises.push(deleteFromCloudinary(publicId, 'image'))
            }
          }

          // Delete gallery images
          if (project.media.gallery && Array.isArray(project.media.gallery)) {
            for (const imageUrl of project.media.gallery) {
              const publicId = getPublicIdFromUrl(imageUrl)
              if (publicId) {
                deletePromises.push(deleteFromCloudinary(publicId, 'image'))
              }
            }
          }

          // Delete gifs (new field) + legacy single gif
          const gifsToDelete = [...(project.media.gifs || []), ...(project.media.gif ? [project.media.gif] : [])]
          for (const gifUrl of gifsToDelete) {
            const publicId = getPublicIdFromUrl(gifUrl)
            if (publicId) {
              deletePromises.push(deleteFromCloudinary(publicId, 'image'))
            }
          }

          // Wait for all deletions to complete
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
    const gifs = project.media?.gifs ?? (project.media?.gif ? [project.media.gif] : [])
    setCurrentImages({
      primary: project.media?.primary || '',
      gallery: project.media?.gallery || [],
      gifs,
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
      media: {
        gifs,
        reels: project.media?.reels || [],
        video: project.media?.video || { url: '', type: '', title: '' },
      },
    } as typeof initialProjectForm)
    setProjectImageFile(null)
    setProjectGifFile(null)
    setGifFiles([])
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
    setGifFiles([])
    setGalleryFiles([])
    setCurrentImages({ primary: '', gallery: [], gifs: [] })
    const fileInput = document.querySelector('#project-file-input') as HTMLInputElement
    const galleryInput = document.querySelector('#gallery-file-input') as HTMLInputElement
    if (fileInput) fileInput.value = ''
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
    if (!db) return
    setLogoSubmitting(true)
    try {
      let imageUrl = ''
      if (file) {
        // If it's a new file (not just a string URL from an existing logo)
        if (typeof file !== 'string') {
          imageUrl = await uploadToCloudinary(file, 'data/logos')
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

  // Video management functions
  const addVideo = async (videoData: { title: string }) => {
    if (!db) return
    setVideoSubmitting(true)
    try {
      let videoUrl = ''
      let thumbnailUrl = ''

      // Upload video file if provided
      if (videoFile) {
        videoUrl = await uploadToCloudinary(videoFile, 'data/videos')
      }

      // Upload thumbnail if provided
      if (videoThumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(videoThumbnailFile, 'data/video-thumbnails')
      }

      const docData = {
        title: videoData.title,
        url: videoUrl,
        thumbnail: thumbnailUrl,
        order: videos.length,
        updatedAt: serverTimestamp(),
      }

      if (editingVideoId) {
        await updateDoc(doc(db!, 'videos', editingVideoId), docData)
        setEditingVideoId(null)
      } else {
        await addDoc(collection(db!, 'videos'), {
          ...docData,
          createdAt: serverTimestamp(),
        })
      }

      setVideoFile(null)
      setVideoThumbnailFile(null)
      fetchVideos()
    } catch (err) {
      console.error('Error adding/updating video:', err)
      throw err
    } finally {
      setVideoSubmitting(false)
    }
  }

  const deleteVideo = async (id: string) => {
    if (!db) return
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        const item = videos.find((v) => v.firestoreId === id)
        if (item) {
          // Delete video from Cloudinary
          if (item.url) {
            const publicId = getPublicIdFromUrl(item.url)
            if (publicId) {
              try {
                await deleteFromCloudinary(publicId, 'video')
              } catch (e) {
                console.warn('Failed to delete video from Cloudinary:', e)
              }
            }
          }

          // Delete thumbnail from Cloudinary
          if (item.thumbnail) {
            const publicId = getPublicIdFromUrl(item.thumbnail)
            if (publicId) {
              try {
                await deleteFromCloudinary(publicId, 'image')
              } catch (e) {
                console.warn('Failed to delete thumbnail from Cloudinary:', e)
              }
            }
          }
        }

        await deleteDoc(doc(db!, 'videos', id))
        fetchVideos()
      } catch (err) {
        console.error('Error deleting video:', err)
      }
    }
  }

  const editVideo = (video: Video) => {
    setEditingVideoId(video.firestoreId || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelVideoEdit = () => {
    setEditingVideoId(null)
    setVideoFile(null)
    setVideoThumbnailFile(null)
  }

  const reorderVideos = async (oldIndex: number, newIndex: number) => {
    if (!db) return
    const reordered = [...videos]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)

    setVideos(reordered)

    try {
      const batch = writeBatch(db!)
      reordered.forEach((video, index) => {
        const ref = doc(db!, 'videos', video.firestoreId!)
        batch.update(ref, { order: index })
      })
      await batch.commit()
    } catch (err) {
      console.error('Error reordering videos:', err)
      fetchVideos()
    }
  }

  // Profile image management functions
  const updateProfileImage = async (file: File) => {
    if (!db) return
    setProfileImageSubmitting(true)
    try {
      // Upload new image to Cloudinary
      const imageUrl = await uploadToCloudinary(file, 'data/profile')

      // Delete old image from Cloudinary if it exists
      if (profileImage?.url) {
        const publicId = getPublicIdFromUrl(profileImage.url)
        if (publicId) {
          try {
            await deleteFromCloudinary(publicId, 'image')
          } catch (e) {
            console.warn('Failed to delete old profile image from Cloudinary:', e)
          }
        }
      }

      const docData = {
        url: imageUrl,
        updatedAt: serverTimestamp(),
      }

      if (profileImage?.firestoreId) {
        // Update existing profile image
        await updateDoc(doc(db!, 'profileImages', profileImage.firestoreId), docData)
      } else {
        // Create new profile image
        await addDoc(collection(db!, 'profileImages'), {
          ...docData,
          createdAt: serverTimestamp(),
        })
      }

      fetchProfileImage()
    } catch (err) {
      console.error('Error updating profile image:', err)
      throw err
    } finally {
      setProfileImageSubmitting(false)
    }
  }

  const deleteLogo = async (id: string) => {
    if (!db) return
    if (confirm('Are you sure you want to delete this logo?')) {
      try {
        const item = logos.find((l) => l.firestoreId === id)
        if (item?.src) {
          const publicId = getPublicIdFromUrl(item.src)
          console.log('Attempting to delete logo with publicId:', publicId)
          console.log('Logo URL:', item.src)

          if (publicId) {
            try {
              const deleted = await deleteFromCloudinary(publicId, 'image')
              console.log('Cloudinary delete result:', deleted)
            } catch (cloudinaryError) {
              console.error('Failed to delete from Cloudinary:', cloudinaryError)
              // Continue with database deletion even if Cloudinary delete fails
              console.log('Continuing with database deletion...')
            }
          } else {
            console.warn('Could not extract public ID from URL:', item.src)
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
    error,
    projects,
    projectImageFile,
    setProjectImageFile,
    projectGifFile,
    setProjectGifFile,
    gifFiles,
    setGifFiles,
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
    // Videos
    videos,
    videosLoading,
    videoSubmitting,
    editingVideoId,
    videoFile,
    setVideoFile,
    videoThumbnailFile,
    setVideoThumbnailFile,
    addVideo,
    deleteVideo,
    editVideo,
    cancelVideoEdit,
    reorderVideos,
    fetchVideos,
    // Profile Image
    profileImage,
    profileImageSubmitting,
    updateProfileImage,
    fetchProfileImage,
  }
}
