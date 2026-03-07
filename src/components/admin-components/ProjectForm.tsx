'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project } from '@/types/admin.types'

interface ProjectFormProps {
  projectForm: Project
  setProjectForm: React.Dispatch<React.SetStateAction<Project>>
  setProjectImageFile: (file: File | null) => void
  setProjectGifFile: (file: File | null) => void
  gifFiles: File[]
  setGifFiles: (files: File[]) => void
  galleryFiles: File[]
  setGalleryFiles: (files: File[]) => void
  currentImages: { primary: string; gallery: string[]; gifs: string[] }
  setCurrentImages: React.Dispatch<React.SetStateAction<{ primary: string; gallery: string[]; gifs: string[] }>>
  editingProjectId: string | null
  projectSubmitting: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  onCancelEdit: () => void
}

export default function ProjectForm({
  projectForm,
  setProjectForm,
  setProjectImageFile,
  setProjectGifFile,
  gifFiles,
  setGifFiles,
  galleryFiles,
  setGalleryFiles,
  currentImages,
  setCurrentImages,
  editingProjectId,
  projectSubmitting,
  onSubmit,
  onCancelEdit,
}: ProjectFormProps) {
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState<number | null>(null)
  const [draggedGifIndex, setDraggedGifIndex] = useState<number | null>(null)

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProjectImageFile(file)
    }
  }

  const changeGif = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[]
    const currentFiles = gifFiles
    setGifFiles([...currentFiles, ...files])
  }

  const changeGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[]
    setGalleryFiles(files)
  }

  const deleteNewGif = (indexToDelete: number) => {
    const newGifFiles = gifFiles.filter((_, i) => i !== indexToDelete)
    setGifFiles(newGifFiles)
  }

  const deleteGalleryImage = (indexToDelete: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToDelete),
    }))
  }

  const removeAllGalleryImages = () => {
    setCurrentImages((prev) => ({
      ...prev,
      gallery: [],
    }))
    setGalleryFiles([])
    const galleryInput = document.getElementById('gallery-file-input') as HTMLInputElement | null
    if (galleryInput) galleryInput.value = ''
  }

  const galleryDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedGalleryIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const galleryDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const galleryDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault()
    if (draggedGalleryIndex === null || draggedGalleryIndex === dropIndex) return

    const reorderedGallery = [...(currentImages.gallery || [])]
    const [movedImage] = reorderedGallery.splice(draggedGalleryIndex, 1)
    reorderedGallery.splice(dropIndex, 0, movedImage)

    setCurrentImages((prev) => ({
      ...prev,
      gallery: reorderedGallery,
    }))
    setDraggedGalleryIndex(null)
  }

  const galleryDragEnd = () => {
    setDraggedGalleryIndex(null)
  }

  const gifDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedGifIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const gifDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const gifDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault()
    if (draggedGifIndex === null || draggedGifIndex === dropIndex) return

    const reorderedGifs = [...(currentImages.gifs || [])]
    const [movedGif] = reorderedGifs.splice(draggedGifIndex, 1)
    reorderedGifs.splice(dropIndex, 0, movedGif)

    setCurrentImages((prev) => ({
      ...prev,
      gifs: reorderedGifs,
    }))
    setDraggedGifIndex(null)
  }

  const gifDragEnd = () => {
    setDraggedGifIndex(null)
  }

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

  return (
    <div className="bg-bg/10 rounded-lg p-6">
      <h2 className="font-semibold text-xl mb-4">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block font-medium text-sm mb-2">ID</label>
            <input
              type="text"
              value={projectForm.id}
              onChange={(e) => {
                const val = slugify(e.target.value)
                setProjectForm((p) => ({ ...p, id: val }))
              }}
              required
              disabled
              placeholder="project-id"
              className="w-full bg-main/40 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Slug</label>
            <input
              type="text"
              value={projectForm.slug}
              onChange={(e) => {
                const val = slugify(e.target.value)
                setProjectForm((p) => ({ ...p, slug: val }))
              }}
              required
              disabled
              placeholder="url-friendly-project-title"
              className="w-full bg-main/40 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Title</label>
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) => {
                const val = e.target.value
                setProjectForm((p) => {
                  const slug = slugify(val)
                  const prevSlug = slugify(p.title || '')

                  const newProject = { ...p, title: val }

                  if (!p.slug || p.slug === prevSlug) newProject.slug = slug
                  if (!p.id || p.id === prevSlug) newProject.id = slug

                  if (p.media?.video && (!p.media.video.title || p.media.video.title === p.title)) {
                    newProject.media = {
                      ...p.media,
                      video: { ...p.media.video, title: val },
                    }
                  }

                  return newProject
                })
              }}
              required
              placeholder="Project Title"
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Client</label>
            <input
              type="text"
              value={projectForm.client}
              onChange={(e) => setProjectForm((p) => ({ ...p, client: e.target.value }))}
              required
              placeholder="Client Name"
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Category</label>
            <input
              type="text"
              value={projectForm.category}
              onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))}
              required
              placeholder="e.g., Motion Graphics, Visual Art"
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Year</label>
            <input
              type="number"
              value={projectForm.year}
              onChange={(e) => setProjectForm((p) => ({ ...p, year: e.target.value }))}
              placeholder="2025"
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 appearance-none"
            />
          </div>

          <div className="flex items-center h-fit bg-bg/20 hover:bg-main/40 border border-bg/30 rounded-md transition-colors mt-auto">
            <input
              type="checkbox"
              id="featured"
              checked={projectForm.featured}
              onChange={(e) => setProjectForm((p) => ({ ...p, featured: e.target.checked }))}
              className="ms-4 cursor-pointer"
            />
            <label htmlFor="featured" className="font-medium text-sm p-4 cursor-pointer select-none">
              Featured Project
            </label>
          </div>

          <div className="flex items-center h-fit bg-bg/20 hover:bg-main/40 border border-bg/30 rounded-md transition-colors">
            <input
              type="checkbox"
              id="showInSelectedWork"
              checked={!!projectForm.showInSelectedWork}
              onChange={(e) => setProjectForm((p) => ({ ...p, showInSelectedWork: e.target.checked }))}
              className="ms-4 cursor-pointer"
            />
            <label htmlFor="showInSelectedWork" className="font-medium text-sm p-4 cursor-pointer select-none">
              Show in Selected Work
            </label>
          </div>
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Status</label>
          <select
            value={projectForm.status}
            onChange={(e) => setProjectForm((p) => ({ ...p, status: e.target.value }))}
            className="w-full bg-bg/20 hover:bg-main/40 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main transition-colors px-3 py-2 cursor-pointer"
          >
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Scope</label>
          <input
            type="text"
            value={projectForm.scope}
            onChange={(e) => setProjectForm((p) => ({ ...p, scope: e.target.value }))}
            placeholder="e.g., Brand Identity Design, VFX"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Short Description</label>
          <textarea
            value={projectForm.description.short}
            onChange={(e) => {
              const val = e.target.value
              setProjectForm((p) => {
                const updates: Partial<Project> = {
                  description: { ...(p.description || { detailed: '' }), short: val },
                }

                // Auto-sync SEO description if it's empty or matches the previous short description
                if (!p.seo?.description || p.seo.description === p.description?.short) {
                  updates.seo = { ...(p.seo || { keywords: [] }), description: val }
                }

                return { ...p, ...updates }
              })
            }}
            placeholder="Brief project description"
            rows={2}
            className="w-full min-h-20 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 field-sizing-content"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Detailed Description</label>
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
            className="w-full min-h-40 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 field-sizing-content"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Process</label>
          <textarea
            value={projectForm.process}
            onChange={(e) => setProjectForm((p) => ({ ...p, process: e.target.value }))}
            placeholder="Project development process"
            rows={3}
            className="w-full min-h-33 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 field-sizing-content"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Impact</label>
          <textarea
            value={projectForm.impact}
            onChange={(e) => setProjectForm((p) => ({ ...p, impact: e.target.value }))}
            placeholder="Project impact and results"
            rows={3}
            className="w-full min-h-28 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2 field-sizing-content"
          />
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block font-medium text-sm mb-2">Duration</label>
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
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Team Size</label>
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
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Client Location</label>
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
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Project Type</label>
            <select
              value={projectForm.metadata.project_type}
              onChange={(e) =>
                setProjectForm((p) => ({
                  ...p,
                  metadata: { ...p.metadata, project_type: e.target.value },
                }))
              }
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            >
              <option value="freelance">Freelance</option>
              <option value="agency">Agency</option>
              <option value="collaboration">Collaboration</option>
              <option value="in-house">In-house</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">SEO Keywords (comma-separated)</label>
          <input
            type="text"
            value={Array.isArray(projectForm.seo?.keywords) ? projectForm.seo.keywords.join(', ') : ''}
            onChange={(e) => {
              const keywordsArray = e.target.value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
              setProjectForm((p) => ({ ...p, seo: { ...(p.seo || { description: '' }), keywords: keywordsArray } }))
            }}
            placeholder="brand identity, logo design, visual design"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">SEO Description</label>
          <textarea
            value={projectForm.seo?.description || ''}
            onChange={(e) => setProjectForm((p) => ({ ...p, seo: { ...(p.seo || { keywords: [] }), description: e.target.value } }))}
            placeholder="SEO meta description"
            rows={2}
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">
            Primary Image {editingProjectId ? '(Leave empty to keep current)' : '(Required)'}
          </label>

          {editingProjectId && currentImages.primary && (
            <div className="mb-2">
              <Image
                src={currentImages.primary}
                alt="Current primary"
                width={80}
                height={80}
                className="w-20 h-20 object-cover border border-bg/30 rounded"
              />
              <p className="opacity-60 text-xs mt-1">Current image</p>
            </div>
          )}

          <input
            id="project-file-input"
            type="file"
            accept="image/*"
            onChange={changeImage}
            required={!editingProjectId}
            className="w-full bg-bg/20 hover:bg-main/40 hover:file:bg-main/90 file:bg-main border border-bg/30 file:border-0 rounded-md file:rounded-full focus:outline-none focus:ring-2 focus:ring-main file:font-semibold file:text-text file:text-sm transition-colors file:mr-4 px-3 file:px-3 py-2 file:py-1 cursor-pointer"
          />

          <p className="opacity-60 text-xs mt-1">Primary project image</p>
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">
            GIF Image {editingProjectId ? '(Optional - Leave empty to keep current)' : '(Optional)'}
          </label>

          {editingProjectId && currentImages.gifs.length > 0 && (
            <div className="mb-2">
              <p className="opacity-60 text-xs mb-2">Current GIFs ({currentImages.gifs.length}) - Drag to reorder, hover to delete</p>
              <div id="gif-container" className="flex flex-wrap gap-2">
                {currentImages.gifs.map((gif, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => gifDragStart(e, index)}
                    onDragOver={gifDragOver}
                    onDrop={(e) => gifDrop(e, index)}
                    onDragEnd={gifDragEnd}
                    className="group relative opacity-90 hover:opacity-100 transition-opacity cursor-move"
                  >
                    <Image
                      src={gif}
                      alt={`Current GIF ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover border border-bg/30 rounded"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentImages((prev) => ({
                          ...prev,
                          gifs: prev.gifs.filter((_, i) => i !== index),
                        }))
                      }}
                      className="-top-2 -right-2 z-10 absolute flex justify-center items-center w-5 h-5 bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 rounded-full text-white text-xs transition-opacity"
                      title="Delete GIF"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setCurrentImages((prev) => ({ ...prev, gifs: [] }))
                  const gifInput = document.getElementById('project-gif-input') as HTMLInputElement | null
                  if (gifInput) gifInput.value = ''
                }}
                className="hover:bg-red-600/10 rounded-md text-red-500 text-xs transition-colors mt-2 px-2 py-1 cursor-pointer"
              >
                Remove All GIFs
              </button>
            </div>
          )}

          <input
            id="project-gif-input"
            type="file"
            accept="image/gif"
            multiple
            onChange={changeGif}
            className="w-full bg-bg/20 hover:bg-main/40 hover:file:bg-main/90 file:bg-main border border-bg/30 file:border-0 rounded-md file:rounded-full focus:outline-none focus:ring-2 focus:ring-main file:font-semibold file:text-text file:text-sm transition-colors file:mr-4 px-3 file:px-3 py-2 file:py-1 cursor-pointer"
          />

          {gifFiles.length > 0 && (
            <div className="mt-2">
              <p className="opacity-60 text-xs mb-2">New GIFs to upload ({gifFiles.length})</p>
              <div className="gap-2 grid grid-cols-4">
                {gifFiles.map((file, index) => (
                  <div key={index} className="group relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`New GIF ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover border border-bg/30 rounded"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => deleteNewGif(index)}
                      className="-top-2 -right-2 z-10 absolute flex justify-center items-center w-5 h-5 bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 rounded-full text-white text-xs transition-opacity"
                      title="Remove GIF"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setGifFiles([])
                  const gifInput = document.getElementById('project-gif-input') as HTMLInputElement | null
                  if (gifInput) gifInput.value = ''
                }}
                className="hover:bg-red-600/10 rounded-md text-red-500 text-xs transition-colors mt-2 px-2 py-1 cursor-pointer"
              >
                Clear All New GIFs
              </button>
            </div>
          )}

          <p className="opacity-60 text-xs mt-1">Animated GIFs for the project (multiple files supported)</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block font-medium text-sm">
              Gallery Images {editingProjectId ? '(Optional - Leave empty to keep current)' : '(Optional)'}
            </label>
            {(currentImages.gallery.length > 0 || galleryFiles.length > 0) && (
              <button
                type="button"
                onClick={removeAllGalleryImages}
                className="hover:bg-red-600/10 rounded-md text-red-500 text-xs transition-colors px-2 py-1 cursor-pointer"
              >
                Remove All
              </button>
            )}
          </div>

          {editingProjectId && currentImages.gallery.length > 0 && (
            <div className="mb-2">
              <p className="opacity-60 text-xs mb-2">
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
                    className="group relative opacity-90 hover:opacity-100 transition-opacity cursor-move"
                  >
                    <Image
                      src={img}
                      alt={`Current gallery ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover border border-bg/30 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => deleteGalleryImage(index)}
                      className="-top-2 -right-2 z-10 absolute flex justify-center items-center w-5 h-5 bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 rounded-full text-white text-xs transition-opacity"
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
            className="w-full bg-bg/20 hover:bg-main/40 hover:file:bg-main/90 file:bg-main border border-bg/30 file:border-0 rounded-md file:rounded-full focus:outline-none focus:ring-2 focus:ring-main file:font-semibold file:text-text file:text-sm transition-colors file:mr-4 px-3 file:px-3 py-2 file:py-1 cursor-pointer"
          />

          <p className="opacity-60 text-xs mt-1">Gallery images for the project</p>
          {galleryFiles.length > 0 && (
            <div className="opacity-60 text-sm mt-2">
              {galleryFiles.length} new image{galleryFiles.length > 1 ? 's' : ''} selected
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block font-medium text-sm">Instagram Reels URLs</label>
            <button
              type="button"
              onClick={() => {
                setProjectForm((p) => ({
                  ...p,
                  media: {
                    ...(p.media || {}),
                    reels: [...(p.media?.reels || []), ''],
                  },
                }))
              }}
              className="hover:bg-main/20 rounded-md text-main text-xs transition-colors px-2 py-1 cursor-pointer"
            >
              + Add Reel
            </button>
          </div>

          {(projectForm.media?.reels || []).map((reel, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={reel}
                onChange={(e) => {
                  setProjectForm((p) => {
                    const newReels = [...(p.media?.reels || [])]
                    newReels[index] = e.target.value
                    return { ...p, media: { ...(p.media || {}), reels: newReels } }
                  })
                }}
                placeholder="https://www.instagram.com/reel/..."
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
              />
              <button
                type="button"
                onClick={() => {
                  setProjectForm((p) => {
                    const newReels = [...(p.media?.reels || [])]
                    newReels.splice(index, 1)
                    return { ...p, media: { ...(p.media || {}), reels: newReels } }
                  })
                }}
                className="hover:bg-red-600/10 rounded-md text-red-500 transition-colors px-3 py-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div>
            <label className="block font-medium text-sm mb-2">Video URL</label>
            <input
              type="url"
              value={projectForm.media?.video?.url || ''}
              onChange={(e) =>
                setProjectForm((p) => ({
                  ...p,
                  media: {
                    ...(p.media || {}),
                    video: { ...(p.media?.video || { type: 'vimeo', title: '' }), url: e.target.value },
                  },
                }))
              }
              placeholder="https://vimeo.com/1072571026"
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Video Type</label>
            <select
              value={projectForm.media?.video?.type || 'vimeo'}
              onChange={(e) =>
                setProjectForm((p) => ({
                  ...p,
                  media: {
                    ...(p.media || {}),
                    video: { ...(p.media?.video || { url: '', title: '' }), type: e.target.value },
                  },
                }))
              }
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            >
              <option value="vimeo">Vimeo</option>
              <option value="youtube">YouTube</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Video Title</label>
            <input
              type="text"
              value={projectForm.media?.video?.title || ''}
              onChange={(e) =>
                setProjectForm((p) => ({
                  ...p,
                  media: {
                    ...(p.media || {}),
                    video: { ...(p.media?.video || { url: '', type: 'vimeo' }), title: e.target.value },
                  },
                }))
              }
              placeholder="Geo - Architectural Visualization"
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={projectSubmitting}
          className="w-full bg-main hover:bg-main/90 disabled:opacity-50 rounded-md text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {projectSubmitting ? (editingProjectId ? 'Saving...' : 'Adding Project...') : editingProjectId ? 'Update Project' : 'Add Project'}
        </button>

        {editingProjectId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="w-full hover:bg-bg/5 border border-bg/30 rounded-md text-bg transition-all mt-2 px-4 py-2"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  )
}
