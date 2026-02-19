'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAdmin } from '@/hooks/useAdmin'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ProtectedRoute from '@/components/shared/ProtectedRoute'
import AdminHeader from '@/components/admin-components/AdminHeader'
import ProjectForm from '@/components/admin-components/ProjectForm'
import ProjectList from '@/components/admin-components/ProjectList'
import ConceptArtForm from '@/components/admin-components/ConceptArtForm'
import ConceptArtList from '@/components/admin-components/ConceptArtList'
import ContentManagement from '@/components/admin-components/ContentManagement'
import ContactPopupContent from '@/components/admin-components/ContactPopupContent'
import LogoForm from '@/components/admin-components/LogoForm'
import LogoList from '@/components/admin-components/LogoList'

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
    // Concept Art
    conceptArts,
    conceptArtLoading,
    conceptArtSubmitting,
    addConceptArt,
    deleteConceptArt,
    reorderConceptArt,
    editingConceptArtId,
    editConceptArt,
    cancelConceptArtEdit,
    // Content management
    aboutContent,
    setAboutContent,
    contactContent,
    setContactContent,
    contentLoading,
    saving,
    message,
    updateAbout,
    updateContact,
    // Logos
    logos,
    logosLoading,
    logoSubmitting,
    editingLogoId,
    addLogo,
    deleteLogo,
    reorderLogos,
    editLogo,
    cancelLogoEdit,
  } = useAdmin()

  const editingConceptArt = conceptArts.find((c) => c.firestoreId === editingConceptArtId)

  const [activeTab, setActiveTab] = useState('projects') // 'projects', 'concept-art', or 'content'

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

      <div className="relative w-dvw min-h-dvh bg-text text-bg py-8 px-1">
        <div className="max-w-6xl mx-auto">
          <AdminHeader />

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8 border-b border-bg/10 pb-2">
            {['projects', 'concept-art', 'logos', 'content'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 cursor-pointer capitalize transition-all ${activeTab === tab ? 'border-b-2 border-main font-bold' : 'opacity-50 hover:opacity-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid relative grid-cols-1 lg:grid-cols-2 gap-8">
            {activeTab === 'projects' ? (
              <>
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
                <div className="sticky top-8 h-fit">
                  <ProjectList
                    projects={projects}
                    onEdit={editProject}
                    onDelete={deleteProject}
                    onReorder={projectReorder}
                    formatDate={formatDate}
                  />
                </div>
              </>
            ) : activeTab === 'concept-art' ? (
              <>
                {/* Concept Art Management */}
                <ConceptArtForm
                  onAdd={addConceptArt}
                  submitting={conceptArtSubmitting}
                  editingItem={editingConceptArt}
                  onCancel={cancelConceptArtEdit}
                />
                <div className="sticky top-8 h-fit">
                  <ConceptArtList
                    items={conceptArts}
                    onDelete={deleteConceptArt}
                    onReorder={reorderConceptArt}
                    onEdit={editConceptArt}
                    loading={conceptArtLoading}
                  />
                </div>
              </>
            ) : activeTab === 'logos' ? (
              <>
                <LogoForm
                  onAdd={addLogo}
                  submitting={logoSubmitting}
                  editingItem={logos.find((l) => l.firestoreId === editingLogoId)}
                  onCancel={cancelLogoEdit}
                />
                <div className="sticky top-8 h-fit">
                  <LogoList items={logos} onDelete={deleteLogo} onEdit={editLogo} onReorder={reorderLogos} loading={logosLoading} />
                </div>
              </>
            ) : (
              <>
                {/* Content Management */}
                <ContentManagement
                  aboutContent={aboutContent}
                  setAboutContent={setAboutContent}
                  saving={saving}
                  message={message}
                  updateAbout={updateAbout}
                />
                <ContactPopupContent
                  contactContent={contactContent}
                  setContactContent={setContactContent}
                  saving={saving}
                  message={message}
                  updateContact={updateContact}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
