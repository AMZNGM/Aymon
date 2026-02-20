'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

export default function ProjectList({ projects, onEdit, onDelete, onReorder, formatDate }) {
  const router = useRouter()
  const [draggedProjectIndex, setDraggedProjectIndex] = useState(null)

  const projectDragStart = (e, index) => {
    setDraggedProjectIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const projectDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const projectDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedProjectIndex === null || draggedProjectIndex === dropIndex) return

    onReorder(draggedProjectIndex, dropIndex)
    setDraggedProjectIndex(null)
  }

  const projectDragEnd = () => {
    setDraggedProjectIndex(null)
  }

  return (
    <div className="bg-bg/10 rounded-xl p-4">
      <h2 className="font-semibold text-xl mb-4">Existing Projects ({projects.length})</h2>

      {projects.length > 0 && (
        <div className="border-bg/20 border-b mb-4 pb-3">
          <p className="opacity-50 text-xs">Drag to reorder • Changes saved automatically</p>
        </div>
      )}

      <div id="projects-container">
        {projects.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          projects.map((project, index) => (
            <div
              key={project.firestoreId || project.id}
              draggable
              onDragStart={(e) => projectDragStart(e, index)}
              onDragOver={projectDragOver}
              onDrop={(e) => projectDrop(e, index)}
              onDragEnd={projectDragEnd}
              className="group bg-bg/20 hover:bg-bg/30 hover:shadow-lg border border-transparent hover:border-main/20 rounded-xl hover:scale-[1.02] transition-all duration-200 mb-3 p-4 cursor-grab active:cursor-grab"
            >
              <div className="min-w-0 flex flex-1 justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{project.title}</h3>

                  <p className="opacity-80 text-sm mt-1">{project.category}</p>

                  <div className="flex items-center gap-3 opacity-60 text-xs mt-2">
                    {formatDate(project.createdAt)}
                    {project.featured && <span className="text-main">Featured</span>}
                    {project.showInSelectedWork === true && <span className="text-cyan-700">Selected Work</span>}
                  </div>
                </div>

                {/* Action Buttons */}
                {[
                  {
                    onClick: () => router.push(`/work/${project.slug}`),
                    title: 'View project',
                    className: 'bg-main/10 hover:bg-main/20 text-main',
                    children: 'View',
                  },
                  {
                    onClick: () => onEdit(project),
                    title: 'Edit project',
                    className: 'bg-main hover:bg-main/90 text-text',
                    children: 'Edit',
                  },
                  {
                    onClick: () => onDelete(project.firestoreId || project.id),
                    title: 'Delete project',
                    className: 'bg-red-600 hover:bg-red-700 text-text',
                    children: 'Delete',
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    title={item.title}
                    className={`rounded-md text-sm transition-colors px-2 py-1 cursor-pointer ${item.className}`}
                  >
                    {item.children}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
