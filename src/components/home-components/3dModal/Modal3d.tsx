'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Center, Preload } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { Model } from '@/components/home-components/3dModal/Model'

export default function Modal3d() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="-top-[12dvh] md:-top-[15dvh] -bottom-[12dvh] md:-bottom-[10dvh] z-10 absolute inset-x-0 max-md:scale-90 cursor-grab active:cursor-grabbing">
      {!isLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent">
          <div className="w-8 h-8 border-text border-b-2 rounded-full animate-spin"></div>
        </div>
      )}

      <Canvas
        shadows
        dpr={[1, 1.2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        frameloop={isLoaded ? 'demand' : 'never'}
      >
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
            <Model onLoad={() => setIsLoaded(true)} />
          </Center>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
