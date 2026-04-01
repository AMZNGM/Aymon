'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Trash2, Edit3, Play, GripVertical } from 'lucide-react'
import type { Video as VideoType } from '@/types/admin.types'

interface VideoListProps {
  items: VideoType[]
  onDelete: (id: string) => void
  onEdit: (video: VideoType) => void
  onReorder: (oldIndex: number, newIndex: number) => void
  loading: boolean
}

export default function VideoList({ items, onDelete, onEdit, onReorder, loading }: VideoListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return
    onReorder(draggedIndex, dropIndex)
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  if (loading && items.length === 0) {
    return <div className="opacity-60 text-center p-4">Loading videos...</div>
  }

  return (
    <div className="bg-bg/10 rounded-xl p-4">
      <h2 className="flex items-center gap-2 font-semibold text-xl mb-4">
        <Play size={20} />
        Videos List ({items.length})
      </h2>

      {items.length === 0 ? (
        <p className="opacity-60 text-center py-8">No videos found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.firestoreId}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className="group bg-bg/20 border border-transparent hover:border-main/40 rounded-xl transition-all p-4 cursor-grab active:cursor-grabbing"
            >
              <div className="flex gap-4">
                {/* Drag Handle */}
                <div className="flex items-center opacity-40 group-hover:opacity-60 transition-opacity">
                  <GripVertical size={20} />
                </div>

                {/* Thumbnail */}
                <div className="relative shrink-0">
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} alt={item.title} width={120} height={68} className="w-30 h-17 object-cover rounded-lg" />
                  ) : (
                    <div className="flex justify-center items-center w-30 h-17 bg-bg/40 rounded-lg">
                      <Play size={24} className="text-bg/40" />
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-bg truncate mb-1">{item.title}</h3>
                  <div className="text-bg/40 text-xs">Order: {index + 1}</div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    title="Edit video"
                    onClick={() => onEdit(item)}
                    className="bg-main hover:bg-main/90 opacity-0 group-hover:opacity-100 shadow-lg rounded-full text-bg transition-all p-2 cursor-pointer"
                  >
                    <Edit3 size={14} />
                  </button>

                  <button
                    title="Delete video"
                    onClick={() => onDelete(item.firestoreId!)}
                    className="bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 shadow-lg rounded-full text-bg transition-all p-2 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <p className="opacity-40 text-[10px] text-center uppercase tracking-widest mt-4">Drag and drop to reorder videos</p>
      )}
    </div>
  )
}
