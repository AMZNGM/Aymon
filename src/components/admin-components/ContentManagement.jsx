export default function ContentManagement({ aboutContent, setAboutContent, saving, message, updateAbout }) {
  return (
    <>
      {/* About Content */}
      <div className="bg-bg/10 shadow rounded-lg p-6">
        <h2 className="font-semibold text-bg text-xl mb-4">About Page Content</h2>

        {aboutContent && (
          <div className="space-y-4">
            {Object.entries(aboutContent).map(([key, value]) => {
              if (key === 'socialLinks') return null

              return (
                <div key={key}>
                  <label className="block font-medium text-bg/70 text-sm uppercase mb-2">{key}</label>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => setAboutContent({ ...aboutContent, [key]: e.target.value })}
                    placeholder={key}
                    className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
                  />
                </div>
              )
            })}

            {/* Social Links Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-medium text-bg/70 text-sm uppercase mb-2">Social Links</label>
                <button
                  type="button"
                  onClick={() => {
                    const newPlatform = `platform${Object.keys(aboutContent.socialLinks || {}).length + 1}`
                    setAboutContent({
                      ...aboutContent,
                      socialLinks: {
                        ...aboutContent.socialLinks,
                        [newPlatform]: '',
                      },
                    })
                  }}
                  className="bg-main hover:bg-main/90 rounded text-text text-sm transition-colors px-3 py-1 cursor-pointer"
                >
                  + Add Platform
                </button>
              </div>

              {aboutContent.socialLinks &&
                Object.entries(aboutContent.socialLinks).map(([platform, url], index) => (
                  <div
                    key={platform}
                    className="flex items-center gap-2"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', JSON.stringify({ platform, index }))
                      e.dataTransfer.effectAllowed = 'move'
                    }}
                    onDragOver={(e) => {
                      e.preventDefault()
                      e.dataTransfer.dropEffect = 'move'
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      const dragData = JSON.parse(e.dataTransfer.getData('text/plain'))
                      const { platform: draggedPlatform, index: draggedIndex } = dragData

                      if (draggedPlatform === platform || draggedIndex === index) return

                      const socialLinksArray = Object.entries(aboutContent.socialLinks)

                      if (draggedIndex !== -1 && draggedIndex !== index) {
                        const newSocialLinksArray = [...socialLinksArray]
                        const [draggedItem] = newSocialLinksArray.splice(draggedIndex, 1)
                        const adjustedTargetIndex = draggedIndex < index ? index - 1 : index
                        newSocialLinksArray.splice(adjustedTargetIndex, 0, draggedItem)

                        const newSocialLinks = Object.fromEntries(newSocialLinksArray)
                        setAboutContent({
                          ...aboutContent,
                          socialLinks: newSocialLinks,
                        })
                      }
                    }}
                  >
                    <div className="text-bg/40 hover:text-bg/60 px-2 py-1 cursor-grab active:cursor-grabbing">⋮⋮</div>

                    <input
                      type="text"
                      value={platform}
                      onChange={(e) => {
                        const newPlatform = e.target.value
                        if (newPlatform && newPlatform !== platform) {
                          const socialLinksArray = Object.entries(aboutContent.socialLinks)
                          const currentIndex = socialLinksArray.findIndex(([p]) => p === platform)

                          if (currentIndex !== -1) {
                            const newSocialLinksArray = [...socialLinksArray]
                            newSocialLinksArray[currentIndex] = [newPlatform, url]
                            const newSocialLinks = Object.fromEntries(newSocialLinksArray)
                            setAboutContent({
                              ...aboutContent,
                              socialLinks: newSocialLinks,
                            })
                          }
                        }
                      }}
                      placeholder="Platform name"
                      className="w-1/3 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg text-sm px-3 py-2"
                    />

                    <input
                      type="url"
                      value={url || ''}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          socialLinks: {
                            ...aboutContent.socialLinks,
                            [platform]: e.target.value,
                          },
                        })
                      }
                      placeholder="URL"
                      className="flex-1 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updatedSocialLinks = { ...aboutContent.socialLinks }
                        delete updatedSocialLinks[platform]
                        setAboutContent({
                          ...aboutContent,
                          socialLinks: updatedSocialLinks,
                        })
                      }}
                      className="bg-red-500 hover:bg-red-600 rounded text-text text-sm transition-colors px-3 py-2 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>

            <button
              onClick={updateAbout}
              disabled={saving}
              className="w-full bg-main hover:bg-main/90 disabled:opacity-50 rounded-md text-text transition-all px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Update About Content'}
            </button>
          </div>
        )}
      </div>

      {message && <div className="lg:col-span-2 bg-bg/10 border border-main rounded-lg text-bg mt-6 p-4">{message}</div>}
    </>
  )
}
