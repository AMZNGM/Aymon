'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User, Upload, X } from 'lucide-react'

interface ProfileImageFormProps {
  currentImage?: string | null
  onSubmit: (file: File) => Promise<void>
  submitting: boolean
}

export default function ProfileImageForm({ currentImage, onSubmit, submitting }: ProfileImageFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    await onSubmit(selectedFile)
    setSelectedFile(null)
    setPreviewUrl('')
    URL.revokeObjectURL(previewUrl)
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    URL.revokeObjectURL(previewUrl)
  }

  return (
    <div className="bg-bg/10 rounded-xl p-6">
      <h2 className="flex items-center gap-2 font-semibold text-xl mb-4">
        <User size={20} />
        Profile Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Image Preview */}
        <div>
          <label className="block font-medium text-sm mb-2">Current Image</label>
          <div className="flex justify-center items-center w-32 h-32 bg-bg/20 rounded-xl">
            {currentImage ? (
              <Image src={currentImage} alt="Current profile" width={128} height={128} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <User size={40} className="text-text/40" />
            )}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label className="block font-medium text-sm mb-2">Upload New Image</label>
          <div className="relative">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="profile-image-file" />
            <label
              htmlFor="profile-image-file"
              className="flex items-center gap-2 bg-bg/20 border border-transparent hover:border-main/40 rounded-lg transition-all px-4 py-2 cursor-pointer"
            >
              <Upload size={16} />
              <span>{selectedFile ? selectedFile.name : 'Choose image file'}</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div>
            <label className="block text-medium mb-2">Preview</label>
            <div className="relative">
              <Image src={previewUrl} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded-xl" />
              <button
                type="button"
                onClick={handleCancel}
                className="top-2 right-2 absolute bg-red-600 hover:bg-red-700 rounded-full text-text transition-colors p-1"
                title="Cancel"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedFile && (
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-main hover:bg-main/90 disabled:bg-main/50 rounded-lg font-medium text-text transition-all px-4 py-2 disabled:cursor-not-allowed"
            >
              <Upload size={16} />
              {submitting ? 'Uploading...' : 'Update Profile Image'}
            </button>
            <button type="button" onClick={handleCancel} className="bg-bg/20 hover:bg-bg/30 rounded-lg text-text transition-all px-4 py-2">
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
