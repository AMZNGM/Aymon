'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import BioText from '@/components/ui/BioText.jsx'

const vid1 = '/videos/randomVideos/awarnessUrbnlanes.mp4'
const vid2 = '/videos/randomVideos/cold.mp4'
const vid3 = '/videos/randomVideos/eyes.mp4'
const vid4 = '/videos/randomVideos/feeling.mp4'
const vid5 = '/videos/randomVideos/plastine.mp4'
const vid6 = '/videos/randomVideos/visualCard.mp4'
const vid7 = '/videos/selectedVideos/marwanPablo.mp4'

const vids = [{ src: vid1 }, { src: vid2 }, { src: vid3 }, { src: vid4 }, { src: vid5 }, { src: vid6 }, { src: vid7 }]

export default function ParallaxVideoGallery() {
  const headerRef = useRef()
  const canvasRef = useRef()
  const sceneRef = useRef()
  const animationFrameRef = useRef()

  const params = {
    rows: 7,
    columns: 7,
    curvature: 5,
    spacing: 10,
    imageWidth: 7,
    imageHeight: 4.5,
    depth: 7.5,
    elevation: 0,
    lookAtRange: 20,
    verticalCurvature: 0.5,
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 40)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#000')

    // Store refs
    sceneRef.current = { scene, camera, renderer, videos: [] }

    let headerRefRotationX = 0
    let headerRefRotationY = 0
    let headerRefTranslateZ = 0
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let lookAtTarget = new THREE.Vector3(0, 0, 0)

    function createVideoElement(videoSrc) {
      const video = document.createElement('video')
      video.src = videoSrc
      video.crossOrigin = 'anonymous'
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.play().catch((err) => console.log('Video play failed:', err))
      return video
    }

    function calculateRotation(x, y) {
      const a = 1 / (params.depth * params.curvature)
      const slopeY = -2 * a * y
      const rotationY = Math.atan(slopeY)
      const verticalFactor = Math.atan(params.verticalCurvature)
      const maxYDistance = (params.rows * params.spacing) / 2
      const normalizedY = y / maxYDistance
      const rotationX = normalizedY * verticalFactor
      return { rotationX, rotationY }
    }

    function calculatePosition(row, col) {
      let x = (col - params.columns / 2) * params.spacing
      let y = (row - params.rows / 2) * params.spacing
      let z = (x * x) / (params.depth * params.curvature)

      const normalizedY = y / ((params.rows * params.spacing) / 2)
      z += Math.abs(normalizedY) * normalizedY * params.verticalCurvature * 5
      y += params.elevation

      const { rotationX, rotationY } = calculateRotation(x, y)

      return { x, y, z, rotationX, rotationY }
    }

    function createVideoPlane(row, col) {
      const videoData = vids[Math.floor(Math.random() * vids.length)]
      const geometry = new THREE.PlaneGeometry(params.imageWidth, params.imageHeight)
      const video = createVideoElement(videoData.src)
      const videoTexture = new THREE.VideoTexture(video)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      const material = new THREE.MeshBasicMaterial({
        map: videoTexture,
        side: THREE.DoubleSide,
      })
      const plane = new THREE.Mesh(geometry, material)
      const { x, y, z, rotationX, rotationY } = calculatePosition(row, col)
      plane.position.set(x, y, z)
      plane.rotation.x = rotationX
      plane.rotation.y = rotationY

      plane.userData.basePosition = { x, y, z }
      plane.userData.baseRotation = { x: rotationX, y: rotationY, z: 0 }
      plane.userData.parallaxFactor = Math.random() * 0.5 + 0.5
      plane.userData.randomOffset = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
      }
      plane.userData.rotationModifier = {
        x: Math.random() * 0.15 - 0.075,
        y: Math.random() * 0.15 - 0.075,
        z: Math.random() * 0.2 - 0.1,
      }
      plane.userData.phaseOffset = Math.random() * Math.PI * 2
      plane.userData.video = video

      return plane
    }

    function updateGallery() {
      sceneRef.current.videos.forEach((plane) => {
        if (plane.userData.video) {
          plane.userData.video.pause()
          plane.userData.video.src = ''
        }
        scene.remove(plane)
        plane.geometry.dispose()
        plane.material.dispose()
      })

      sceneRef.current.videos = []

      for (let row = 0; row < params.rows; row++) {
        for (let col = 0; col < params.columns; col++) {
          const plane = createVideoPlane(row, col)
          sceneRef.current.videos.push(plane)
          scene.add(plane)
        }
      }
    }

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2)

      headerRefRotationX = -mouseY * 30
      headerRefRotationY = -mouseX * 30
      headerRefTranslateZ = Math.abs(mouseX * mouseY) * 50
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Update header transform
      if (headerRef.current) {
        const targetTransform = `translate(-50%, -50%) perspective(1000px) rotateX(${headerRefRotationX}deg) rotateY(${headerRefRotationY}deg) translateZ(${headerRefTranslateZ}px)`
        headerRef.current.style.transform = targetTransform
        headerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
      }

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      lookAtTarget.x = targetX * params.lookAtRange
      lookAtTarget.y = -targetY * params.lookAtRange
      lookAtTarget.z = (lookAtTarget.x * lookAtTarget.x) / (params.depth * params.curvature)

      const time = performance.now() * 0.001

      sceneRef.current.videos.forEach((plane) => {
        const { basePosition, baseRotation, parallaxFactor, randomOffset, rotationModifier, phaseOffset } = plane.userData
        const mouseDistance = Math.sqrt(targetX * targetX + targetY * targetY)
        const parallaxX = targetX * parallaxFactor * 3 * randomOffset.x
        const parallaxY = targetY * parallaxFactor * 3 * randomOffset.y
        const oscillation = Math.sin(time + phaseOffset) * mouseDistance * 0.1

        plane.position.x = basePosition.x + parallaxX + oscillation * randomOffset.x
        plane.position.y = basePosition.y + parallaxY + oscillation * randomOffset.y
        plane.position.z = basePosition.z + oscillation * randomOffset.z * parallaxFactor

        plane.rotation.x = baseRotation.x + targetY * rotationModifier.x * mouseDistance + oscillation * rotationModifier.x * 0.2
        plane.rotation.y = baseRotation.y + targetX * rotationModifier.y * mouseDistance + oscillation * rotationModifier.y * 0.2
        plane.rotation.z = baseRotation.z + targetX * targetY * rotationModifier.z * 2 + oscillation * rotationModifier.z * 0.3
      })

      camera.lookAt(lookAtTarget)
      renderer.render(scene, camera)
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Initialize gallery and start animation
    updateGallery()
    animate()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      sceneRef.current.videos.forEach((plane) => {
        if (plane.userData.video) {
          plane.userData.video.pause()
          plane.userData.video.src = ''
        }
        scene.remove(plane)
        plane.geometry.dispose()
        plane.material.dispose()
      })

      renderer.dispose()
    }
  })

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-bg text-text">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full"></canvas>

      <div ref={headerRef} className="fixed top-1/2 left-1/2 -translate-y-1/2 transform-3d text-center z-50 pointer-events-none">
        <BioText />
      </div>
    </section>
  )
}
