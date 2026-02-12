'use client'

import Link from 'next/link'
import { useAdmin } from '@/hooks/useAdmin'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ProtectedRoute from '@/components/shared/ProtectedRoute'
import AdminHeader from '@/components/admin-components/AdminHeader'
import ProjectForm from '@/components/admin-components/ProjectForm'
import ProjectList from '@/components/admin-components/ProjectList'

export default function AdminPanel() {
  const {
    loading,
    error,
    projects,
    projectImageFile,
    setProjectImageFile,
    galleryFiles,
    setGalleryFiles,
    currentImages,
    setCurrentImages,
    projectSubmitting,
    editingProjectId,
    projectForm,
    setProjectForm,
    formatDate,
    addProject,
    deleteProject,
    editProject,
    cancelEdit,
    projectReorder,
  } = useAdmin()

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-text text-bg">
        <div className="text-center max-w-md">
          <div className="bg-red-600/20 rounded-md border border-red-600 text-red-400 px-4 py-3 text-sm w-full h-fit text-wrap whitespace-pre-wrap">
            <h3 className="font-semibold mb-2">Error Loading Admin Panel</h3>
            <p className="text-sm">{error}</p>
          </div>
          <p className="text-sm opacity-60 my-4">Please check your Firebase configuration in .env.local</p>
          <Link href="/login" className="px-4 py-2 bg-main text-text rounded-md hover:bg-main/90 transition-all">
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      {projectSubmitting && <LoadingOverlay text="Uploading Project..." para="Please do not close this window" />}

      <div className="relative w-dvw min-h-dvh overflow-hidden bg-text text-bg py-8 px-1">
        <div className="max-w-6xl mx-auto">
          <AdminHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add/Edit Project Form */}
            <ProjectForm
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              projectImageFile={projectImageFile}
              setProjectImageFile={setProjectImageFile}
              galleryFiles={galleryFiles}
              setGalleryFiles={setGalleryFiles}
              currentImages={currentImages}
              setCurrentImages={setCurrentImages}
              editingProjectId={editingProjectId}
              projectSubmitting={projectSubmitting}
              onSubmit={addProject}
              onCancelEdit={cancelEdit}
            />

            {/* Existing Projects */}
            <ProjectList
              projects={projects}
              onEdit={editProject}
              onDelete={deleteProject}
              onReorder={projectReorder}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
