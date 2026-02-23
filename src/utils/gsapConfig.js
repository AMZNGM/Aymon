import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Draggable from 'gsap/Draggable'
import SplitText from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable, SplitText)

  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
    preventOverlaps: true,
    fastScrollEnd: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  })
}

export { gsap, ScrollTrigger, Draggable, SplitText }
