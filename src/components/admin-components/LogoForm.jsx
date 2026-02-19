'use client'

import { useState } from 'react'

export default function LogoForm({ onAdd, submitting }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

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
      await onAdd(file)
      setFile(null)
      setPreview(null)
      if (document.getElementById('logo-file')) {
        document.getElementById('logo-file').value = ''
      }
    } catch (error) {
      alert('Failed to add logo: ' + error.message)
    }
  }

  return (
    <div className="bg-bg/10 rounded-lg p-6">
      <h2 className="font-semibold text-xl mb-4">Add New Logo</h2>
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

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-main hover:bg-main/90 disabled:opacity-50 rounded-md text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? 'Adding...' : 'Add Logo'}
        </button>
      </form>
    </div>
  )
}
