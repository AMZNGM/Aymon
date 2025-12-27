'use client'

import { useState, useEffect } from 'react'
import { getAboutContent, updateAboutContent, getContactContent, updateContactContent } from '@/lib/getAbout'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ContentAdmin() {
  const [aboutContent, setAboutContent] = useState(null)
  const [contactContent, setContactContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const [about, contact] = await Promise.all([getAboutContent(), getContactContent()])
      setAboutContent(about)
      setContactContent(contact)
    } catch (error) {
      setMessage('Error loading content: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateAbout = async () => {
    setSaving(true)
    try {
      const success = await updateAboutContent(aboutContent)
      if (success) {
        setMessage('✅ About content updated successfully!')
      } else {
        setMessage('❌ Failed to update about content')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateContact = async () => {
    setSaving(true)
    try {
      const success = await updateContactContent(contactContent)
      if (success) {
        setMessage('✅ Contact content updated successfully!')
      } else {
        setMessage('❌ Failed to update contact content')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-text text-bg">
        <div className="animate-pulse text-center">
          <div className="bg-bg/20 rounded-lg h-8 w-32 mx-auto mb-4"></div>
          <div className="bg-bg/10 rounded-lg h-4 w-64 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="relativce w-screen min-h-screen overflow-hidden bg-text text-bg py-8 px-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Content Management</h1>

          {message && <div className="bg-bg/10 border border-main rounded-lg mb-6 p-4">{message}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Content */}
            <div className="bg-bg/10 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">About Page Content</h2>
              {aboutContent && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={aboutContent.title || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                      placeholder="Title"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={aboutContent.firstName || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, firstName: e.target.value })}
                      placeholder="First Name"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={aboutContent.lastName || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, lastName: e.target.value })}
                      placeholder="Last Name"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nick Name</label>
                    <input
                      type="text"
                      value={aboutContent.nickname || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, nickname: e.target.value })}
                      placeholder="Nick Name"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <input
                      type="text"
                      value={aboutContent.position || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, position: e.target.value })}
                      placeholder="Content Creator"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slogan</label>
                    <input
                      type="text"
                      value={aboutContent.slogan || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, slogan: e.target.value })}
                      placeholder="Slogan"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={aboutContent.bio || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
                      placeholder="Bio..."
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main h-32"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={aboutContent.location || ''}
                      onChange={(e) => setAboutContent({ ...aboutContent, location: e.target.value })}
                      placeholder="City, Country"
                      className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                    />
                  </div>
                  <button
                    onClick={updateAbout}
                    disabled={saving}
                    className="w-full py-2 px-4 bg-main text-text rounded-md hover:bg-main/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                    className="w-full py-2 px-4 bg-main text-text rounded-md hover:bg-main/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
