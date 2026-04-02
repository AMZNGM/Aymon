export function useVideoEmbed() {
  const getEmbedUrl = (url: string, videoType?: string): string => {
    if (!url) return ''

    const type = videoType || detectVideoType(url)

    switch (type) {
      case 'youtube': {
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/.*v=)([^&\n?#]+)/)?.[1]
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
      }
      case 'vimeo': {
        const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1` : url
      }
      case 'cloudinary':
        return url.replace('/upload/', '/upload/q_auto:best,f_auto/')
      default:
        return url
    }
  }

  const getThumbnailUrl = (url: string, videoType?: string): string | null => {
    if (!url) return null

    const type = videoType || detectVideoType(url)

    switch (type) {
      case 'youtube': {
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/.*v=)([^&\n?#]+)/)?.[1]
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null
      }
      case 'cloudinary': {
        const match = url.match(/\/upload\/v\d+\/(.+?)\.\w+$/)
        if (match) {
          const publicId = match[1]
          return url.replace(/\/upload\/v\d+\/.+$/, `/upload/w_1280,h_720,c_fill,q_auto/${publicId}.jpg`)
        }
        return url.replace(/\.\w+$/, '.jpg').replace('/upload/', '/upload/w_1280,h_720,c_fill,q_auto/')
      }
      default:
        return null
    }
  }

  const detectVideoType = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
    if (url.includes('vimeo.com')) return 'vimeo'
    if (url.includes('cloudinary.com')) return 'cloudinary'
    return 'direct'
  }

  return { getEmbedUrl, getThumbnailUrl, detectVideoType }
}
