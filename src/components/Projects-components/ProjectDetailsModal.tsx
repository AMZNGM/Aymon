import Modal from '@/components/ui/Modal/Modal'
import type { Project } from '@/types/project.types'

export default function ProjectDetailsModal({ project }: { project: Project }) {
  return (
    <Modal id="project-details-modal" className="max-w-6xl max-h-[80vh] overflow-y-scroll border border-text/25">
      <h3 className="font-sec font-bold text-2xl uppercase mb-6">Project Details</h3>

      <div className="space-y-6">
        <h3 className="font-bold text-text text-lg mb-4">Project Scope</h3>
        <p className="font-medium text-text/75 wrap-break-word whitespace-pre-wrap">{project.scope}</p>

        <h3 className="font-bold text-text text-lg mb-4">Description</h3>
        <p className="text-text/75 wrap-break-word leading-relaxed whitespace-pre-wrap">{project.description?.detailed}</p>

        <h3 className="font-bold text-text text-lg mb-4">Metadata</h3>
        <div className="gap-4 grid grid-cols-2 text-sm">
          {Object.entries(project.metadata || {}).map(([key, value]) => (
            <div key={key}>
              <span className="text-text/50">{key.replace(/_/g, ' ')}:</span>
              <span className="text-text/75 ml-2">{value as React.ReactNode}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
