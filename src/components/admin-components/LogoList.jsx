'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function LogoList({ items, onDelete, onReorder, loading }) {
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
      <h2 className="font-semibold text-xl mb-4">Logos List ({items.length})</h2>

      {items.length === 0 ? (
        <p className="opacity-60 text-center py-8">No logos found.</p>
      ) : (
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.firestoreId}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className="group relative bg-bg/20 border border-transparent hover:border-main/40 rounded-xl transition-all p-4 cursor-grab active:cursor-grabbing"
            >
              <img src={item.src} alt="Logo" className="w-full object-contain aspect-video brightness-0 rounded p-2" />

              <button
                title="Delete logo"
                onClick={() => onDelete(item.firestoreId)}
                className="top-2 right-2 absolute bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 shadow-lg rounded-full text-text transition-opacity p-1 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>

              <div className="opacity-40 font-bold text-[10px] text-center uppercase tracking-widest mt-2">Order: {index + 1}</div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && <p className="opacity-40 text-[10px] text-center uppercase tracking-widest mt-4">Drag and drop to reorder</p>}
    </div>
  )
}
