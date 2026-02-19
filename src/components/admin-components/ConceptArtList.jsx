'use client'

import { useState } from 'react'

export default function ConceptArtList({ items, onDelete, onReorder, onEdit, loading }) {
  const [draggedIndex, setDraggedIndex] = useState(null)

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return
    onReorder(draggedIndex, dropIndex)
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  if (loading && items.length === 0) {
    return <div className="opacity-60 text-center p-4">Loading...</div>
  }

  return (
    <div className="bg-bg/10 rounded-xl p-4">
      <h2 className="font-semibold text-xl mb-4">Concept Art List ({items.length})</h2>

      {items.length > 0 && (
        <div className="border-bg/20 border-b mb-4 pb-3">
          <p className="opacity-50 text-xs">Drag to reorder • Changes saved automatically</p>
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="opacity-60 text-center py-8">No concept art items found.</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className="group bg-bg/20 hover:bg-bg/30 hover:shadow-lg border border-transparent hover:border-main/20 rounded-xl hover:scale-[1.01] transition-all duration-200 p-4 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center gap-4">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover shadow-md rounded" />
                ) : (
                  <div className="w-16 h-16 flex justify-center items-center bg-main/20 rounded">
                    {item.videoUrl ? <span className="text-main text-xs">Video</span> : <span className="text-xs">No Media</span>}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{item.title || 'Untitled'}</h3>
                  {item.description && <p className="opacity-70 text-sm truncate">{item.description}</p>}
                  {item.videoUrl && <p className="text-main/80 text-xs truncate mt-1">{item.videoUrl}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-main hover:bg-main/80 rounded-md text-text text-xs transition-colors px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.firestoreId)}
                    className="bg-red-600 hover:bg-red-700 rounded-md text-text text-xs transition-colors px-2 py-1"
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
  )
}
