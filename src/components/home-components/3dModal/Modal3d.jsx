'use client'

import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Model } from '@/components/home-components/3dModal/Model'

export default function Modal3d() {
  return (
    <div className="-top-[12dvh] md:-top-[15dvh] -bottom-[12dvh] md:-bottom-[10dvh] z-10 absolute inset-x-0 cursor-grab active:cursor-grabbing">
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={50} />
        <OrbitControls target={[5, 0.5, 4]} enableZoom={false} enablePan={false} autoRotate />
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <Model />
      </Canvas>
    </div>
  )
}
