const vids = [
  { src: '/videos/randomVideos/eyes.mp4', alt: 'video 1' },
  { src: '/videos/randomVideos/feeling.mp4', alt: 'video 2' },
  { src: '/videos/randomVideos/visualCard.mp4', alt: 'video 3' },
  { src: '/videos/randomVideos/awarnessUrbnlanes.mp4', alt: 'video 4' },
]

export default function VideosSection() {
  return (
    <section className="relative w-full h-full py-12 px-1">
      <hr className="text-bg/50 mb-24" />

      {vids.map((vid, index) => (
        <div key={index} className="sticky top-0 right-0 flex flex-col items-end">
          <video
            loop
            muted
            autoPlay
            playsInline
            webkit-playsinline="true"
            controls={false}
            src={vid.src}
            className="object-cover w-120 rounded-2xl pointer-events-none max-md:mb-2"
          />
        </div>
      ))}
    </section>
  )
}
