import { useGSAP, gsap, prefersReducedMotion } from './gsap'

export function usePinnedWalkthrough(id: string) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const el = document.getElementById(id)
    if (!el) return
    const steps = el.querySelectorAll<HTMLElement>('[data-step]')
    if (steps.length === 0) return
    gsap.set(steps, { opacity: 0.4 })
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top top', end: `+=${steps.length * 350}`, pin: true, scrub: 0.5 },
    })
    steps.forEach((s) => {
      tl.to(s, { opacity: 1, duration: 1 }).to(s, { opacity: 0.4, duration: 1 })
    })
  }, [])
}
