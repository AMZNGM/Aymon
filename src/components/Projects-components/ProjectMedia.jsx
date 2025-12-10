'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ProjectMedia({ project }) {
  // Function to convert video URLs to embed URLs
  const getEmbedUrl = (url) => {
    if (!url) return ''

    // YouTube URL conversion
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    // YouTube short URL conversion
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Vimeo URL conversion
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }

    // Instagram URL - return as is since Instagram doesn't support direct embedding
    if (url.includes('instagram.com/')) {
      return url
    }

    // Return original URL if no conversion needed
    return url
  }

  // Collect all media from project
  const mediaItems = []

  // Add video if exists
  if (project.video) {
    mediaItems.push({
      type: 'video',
      src: project.video,
      title: 'Project Video',
    })
  }

  // Add all images except the first one (main image)
  const imageKeys = ['image2', 'image3', 'image4', 'image5', 'image6', 'image7']
  imageKeys.forEach((key, index) => {
    if (project[key]) {
      mediaItems.push({
        type: 'image',
        src: project[key],
        title: `Project Image ${index + 2}`, // Start from 2 since we skip image1
      })
    }
  })

  // Add video link if exists (separate from mediaItems for special handling)
  const hasVideoLink = !!project.vidLink

  if (mediaItems.length === 0 && !hasVideoLink) {
    return (
      <section className="relative w-screen min-h-screen overflow-hidden rounded-2xl px-4 max-md:px-1">
        <div className="bg-bg/10 rounded-2xl">
          <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Project Media</h2>
            <p className="text-text/60">No media available for this project.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-screen min-h-screen overflow-hidden rounded-2xl px-4 max-md:px-1">
      <div className="bg-bg/10 rounded-2xl">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-text mb-8">Project Media</h2>

          <div className="space-y-8">
            {mediaItems.map((item, index) => (
              <div key={index} className="bg-bg/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text mb-4">{item.title}</h3>

                {item.type === 'video' && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-text/10">
                    <video controls className="w-full h-full object-cover" preload="metadata">
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {item.type === 'image' && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-text/10">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-200 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Video Link Section - Only shown when video link exists */}
            {hasVideoLink && (
              <div className="bg-bg/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text mb-4">Video Link</h3>
                <div className="flex flex-col items-center space-y-4">
                  {project.vidLink.includes('instagram.com') ? (
                    // Instagram embed - show preview with link
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-text/10 w-full max-w-2xl">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-16 h-16 text-text/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-text/60 mb-4">Instagram Video</p>
                          <Link
                            href={project.vidLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-text/10 hover:bg-text/20 rounded-lg text-text transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Open on Instagram
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // YouTube/Vimeo embed
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-text/10 w-full">
                      <iframe
                        src={getEmbedUrl(project.vidLink)}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Project Video"
                      />
                    </div>
                  )}
                  <p className="text-text/40 text-sm">{project.vidLink}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text/40 text-sm">
              {mediaItems.length + (hasVideoLink ? 1 : 0)} media item{mediaItems.length + (hasVideoLink ? 1 : 0) !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
