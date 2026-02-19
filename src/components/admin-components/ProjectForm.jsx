'use client'

import { useState } from 'react'

export default function ProjectForm({
  projectForm,
  setProjectForm,
  setProjectImageFile,
  galleryFiles,
  setGalleryFiles,
  currentImages,
  setCurrentImages,
  editingProjectId,
  projectSubmitting,
  onSubmit,
  onCancelEdit,
}) {
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState(null)

  const changeImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProjectImageFile(file)
    }
  }

  const changeGalleryImages = (e) => {
    const files = Array.from(e.target.files)

    setGalleryFiles(files)
  }

  const deleteGalleryImage = (indexToDelete) => {
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
    const galleryInput = document.getElementById('gallery-file-input')
    if (galleryInput) galleryInput.value = ''
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

    const reorderedGallery = [...currentImages.gallery]
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

  const slugify = (text) =>
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
                  const updates = { title: val }

                  const prevSlug = slugify(p.title)
                  if (!p.slug || p.slug === prevSlug) updates.slug = slug
                  if (!p.id || p.id === prevSlug) updates.id = slug
                  if (!p.video.title || p.video.title === p.title) {
                    updates.video = { ...p.video, title: val }
                  }

                  return { ...p, ...updates }
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

          <div className="h-fit flex items-center bg-bg/20 hover:bg-main/40 border border-bg/30 rounded-md transition-colors mt-auto">
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

          <div className="h-fit flex items-center bg-bg/20 hover:bg-main/40 border border-bg/30 rounded-md transition-colors">
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
                const updates = {
                  description: { ...p.description, short: val },
                }

                // Auto-sync SEO description if it's empty or matches the previous short description
                if (!p.seo.description || p.seo.description === p.description.short) {
                  updates.seo = { ...p.seo, description: val }
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

        <div>
          <label className="block font-medium text-sm mb-2">Services (comma-separated)</label>
          <input
            type="text"
            value={projectForm.services}
            onChange={(e) => setProjectForm((p) => ({ ...p, services: e.target.value }))}
            placeholder="Brand Strategy, Logo Design, Marketing Materials"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Technologies (comma-separated)</label>
          <input
            type="text"
            value={projectForm.technologies}
            onChange={(e) => setProjectForm((p) => ({ ...p, technologies: e.target.value }))}
            placeholder="Illustrator, Figma, After Effects"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
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
            value={projectForm.seo.keywords}
            onChange={(e) => setProjectForm((p) => ({ ...p, seo: { ...p.seo, keywords: e.target.value } }))}
            placeholder="brand identity, logo design, visual design"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">SEO Description</label>
          <textarea
            value={projectForm.seo.description}
            onChange={(e) => setProjectForm((p) => ({ ...p, seo: { ...p.seo, description: e.target.value } }))}
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
              <img src={currentImages.primary} alt="Current primary" className="w-20 h-20 object-cover border border-bg/30 rounded" />
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
                    <img src={img} alt={`Current gallery ${index + 1}`} className="w-16 h-16 object-cover border border-bg/30 rounded" />
                    <button
                      type="button"
                      onClick={() => deleteGalleryImage(index)}
                      className="-top-2 -right-2 z-10 absolute w-5 h-5 flex justify-center items-center bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 rounded-full text-white text-xs transition-opacity"
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

        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div>
            <label className="block font-medium text-sm mb-2">Video URL</label>
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
              className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Video Type</label>
            <select
              value={projectForm.video.type}
              onChange={(e) =>
                setProjectForm((p) => ({
                  ...p,
                  video: { ...p.video, type: e.target.value },
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
              value={projectForm.video.title}
              onChange={(e) =>
                setProjectForm((p) => ({
                  ...p,
                  video: { ...p.video, title: e.target.value },
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
