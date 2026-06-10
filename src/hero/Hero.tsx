import { useRef } from 'react'
import { useGSAP, gsap, SplitText, prefersReducedMotion } from '../lib/gsap'
import { LavaLamp } from './LavaLamp'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const split = new SplitText(ref.current!.querySelector('h1'), { type: 'chars,words' })
    gsap.from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.02, duration: 0.7, ease: 'power3.out' })
    gsap.from(ref.current!.querySelector('[data-lede]'), { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
  }, { scope: ref })
  return (
    <header ref={ref} id="top" className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-paper-bg px-6 text-left">
      <svg width="0" height="0" className="absolute"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter></svg>
      <LavaLamp />
      <div className="relative z-10 lg:pl-60">
        {/* <div className="section-num text-dept">DEPT · TYPECAST</div> */}
        <h1 className="text-[13vw] font-black uppercase tracking-[-.01em] text-ink">Typecast</h1>
        {/* <p data-lede className="lede text-3xl max-w-xl text-ink-soft">The Hub.</p> */}
      </div>
    </header>
  )
}
