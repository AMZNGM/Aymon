'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAdmin } from '@/hooks/for-db/useAdmin'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import ProtectedRoute from '@/components/shared/ProtectedRoute'
import AdminHeader from '@/components/admin-components/AdminHeader'
import ProjectForm from '@/components/admin-components/ProjectForm'
import ProjectList from '@/components/admin-components/ProjectList'
import ContentManagement from '@/components/admin-components/ContentManagement'
import ContactPopupContent from '@/components/admin-components/ContactPopupContent'
import LogoForm from '@/components/admin-components/LogoForm'
import LogoList from '@/components/admin-components/LogoList'
import VideoForm from '@/components/admin-components/VideoForm'
import VideoList from '@/components/admin-components/VideoList'
import ProfileImageForm from '@/components/admin-components/ProfileImageForm'

export default function AdminPanel() {
  const {
    error,
    projects,
    setProjectImageFile,
    setProjectGifFile,
    gifFiles,
    setGifFiles,
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
    // Content management
    aboutContent,
    setAboutContent,
    contactContent,
    setContactContent,
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
    // Videos
    videos,
    videosLoading,
    videoSubmitting,
    editingVideoId,
    videoFile,
    setVideoFile,
    videoThumbnailFile,
    setVideoThumbnailFile,
    addVideo,
    deleteVideo,
    editVideo,
    cancelVideoEdit,
    reorderVideos,
    // Profile Image
    profileImage,
    profileImageSubmitting,
    updateProfileImage,
  } = useAdmin()

  const [activeTab, setActiveTab] = useState<'projects' | 'logos' | 'videos' | 'content'>('projects')

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-dvh bg-text text-bg">
        <div className="max-w-md text-center">
          <div className="w-full h-fit bg-red-600/20 border border-red-600 rounded-md text-red-400 text-sm text-wrap whitespace-pre-wrap px-4 py-3">
            <h3 className="font-semibold mb-2">Error Loading Admin Panel</h3>
            <p className="text-sm">{error}</p>
          </div>
          <p className="opacity-60 text-sm my-4">Please check your Firebase configuration in .env.local</p>
          <Link href="/login" className="bg-main hover:bg-main/90 rounded-md text-text transition-all px-4 py-2">
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      {projectSubmitting && <LoadingOverlay text="Uploading Project..." para="Please do not close this window" />}
      {videoSubmitting && <LoadingOverlay text="Uploading Video..." para="Please do not close this window" />}
      {profileImageSubmitting && <LoadingOverlay text="Uploading Profile Image..." para="Please do not close this window" />}

      <div className="relative w-dvw min-h-dvh bg-text text-bg px-1 py-8">
        <div className="max-w-6xl mx-auto">
          <AdminHeader />

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-bg/10 border-b mb-8 pb-2">
            {['projects', 'logos', 'videos', 'content'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'projects' | 'logos' | 'videos' | 'content')}
                className={`pb-2 px-1 cursor-pointer capitalize transition-all ${
                  activeTab === tab ? 'border-b-2 border-main font-bold' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative gap-8 grid grid-cols-1 lg:grid-cols-2">
            {activeTab === 'projects' ? (
              <>
                {/* Add/Edit Project Form */}
                <ProjectForm
                  projectForm={projectForm}
                  setProjectForm={setProjectForm}
                  setProjectImageFile={setProjectImageFile}
                  setProjectGifFile={setProjectGifFile}
                  gifFiles={gifFiles}
                  setGifFiles={setGifFiles}
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
                <div className="top-8 sticky h-fit">
                  <ProjectList
                    projects={projects}
                    onEdit={editProject}
                    onDelete={deleteProject}
                    onReorder={projectReorder}
                    formatDate={formatDate}
                  />
                </div>
              </>
            ) : activeTab === 'logos' ? (
              <>
                <LogoForm
                  key={editingLogoId || 'new'}
                  onAdd={addLogo}
                  submitting={logoSubmitting}
                  editingItem={logos.find((l) => l.firestoreId === editingLogoId)}
                  onCancel={cancelLogoEdit}
                />
                <div className="top-8 sticky h-fit">
                  <LogoList items={logos} onDelete={deleteLogo} onEdit={editLogo} onReorder={reorderLogos} loading={logosLoading} />
                </div>
              </>
            ) : activeTab === 'videos' ? (
              <>
                <VideoForm
                  key={editingVideoId || 'new'}
                  onSubmit={addVideo}
                  onCancel={cancelVideoEdit}
                  submitting={videoSubmitting}
                  editingVideo={videos.find((v) => v.firestoreId === editingVideoId) || undefined}
                  videoFile={videoFile}
                  setVideoFile={setVideoFile}
                  videoThumbnailFile={videoThumbnailFile}
                  setVideoThumbnailFile={setVideoThumbnailFile}
                />
                <div className="top-8 sticky h-fit">
                  <VideoList items={videos} onDelete={deleteVideo} onEdit={editVideo} onReorder={reorderVideos} loading={videosLoading} />
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
                <div className="flex flex-col gap-8">
                  <ContactPopupContent
                    contactContent={contactContent}
                    setContactContent={setContactContent}
                    saving={saving}
                    message={message}
                    updateContact={updateContact}
                  />
                  {/* Profile Image Management */}
                  <div className="h-fit">
                    <ProfileImageForm currentImage={profileImage?.url} onSubmit={updateProfileImage} submitting={profileImageSubmitting} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
