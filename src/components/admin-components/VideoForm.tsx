'use client'

import { useState } from 'react'
import { Video, Play, X, Upload } from 'lucide-react'
import type { Video as VideoType } from '@/types/admin.types'

interface VideoFormProps {
  onSubmit: (videoData: { title: string }) => Promise<void>
  onCancel: () => void
  submitting: boolean
  editingVideo?: VideoType | null
  videoFile: File | null
  setVideoFile: (file: File | null) => void
  videoThumbnailFile: File | null
  setVideoThumbnailFile: (file: File | null) => void
}

export default function VideoForm({
  onSubmit,
  onCancel,
  submitting,
  editingVideo,
  videoFile,
  setVideoFile,
  videoThumbnailFile,
  setVideoThumbnailFile,
}: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: editingVideo?.title || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    await onSubmit(formData)
    // Form will be reset by the parent re-rendering with new key
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
    }
  }

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setVideoThumbnailFile(file)
    }
  }

  return (
    <div className="bg-bg/10 rounded-xl mb-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 font-semibold text-xl">
          <Video size={20} />
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </h2>
        <button onClick={onCancel} className="text-bg/60 hover:text-bg transition-colors p-1" title="Cancel">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm mb-2">Video Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-bg/20 border border-transparent hover:border-main/40 focus:border-main/60 rounded-lg focus:outline-none text-bg transition-all px-3 py-2 placeholder-bg/50"
            placeholder="Enter video title"
            required
          />
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block font-medium text-sm mb-2">Upload Video File *</label>
            <div className="relative">
              <input type="file" accept="video/*" onChange={handleVideoFileChange} className="hidden" id="video-file" />
              <label
                htmlFor="video-file"
                className="flex items-center gap-2 bg-bg/20 border border-transparent hover:border-main/40 rounded-lg transition-all px-4 py-2 cursor-pointer"
              >
                <Upload size={16} />
                <span>{videoFile ? videoFile.name : 'Choose video file'}</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">Upload Thumbnail</label>
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleThumbnailFileChange} className="hidden" id="thumbnail-file" />
              <label
                htmlFor="thumbnail-file"
                className="flex items-center gap-2 bg-bg/20 border border-transparent hover:border-main/40 rounded-lg transition-all px-4 py-2 cursor-pointer"
              >
                <Upload size={16} />
                <span>{videoThumbnailFile ? videoThumbnailFile.name : 'Choose thumbnail'}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting || !formData.title.trim() || !videoFile}
            className="flex items-center gap-2 bg-main hover:bg-main/90 disabled:bg-main/50 rounded-lg font-medium text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <Play size={16} />
            {submitting ? 'Saving...' : editingVideo ? 'Update Video' : 'Add Video'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="bg-bg/20 hover:bg-bg/30 rounded-lg text-bg transition-all px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
