const vids = [
  { src: '/videos/randomVideos/eyes.mp4', alt: 'video 1' },
  { src: '/videos/randomVideos/feeling.mp4', alt: 'video 2' },
  { src: '/videos/randomVideos/visualCard.mp4', alt: 'video 3' },
  { src: '/videos/randomVideos/awarnessUrbnlanes.mp4', alt: 'video 4' },
  { src: '/videos/randomVideos/cold.mp4', alt: 'video 5' },
  { src: '/videos/randomVideos/plastine.mp4', alt: 'video 6' },
]

export default function VideosSection() {
  return (
    <section className="relative w-full h-full py-12 px-1">
      <hr className="text-bg/50 mb-24" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vids.map((vid, index) => (
          <div key={index} className="flex justify-center">
            <video
              loop
              muted
              autoPlay
              playsInline
              webkit-playsinline="true"
              controls={false}
              src={vid.src}
              className="object-cover w-full border border-bg/25 rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
