export const extractMedia = (item, options = {}) => {
  const items = []
  if (!item) return items

  // Handle Concept Art Item
  if (item.imageUrl || item.videoUrl) {
    items.push({
      src: item.imageUrl,
      url: item.videoUrl,
      title: item.title,
      description: item.description,
      date: item.date,
      type: item.videoUrl ? 'video' : 'image',
      videoType: item.videoUrl?.includes('vimeo') ? 'vimeo' : 'youtube',
    })
    return items
  }

  // Handle Project Item
  if (!item.media) return items

  const { videoOnly = false } = options

  if (!videoOnly) {
    if (item.media.primary) items.push({ src: item.media.primary, title: item.title, slug: item.slug, type: 'image' })
    if (item.media.secondary) items.push({ src: item.media.secondary, title: item.title, slug: item.slug, type: 'image' })

    if (Array.isArray(item.media.gallery)) {
      item.media.gallery.forEach((img) => {
        if (img) items.push({ src: img, title: item.title, slug: item.slug, type: 'image' })
      })
    }
  }

  const hasVideoLink =
    (item.media.video?.url && item.media.video.type === 'youtube') || (item.media.video?.url && item.media.video.type === 'vimeo')

  if (hasVideoLink) {
    items.push({
      src: item.media.video.preview || item.media.primary,
      url: item.media.video.url,
      videoType: item.media.video.type,
      title: item.media.video.title || item.title,
      slug: item.slug,
      type: 'video',
    })
  }

  return items
}

export const getWorkFilter = (type) => {
  return (p) => {
    const category = String(p.category || '').toLowerCase()
    const services = Array.isArray(p.services) ? p.services.join(' ').toLowerCase() : String(p.services || '').toLowerCase()

    const hasVideoLink =
      (p.media?.video?.url && p.media.video.type === 'youtube') || (p.media?.video?.url && p.media.video.type === 'vimeo')

    switch (type) {
      case 'selected':
        return p.showInSelectedWork === true
      case 'branding':
        return category.includes('branding') || services.includes('branding')
      case 'videos':
        return category.includes('video') || hasVideoLink
      case 'short-form':
        return category.includes('short form') || category.includes('social')
      default:
        return true
    }
  }
}
