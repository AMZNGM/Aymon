'use client'

import { useState, useCallback } from 'react'
import WorkCard from '@/components/work-components/WorkCard'
import Branding from '@/components/work-components/Branding'
import MusicVideos from '@/components/work-components/MusicVideos'
import SelectedWork from '@/components/work-components/SelectedWork'
import ShortFormContent from '@/components/work-components/ShortFormContent'
import MediaAggregate from '@/components/work-components/MediaAggregate'
import ConceptArt from '@/components/work-components/ConceptArt'

export default function WorkGallery() {
  const [zoomedId, setZoomedId] = useState(null)
  const [zIndices, setZIndices] = useState({})
  const [maxZ, setMaxZ] = useState(25)

  const bringToFront = useCallback(
    (id) => {
      setZIndices((prev) => ({
        ...prev,
        [id]: maxZ,
      }))
      setMaxZ((p) => p + 1)
    },
    [maxZ]
  )

  const handleZoom = useCallback(
    (id) => {
      bringToFront(id)
      setZoomedId(id)
    },
    [bringToFront]
  )

  return (
    <section className="w-dvw h-dvh overflow-hidden bg-sec text-bg">
      <div onClick={() => setZoomedId(null)} className="z-0 fixed inset-0 bg-sec cursor-pointer" />

      <WorkCard
        id="selected"
        Component={SelectedWork}
        initialX="32%"
        initialY="10%"
        isZoomed={zoomedId === 'selected'}
        onZoom={handleZoom}
        zIndex={zIndices.selected}
        onInteraction={bringToFront}
      />

      <WorkCard
        id="MediaAggregate"
        Component={MediaAggregate}
        initialX="-30%"
        initialY="15%"
        isZoomed={zoomedId === 'MediaAggregate'}
        onZoom={handleZoom}
        zIndex={zIndices.MediaAggregate}
        onInteraction={bringToFront}
      />

      <WorkCard
        id="music"
        Component={MusicVideos}
        initialX="-20%"
        initialY="50%"
        isZoomed={zoomedId === 'music'}
        onZoom={handleZoom}
        zIndex={zIndices.music}
        onInteraction={bringToFront}
      />

      <WorkCard
        id="short"
        Component={ShortFormContent}
        initialX="49%"
        initialY="85%"
        isZoomed={zoomedId === 'short'}
        onZoom={handleZoom}
        zIndex={zIndices.short}
        onInteraction={bringToFront}
      />

      <WorkCard
        id="concept"
        Component={ConceptArt}
        initialX="45%"
        initialY="30%"
        isZoomed={zoomedId === 'concept'}
        onZoom={handleZoom}
        zIndex={zIndices.concept}
        onInteraction={bringToFront}
      />

      <WorkCard
        id="branding"
        Component={Branding}
        initialX="10%"
        initialY="70%"
        isZoomed={zoomedId === 'branding'}
        onZoom={handleZoom}
        zIndex={zIndices.branding}
        onInteraction={bringToFront}
      />
    </section>
  )
}
