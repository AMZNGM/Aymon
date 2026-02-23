'use client'

import { useEffect } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Model } from '@/components/home-components/3dModal/Model'

function AdaptiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const isMobile = size.width < 768
    const isTablet = size.width < 1024

    if (isMobile) {
      camera.fov = 30
      camera.position.set(5, 4, 13)
    } else if (isTablet) {
      camera.fov = 35
      camera.position.set(3, 3, 11)
    } else {
      camera.fov = 40
      camera.position.set(2, 3, 9)
    }

    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

export default function Modal3d() {
  return (
    <section className="relative w-dvw h-[40dvh] md:h-[50dvh] lg:h-[60dvh]">
      <div className="-top-[12dvh] md:-top-[15dvh] -bottom-[12dvh] md:-bottom-[10dvh] absolute inset-x-0 cursor-grab active:cursor-grabbing">
        <Canvas>
          <AdaptiveCamera />
          <OrbitControls target={[5, 0.5, 4]} enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <Model />
        </Canvas>
      </div>
    </section>
  )
}
