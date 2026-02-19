export default function ContentManagement({ contactContent, setContactContent, saving, message, updateContact }) {
  return (
    <>
      <div className="h-fit bg-bg/10 shadow rounded-lg p-6">
        <h2 className="font-semibold text-bg text-xl mb-4">Contact Popup Content</h2>
        {contactContent && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-bg/70 text-sm mb-1">Title</label>
              <input
                type="text"
                value={contactContent.title || ''}
                onChange={(e) => setContactContent({ ...contactContent, title: e.target.value })}
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-bg/70 text-sm mb-1">Email</label>
              <input
                type="email"
                value={contactContent.email || ''}
                onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-bg/70 text-sm mb-1">Mobile</label>
              <input
                type="tel"
                value={contactContent.mobile || ''}
                onChange={(e) => setContactContent({ ...contactContent, mobile: e.target.value })}
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-bg/70 text-sm mb-1">LinkedIn</label>
              <input
                type="url"
                value={contactContent.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    socialLinks: { ...contactContent.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-bg/70 text-sm mb-1">Instagram</label>
              <input
                type="url"
                value={contactContent.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    socialLinks: { ...contactContent.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium text-bg/70 text-sm mb-1">Behance</label>
              <input
                type="url"
                value={contactContent.socialLinks?.behance || ''}
                onChange={(e) =>
                  setContactContent({
                    ...contactContent,
                    socialLinks: { ...contactContent.socialLinks, behance: e.target.value },
                  })
                }
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
              />
            </div>

            <button
              onClick={updateContact}
              disabled={saving}
              className="w-full bg-main hover:bg-main/90 disabled:opacity-50 rounded-md text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Update Contact Content'}
            </button>
          </div>
        )}
      </div>
      {message && <div className="lg:col-span-2 bg-bg/10 border border-main rounded-lg text-bg mt-6 p-4">{message}</div>}
    </>
  )
}
