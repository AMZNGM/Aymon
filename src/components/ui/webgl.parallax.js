export async function startParallaxGallery({ canvas, headerEl, onReady = () => {} } = {}) {
  if (!canvas) {
    console.warn('No canvas provided to startParallaxGallery')
    return {}
  }

  const [{ default: THREE }, { EffectComposer }, { RenderPass }, { ShaderPass }, { BloomPass }] = await Promise.all([
    import('three').then((m) => ({ default: m })),
    import('three/examples/jsm/postprocessing/EffectComposer.js'),
    import('three/examples/jsm/postprocessing/RenderPass.js'),
    import('three/examples/jsm/postprocessing/ShaderPass.js'),
    import('three/examples/jsm/postprocessing/BloomPass.js'),
  ]).catch(async (err) => {
    const THREE = (await import('three')).default
    const EffectComposer = (await import('three/examples/jsm/postprocessing/EffectComposer.js')).EffectComposer
    const RenderPass = (await import('three/examples/jsm/postprocessing/RenderPass.js')).RenderPass
    const ShaderPass = (await import('three/examples/jsm/postprocessing/ShaderPass.js')).ShaderPass
    const BloomPass = (await import('three/examples/jsm/postprocessing/BloomPass.js')).BloomPass
    return [{ default: THREE }, { EffectComposer }, { RenderPass }, { ShaderPass }, { BloomPass }]
  })

  const cfg = {
    rows: Math.max(2, Math.floor(window.innerHeight / 200)),
    columns: Math.max(3, Math.floor(window.innerWidth / 320)),
    imageW: 7,
    imageH: 4.5,
    spacing: 9,
    depth: 8,
    pixelRatioCap: Math.min(window.devicePixelRatio || 1, 1.5),
    usePostProcessing: window.innerWidth > 1024,
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 40)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  })
  renderer.setPixelRatio(cfg.pixelRatioCap)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('#030303')

  let composer = null
  if (cfg.usePostProcessing) {
    composer = new EffectComposer(renderer)
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new BloomPass(0.9, 16, 1, 256)
    composer.addPass(bloom)
    const chromaShader = {
      uniforms: { tDiffuse: { value: null }, offset: { value: 0.001 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader:
        'uniform sampler2D tDiffuse; uniform float offset; varying vec2 vUv; void main(){ vec4 cr = texture2D(tDiffuse, vUv + vec2(offset,0.0)); vec4 cg = texture2D(tDiffuse, vUv); vec4 cb = texture2D(tDiffuse, vUv + vec2(-offset,0.0)); gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a); }',
    }
    const chromaPass = new ShaderPass(chromaShader)
    chromaPass.renderToScreen = true
    composer.addPass(chromaPass)
  }

  const total = Math.min(24, cfg.rows * cfg.columns)
  const geometry = new THREE.PlaneGeometry(cfg.imageW, cfg.imageH)

  const videoSrcs = [
    '/videos/randomVideos/eyes.mp4',
    '/videos/randomVideos/plastine.mp4',
    '/videos/randomVideos/feeling.mp4',
    '/videos/randomVideos/visualCard.mp4',
    '/videos/randomVideos/awarnessUrbnlanes.mp4',
  ]
  const videoElements = []
  const materials = []

  videoSrcs.forEach((src) => {
    const video = document.createElement('video')
    video.src = src
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.autoplay = true

    const playPromise = video.play()
    if (playPromise && playPromise.catch) playPromise.catch(() => {})

    videoElements.push(video)

    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.generateMipmaps = false
    videoTexture.colorSpace = THREE.SRGBColorSpace

    const mat = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.DoubleSide,
    })

    materials.push(mat)
  })

  const instancedMeshes = materials.map((mat) => {
    const mesh = new THREE.InstancedMesh(geometry, mat, total)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    return mesh
  })

  const planeData = []
  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / cfg.columns)
    const col = i % cfg.columns
    const x = (col - cfg.columns / 3) * cfg.spacing
    const y = (row - cfg.rows / 2) * cfg.spacing
    const z = (x * x) / (cfg.depth * 6)
    planeData.push({
      basePosition: new THREE.Vector3(x, y, z),
      baseRotation: new THREE.Euler(0, 0, 0),
      parallax: Math.random() * 0.6 + 0.6,
      phase: Math.random() * Math.PI * 2,
      materialIndex: Math.floor(Math.random() * materials.length),
      scale: 1,
    })
  }

  instancedMeshes.forEach((m) => scene.add(m))

  const mat4 = new THREE.Matrix4()
  planeData.forEach((d, i) => {
    mat4.compose(d.basePosition, new THREE.Quaternion(), new THREE.Vector3(0.6, 0.6, 1))
    const mesh = instancedMeshes[d.materialIndex]
    mesh.setMatrixAt(i, mat4)
  })
  instancedMeshes.forEach((m) => (m.instanceMatrix.needsUpdate = true))

  let mouseX = 0
  let mouseY = 0
  let targetX = 0
  let targetY = 0
  const lookAt = new THREE.Vector3(0, 0, 0)

  const onMove = (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
  }
  window.addEventListener('mousemove', onMove, { passive: true })

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (composer) composer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize, { passive: true })

  let rafId = null
  let running = true

  const animate = () => {
    if (!running) return
    rafId = requestAnimationFrame(animate)

    targetX += (mouseX - targetX) * 0.05
    targetY += (mouseY - targetY) * 0.05
    lookAt.x = targetX * 15
    lookAt.y = -targetY * 15
    camera.lookAt(lookAt)

    if (headerEl) {
      const rotX = -targetY * 5
      const rotY = -targetX * 5
      const translateZ = Math.abs(targetX * targetY) * 50
      headerEl.style.transform = `translate(0, 0) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZ}px)`
      headerEl.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
    }

    const time = performance.now() * 0.001
    const matrix = new THREE.Matrix4()
    const pos = new THREE.Vector3()
    const rot = new THREE.Euler()
    const scl = new THREE.Vector3()

    planeData.forEach((d, i) => {
      const oscill = Math.sin(time + d.phase) * 0.2
      pos.copy(d.basePosition)
      pos.x += targetX * d.parallax * 3 + oscill
      pos.y += -targetY * d.parallax * 2 + oscill * 0.5
      pos.z += oscill * d.parallax * 0.5

      rot.set(oscill * 0.1, targetX * 0.05, targetX * targetY * 0.02)
      const s = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(time + d.phase))
      scl.set(s, s, 1)

      matrix.compose(pos, new THREE.Quaternion().setFromEuler(rot), scl)
      const mesh = instancedMeshes[d.materialIndex]
      mesh.setMatrixAt(i, matrix)
    })
    instancedMeshes.forEach((m) => (m.instanceMatrix.needsUpdate = true))

    if (composer) composer.render()
    else renderer.render(scene, camera)
  }

  animate()

  const setVisible = (visible) => {
    running = visible
    if (!visible && rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    } else if (visible && !rafId) {
      animate()
    }
    videoElements.forEach((v) => {
      if (visible) {
        const p = v.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        try {
          v.pause()
        } catch (e) {}
      }
    })
  }

  onReady()

  const dispose = () => {
    running = false
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', onResize)
    instancedMeshes.forEach((m) => {
      if (m.geometry) m.geometry.dispose()
      if (m.material) {
        m.material.dispose()
      }
      try {
        scene.remove(m)
      } catch (e) {}
    })
    videoElements.forEach((v) => {
      try {
        v.pause()
        v.src = ''
      } catch (e) {}
    })
    if (composer && composer.dispose) composer.dispose()
    if (renderer && renderer.forceContextLoss) {
      renderer.forceContextLoss()
      try {
        renderer.domElement = null
      } catch (e) {}
    }
  }

  return {
    dispose,
    setVisible,
  }
}
