'use client'

import { useState, useEffect } from 'react'

export default function ConceptArtForm({ onAdd, submitting, editingItem, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
    videoUrl: '',
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        description: editingItem.description || '',
        date: editingItem.date || '',
        imageUrl: editingItem.imageUrl || '',
        videoUrl: editingItem.videoUrl || '',
      })
      setPreview(editingItem.imageUrl || null)
      setFile(null) // Reset file when editing a new item
    } else {
      setFormData({ title: '', description: '', date: '', imageUrl: '', videoUrl: '' })
      setPreview(null)
      setFile(null)
    }
  }, [editingItem])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file && !formData.videoUrl && (!editingItem || !editingItem.imageUrl)) {
      alert('Please provide either an image or a video URL')
      return
    }

    try {
      await onAdd(formData, file)
      if (!editingItem) {
        setFormData({ title: '', description: '', date: '', imageUrl: '', videoUrl: '' })
        setFile(null)
        setPreview(null)
        if (document.getElementById('concept-art-file')) {
          document.getElementById('concept-art-file').value = ''
        }
      }
    } catch (error) {
      alert('Failed to save concept art: ' + error.message)
    }
  }

  return (
    <div className="bg-bg/10 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">{editingItem ? 'Edit Concept Art' : 'Add Concept Art'}</h2>
        {editingItem && (
          <button onClick={onCancel} className="font-medium text-main text-sm hover:underline">
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title (optional)"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Short description (optional)"
            rows={2}
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Date</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="e.g. 2024 or Oct 2023"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Image {editingItem && '(Optional if keeping current)'}</label>
          {preview && (
            <div className="mb-2">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover border border-bg/30 rounded" />
            </div>
          )}
          <input
            id="concept-art-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-bg/20 hover:bg-main/40 hover:file:bg-main/90 file:bg-main border border-bg/30 file:border-0 rounded-md file:rounded-full focus:outline-none focus:ring-2 focus:ring-main file:font-semibold file:text-text file:text-sm transition-colors file:mr-4 px-3 file:px-3 py-2 file:py-1 cursor-pointer"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-bg/30 border-t"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-text text-bg/60 text-sm px-2">OR</span>
          </div>
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Video URL (Vimeo/YouTube)</label>
          <input
            type="url"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://..."
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-main hover:bg-main/90 disabled:opacity-50 rounded-md text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : editingItem ? 'Update Concept Art' : 'Add Concept Art'}
        </button>
      </form>
    </div>
  )
}
