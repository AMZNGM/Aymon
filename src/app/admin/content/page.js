'use client'

import { useAdmin } from '@/hooks/useAdmin'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import ProtectedRoute from '@/components/shared/ProtectedRoute'

export default function ContentAdmin() {
  const {
    aboutContent,
    setAboutContent,
    contactContent,
    setContactContent,
    contentLoading: loading,
    saving,
    message,
    updateAbout,
    updateContact,
  } = useAdmin()

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <ProtectedRoute>
      <div className="relativce w-dvw min-h-dvh overflow-hidden bg-text text-bg py-8 px-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Content Management</h1>

          {message && <div className="bg-bg/10 border border-main rounded-lg mb-6 p-4">{message}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Content */}
            <div className="bg-bg/10 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">About Page Content</h2>
              {aboutContent && (
                <div className="space-y-4">
                  {Object.entries(aboutContent).map(([key, value]) => (
                    <div key={key}>
                      <label className="block uppercase text-sm font-medium mb-2">{key}</label>

                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => setAboutContent({ ...aboutContent, [key]: e.target.value })}
                        placeholder={key}
                        className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                      />
                    </div>
                  ))}

                  <button
                    onClick={updateAbout}
                    disabled={saving}
                    className="w-full py-2 px-4 bg-main text-text rounded-md hover:bg-main/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Update About Content'}
                  </button>
                </div>
              )}
            </div>

            {/* Contact Content */}
            <div className="bg-bg/10 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Contact Popup Content</h2>
              {contactContent && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={contactContent.title || ''}
                      onChange={(e) => setContactContent({ ...contactContent, title: e.target.value })}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={contactContent.email || ''}
                      onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile</label>
                    <input
                      type="tel"
                      value={contactContent.mobile || ''}
                      onChange={(e) => setContactContent({ ...contactContent, mobile: e.target.value })}
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={contactContent.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setContactContent({
                          ...contactContent,
                          socialLinks: { ...contactContent.socialLinks, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input
                      type="url"
                      value={contactContent.socialLinks?.instagram || ''}
                      onChange={(e) =>
                        setContactContent({
                          ...contactContent,
                          socialLinks: { ...contactContent.socialLinks, instagram: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Behance</label>
                    <input
                      type="url"
                      value={contactContent.socialLinks?.behance || ''}
                      onChange={(e) =>
                        setContactContent({
                          ...contactContent,
                          socialLinks: { ...contactContent.socialLinks, behance: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>

                  <button
                    onClick={updateContact}
                    disabled={saving}
                    className="w-full py-2 px-4 bg-main text-text rounded-md hover:bg-main/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Update Contact Content'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
