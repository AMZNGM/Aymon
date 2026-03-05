'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Center, Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { Model } from '@/components/home-components/3dModal/Model'

export default function Modal3d() {
  return (
    <div className="-top-[12dvh] md:-top-[15dvh] -bottom-[12dvh] md:-bottom-[10dvh] z-10 absolute inset-x-0 max-md:scale-90 cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }} frameloop="always">
        <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={25} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Center>
            <Model />
          </Center>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
