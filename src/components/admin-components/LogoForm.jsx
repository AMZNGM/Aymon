'use client'

import { useState, useEffect } from 'react'

export default function LogoForm({ onAdd, submitting, editingItem, onCancel }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [link, setLink] = useState('')

  useEffect(() => {
    if (editingItem) {
      setLink(editingItem.link || '')
      setPreview(editingItem.src || null)
      setFile(editingItem.src || null) // Set file to current src URL
    } else {
      setLink('')
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
    if (!file) {
      alert('Please select a logo image')
      return
    }

    try {
      await onAdd(file, link)
      if (!editingItem) {
        setFile(null)
        setPreview(null)
        setLink('')
        if (document.getElementById('logo-file')) {
          document.getElementById('logo-file').value = ''
        }
      }
    } catch (error) {
      alert('Failed to save logo: ' + error.message)
    }
  }

  return (
    <div className="bg-bg/10 rounded-lg p-6">
      <h2 className="font-semibold text-xl mb-4">{editingItem ? 'Edit Logo' : 'Add New Logo'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm mb-2">Logo Image</label>
          {preview && (
            <div className="mb-2">
              <img src={preview} alt="Preview" className="w-32 h-16 object-contain bg-text/5 border border-bg/30 rounded p-2" />
            </div>
          )}
          <input
            id="logo-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-bg/20 hover:bg-main/40 hover:file:bg-main/90 file:bg-main border border-bg/30 file:border-0 rounded-md file:rounded-full focus:outline-none focus:ring-2 focus:ring-main file:font-semibold file:text-text file:text-sm transition-colors file:mr-4 px-3 file:px-3 py-2 file:py-1 cursor-pointer"
          />
        </div>

        <div>
          <label className="block font-medium text-sm mb-2">Logo Link (Optional)</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-main hover:bg-main/90 disabled:opacity-50 rounded-md text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? (editingItem ? 'Saving...' : 'Adding...') : editingItem ? 'Update Logo' : 'Add Logo'}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-bg/20 hover:bg-bg/30 rounded-md text-bg transition-all px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
