'use client'

import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import BioText from '@/components/ui/BioText.jsx'
import { gsap } from '@/utils/gsapConfig'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

// Custom Chromatic Aberration Shader
const ChromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 0.001 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float offset;
    varying vec2 vUv;
    void main() {
      vec2 offsetR = vec2(offset, 0.0);
      vec2 offsetB = vec2(-offset, 0.0);
      vec4 cr = texture2D(tDiffuse, vUv + offsetR);
      vec4 cg = texture2D(tDiffuse, vUv);
      vec4 cb = texture2D(tDiffuse, vUv + offsetB);
      gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a);
    }
  `,
}

const img1 = '/images/randomImgs/folk.webp'
const img2 = '/images/randomImgs/forcing.webp'
const img3 = '/images/randomImgs/inside.webp'
const img4 = '/images/randomImgs/perspective.webp'
const img5 = '/images/randomImgs/proof.webp'

const vid1 = '/videos/randomVideos/awarnessUrbnlanes.mp4'
const vid2 = '/videos/randomVideos/eyes.mp4'
const vid3 = '/videos/randomVideos/feeling.mp4'
const vid4 = '/videos/randomVideos/plastine.mp4'
const vid5 = '/videos/randomVideos/visualCard.mp4'

const vids = [{ src: vid1 }, { src: vid2 }, { src: vid3 }, { src: vid4 }, { src: vid5 }]
const imgs = [{ src: img1 }, { src: img2 }, { src: img3 }, { src: img4 }, { src: img5 }]

export default function ParallaxVideoGallery() {
  const headerRef = useRef()
  const canvasRef = useRef()
  const sceneRef = useRef()
  const animationFrameRef = useRef()
  const isMobile = useIsMobile()

  const params = {
    rows: isMobile ? 3 : 6,
    columns: isMobile ? 3 : 6,
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
    if (typeof window === 'undefined') return

    let renderer, composer // hoist for cleanup visibility
    let handleMouseMove, handleResize // hoist for cleanup visibility

    const initTimer = setTimeout(() => {
      if (!canvasRef.current) return

      // Scene setup
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 0, 40)

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
        desynchronized: true,
      })

      // Optimize for VideoTextures
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.info.autoReset = false
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor('#030303')

      // Post-processing setup
      composer = new EffectComposer(renderer)
      composer.setSize(window.innerWidth, window.innerHeight)

      // Add render pass
      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)

      // Add very subtle bloom effect
      const bloomPass = new BloomPass(
        0.9, // strength - very subtle
        25, // kernel size
        1, // sigma
        256 // resolution
      )
      composer.addPass(bloomPass)

      // Add very subtle chromatic aberration
      const chromaticAberrationPass = new ShaderPass(ChromaticAberrationShader)
      chromaticAberrationPass.uniforms['offset'].value = 0.001 // Very minimal offset
      chromaticAberrationPass.renderToScreen = true
      composer.addPass(chromaticAberrationPass)

      // Store refs
      sceneRef.current = { scene, camera, renderer, instancedMeshes: [], videoElements: [], planeData: [] }

      let headerRefRotationX = 0
      let headerRefRotationY = 0
      let headerRefTranslateZ = 0
      let mouseX = 0
      let mouseY = 0
      let targetX = 0
      let targetY = 0
      let lookAtTarget = new THREE.Vector3(0, 0, 0)

      // Cinematic intro animation state
      let introProgress = 0
      let introDuration = 3.0 // 3 seconds intro
      let introStartTime = performance.now() / 1000

      const isMobile = window.innerWidth < 768

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

      function createImageTexture(imgSrc) {
        const loader = new THREE.TextureLoader()
        const texture = loader.load(imgSrc)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 1 // Downsample for performance
        texture.generateMipmaps = false // Disable mipmaps for performance
        return texture
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
        const { x, y, z, rotationX, rotationY } = calculatePosition(row, col)

        return {
          position: new THREE.Vector3(x, y, z),
          rotation: new THREE.Euler(rotationX, rotationY, 0),
          scale: new THREE.Vector3(1, 1, 1),
          basePosition: { x, y, z },
          baseRotation: { x: rotationX, y: rotationY, z: 0 },
          parallaxFactor: Math.random() * 0.5 + 0.5,
          randomOffset: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 2 - 1,
          },
          rotationModifier: {
            x: Math.random() * 0.15 - 0.075,
            y: Math.random() * 0.15 - 0.075,
            z: Math.random() * 0.2 - 0.1,
          },
          phaseOffset: Math.random() * Math.PI * 2,
          videoSrc: !isMobile ? vids[Math.floor(Math.random() * vids.length)].src : null,
          imgSrc: isMobile ? imgs[Math.floor(Math.random() * imgs.length)].src : null,
          // Intro animation properties
          introOffset: Math.random() * 0.5, // Staggered intro timing
          introRotation: {
            x: (Math.random() - 0.5) * 0.3, // Subtle random rotation
            y: (Math.random() - 0.5) * 0.3,
            z: (Math.random() - 0.5) * 0.1,
          },
          introZOffset: -Math.random() * 5 - 2, // Z-lift distance
          // GSAP animation targets
          gsapTargets: {
            position: { x, y, z },
            rotation: { x: rotationX, y: rotationY, z: 0 },
            scale: { x: 0.3, y: 0.3, z: 1 },
          },
        }
      }

      const preloadVideos = async () => {
        const promises = vids.map((v) => fetch(v.src).then((res) => res.blob()))
        await Promise.all(promises)
      }

      function createInstancedMesh() {
        const geometry = new THREE.PlaneGeometry(params.imageWidth, params.imageHeight)
        const count = params.rows * params.columns

        // Create materials for different textures
        const materials = []
        const videoElements = []

        if (isMobile) {
          // For mobile, create materials for each image
          imgs.forEach((imgData) => {
            const texture = createImageTexture(imgData.src)
            materials.push(
              new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
              })
            )
          })
        } else {
          // For desktop, create materials for each video
          vids.forEach((videoData) => {
            const video = createVideoElement(videoData.src)
            const videoTexture = new THREE.VideoTexture(video)
            videoTexture.minFilter = THREE.LinearFilter
            videoTexture.magFilter = THREE.LinearFilter
            videoTexture.colorSpace = THREE.SRGBColorSpace
            videoTexture.generateMipmaps = false // Disable mipmaps for VideoTexture performance
            videoTexture.anisotropy = 1 // Downsample for performance
            materials.push(
              new THREE.MeshBasicMaterial({
                map: videoTexture,
                side: THREE.DoubleSide,
              })
            )
            videoElements.push(video)
          })
        }

        // Create instanced meshes for each material
        const instancedMeshes = materials.map((material) => {
          const instancedMesh = new THREE.InstancedMesh(geometry, material, count)
          instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
          return instancedMesh
        })

        return { instancedMeshes, videoElements }
      }

      function updateGallery() {
        // Clear existing meshes
        if (sceneRef.current.instancedMeshes) {
          sceneRef.current.instancedMeshes.forEach((mesh) => {
            scene.remove(mesh)
            mesh.geometry.dispose()
            mesh.material.dispose()
          })
        }

        if (sceneRef.current.videoElements) {
          sceneRef.current.videoElements.forEach((video) => {
            video.pause()
            video.src = ''
          })
        }

        // Create new instanced meshes
        const { instancedMeshes, videoElements } = createInstancedMesh()
        sceneRef.current.instancedMeshes = instancedMeshes
        sceneRef.current.videoElements = videoElements

        // Create plane data
        const planeData = []
        for (let row = 0; row < params.rows; row++) {
          for (let col = 0; col < params.columns; col++) {
            planeData.push(createVideoPlane(row, col))
          }
        }
        sceneRef.current.planeData = planeData

        // Set up instances and initialize GSAP animations
        const matrix = new THREE.Matrix4()
        planeData.forEach((data, index) => {
          const materialIndex = isMobile
            ? imgs.findIndex((img) => img.src === data.imgSrc)
            : vids.findIndex((vid) => vid.src === data.videoSrc)

          const meshIndex = materialIndex % instancedMeshes.length
          const instancedMesh = instancedMeshes[meshIndex]

          // Set initial position with intro effects
          const initialPosition = {
            x: data.position.x,
            y: data.position.y,
            z: data.position.z + data.introZOffset,
          }

          const initialRotation = {
            x: data.rotation.x + data.introRotation.x,
            y: data.rotation.y + data.introRotation.y,
            z: data.rotation.z + data.introRotation.z,
          }

          matrix.setPosition(initialPosition.x, initialPosition.y, initialPosition.z)
          matrix.makeRotationFromEuler(new THREE.Euler(initialRotation.x, initialRotation.y, initialRotation.z))
          instancedMesh.setMatrixAt(index, matrix)

          // Initialize GSAP targets
          data.gsapTargets.position = { ...initialPosition }
          data.gsapTargets.rotation = { ...initialRotation }
          data.gsapTargets.scale = { x: 0.3, y: 0.3, z: 1 }

          // Animate to final position with stagger
          gsap.to(data.gsapTargets.position, {
            x: data.position.x,
            y: data.position.y,
            z: data.position.z,
            duration: 1.2,
            delay: data.introOffset,
            ease: 'power3.out',
            onUpdate: () => {
              const currentMatrix = new THREE.Matrix4()
              currentMatrix.setPosition(data.gsapTargets.position.x, data.gsapTargets.position.y, data.gsapTargets.position.z)
              currentMatrix.makeRotationFromEuler(
                new THREE.Euler(data.gsapTargets.rotation.x, data.gsapTargets.rotation.y, data.gsapTargets.rotation.z)
              )
              currentMatrix.scale(new THREE.Vector3(data.gsapTargets.scale.x, data.gsapTargets.scale.y, data.gsapTargets.scale.z))
              instancedMesh.setMatrixAt(index, currentMatrix)
              instancedMesh.instanceMatrix.needsUpdate = true
            },
          })

          gsap.to(data.gsapTargets.rotation, {
            x: data.rotation.x,
            y: data.rotation.y,
            z: data.rotation.z,
            duration: 1.2,
            delay: data.introOffset,
            ease: 'power3.out',
          })

          gsap.to(data.gsapTargets.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.2,
            delay: data.introOffset,
            ease: 'power3.out',
          })

          scene.add(instancedMesh)
        })
      }

      handleMouseMove = (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
        mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2)

        headerRefRotationX = -mouseY * 10
        headerRefRotationY = -mouseX * 10
        headerRefTranslateZ = Math.abs(mouseX * mouseY) * 50
      }

      handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        composer.setSize(window.innerWidth, window.innerHeight)
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

        // Update cinematic intro progress
        const elapsed = time - introStartTime
        introProgress = Math.min(elapsed / introDuration, 1.0)

        // Easing function for smooth intro (ease-out cubic)
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
        const easedProgress = easeOutCubic(introProgress)

        const matrix = new THREE.Matrix4()
        const position = new THREE.Vector3()
        const rotation = new THREE.Euler()
        const quaternion = new THREE.Quaternion()
        const scale = new THREE.Vector3(1, 1, 1)

        sceneRef.current.planeData.forEach((data, index) => {
          const {
            basePosition,
            baseRotation,
            parallaxFactor,
            randomOffset,
            rotationModifier,
            phaseOffset,
            introOffset,
            introRotation,
            introZOffset,
          } = data

          // Calculate individual intro progress with stagger
          const individualProgress = Math.max(0, Math.min((introProgress - introOffset) / 0.5, 1.0))
          const individualEased = easeOutCubic(individualProgress)

          const mouseDistance = Math.sqrt(targetX * targetX + targetY * targetY)
          const parallaxX = targetX * parallaxFactor * 3 * randomOffset.x
          const parallaxY = targetY * parallaxFactor * 3 * randomOffset.y
          const oscillation = Math.sin(time + phaseOffset) * mouseDistance * 0.1

          // Base position with parallax and oscillation
          position.x = basePosition.x + parallaxX + oscillation * randomOffset.x
          position.y = basePosition.y + parallaxY + oscillation * randomOffset.y
          position.z = basePosition.z + oscillation * randomOffset.z * parallaxFactor

          // Apply intro Z-lift animation
          const zLift = introZOffset * (1 - individualEased)
          position.z += zLift

          // Base rotation with mouse interaction
          rotation.x = baseRotation.x + targetY * rotationModifier.x * mouseDistance + oscillation * rotationModifier.x * 0.2
          rotation.y = baseRotation.y + targetX * rotationModifier.y * mouseDistance + oscillation * rotationModifier.y * 0.2
          rotation.z = baseRotation.z + targetX * targetY * rotationModifier.z * 2 + oscillation * rotationModifier.z * 0.3

          // Apply intro rotation animation
          rotation.x += introRotation.x * (1 - individualEased)
          rotation.y += introRotation.y * (1 - individualEased)
          rotation.z += introRotation.z * (1 - individualEased)

          // Apply intro opacity (through scale for performance)
          const opacityScale = 0.3 + 0.7 * individualEased
          scale.set(opacityScale, opacityScale, 1)

          quaternion.setFromEuler(rotation)
          matrix.compose(position, quaternion, scale)

          // Update the appropriate instanced mesh
          const materialIndex = isMobile
            ? imgs.findIndex((img) => img.src === data.imgSrc)
            : vids.findIndex((vid) => vid.src === data.videoSrc)

          const meshIndex = materialIndex % sceneRef.current.instancedMeshes.length
          const instancedMesh = sceneRef.current.instancedMeshes[meshIndex]
          instancedMesh.setMatrixAt(index, matrix)
        })

        // Update all instanced meshes
        sceneRef.current.instancedMeshes.forEach((mesh) => {
          mesh.instanceMatrix.needsUpdate = true
        })

        camera.lookAt(lookAtTarget)
        composer.render()
      }

      // Event listeners
      document.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', handleResize)

      // Initialize gallery and start animation
      preloadVideos()
      updateGallery()
      animate()
    }, 350) // 350ms delay for deferred loading

    // Cleanup
    return () => {
      clearTimeout(initTimer) // Clear the timeout if component unmounts

      // Only cleanup if scene was initialized
      if (!sceneRef.current) return

      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (sceneRef.current.instancedMeshes) {
        sceneRef.current.instancedMeshes.forEach((mesh) => {
          scene.remove(mesh)
          mesh.geometry.dispose()
          mesh.material.dispose()
        })
      }

      if (sceneRef.current.videoElements) {
        sceneRef.current.videoElements.forEach((video) => {
          video.pause()
          video.src = ''
        })
      }

      renderer.dispose()
      composer.dispose()
    }
  })

  return (
    <section className="relative w-screen h-[400vh] overflow-hidden text-text">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full"></canvas>

      <div ref={headerRef} className="h-full absolute top-1/2 left-1/2 transform-3d text-center z-50">
        <BioText />
      </div>
    </section>
  )
}
