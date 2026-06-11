import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap'
import { LavaLamp } from './LavaLamp'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    // Rack focus: the word racks into focus from oversized + blurred, settling smoothly.
    gsap.fromTo(ref.current!.querySelector('h1'),
      { scale: 1.14, autoAlpha: 0, filter: 'blur(30px)' },
      { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' })
  }, { scope: ref })
  return (
    <header ref={ref} id="top" className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-paper-bg px-6 text-left">
      <svg width="0" height="0" className="absolute"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter></svg>
      <LavaLamp />
      <div className="relative z-10 lg:pl-60">
        <h1 className="text-[13vw] font-black uppercase tracking-[-.01em] text-ink">Typecast</h1>
      </div>
    </header>
  )
}
