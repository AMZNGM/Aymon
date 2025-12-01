import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Draggable from 'gsap/Draggable'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable)

  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
    preventOverlaps: true,
    fastScrollEnd: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  })
}

export { gsap, ScrollTrigger, Draggable }
