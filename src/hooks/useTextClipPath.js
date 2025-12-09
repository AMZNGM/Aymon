export default function useTextClipPath(delay = 0, once = false) {
  const transition = {
    duration: 0.75,
    ease: 'easeInOut',
    delay: delay,
  }

  return {
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
    transition: { ...transition },
    viewport: { once: once },
  }
}
