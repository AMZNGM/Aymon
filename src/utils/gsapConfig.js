import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true,
  preventOverlaps: true,
  fastScrollEnd: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
})

export { gsap, ScrollTrigger }
