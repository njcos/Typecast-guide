import { useRef, type ReactNode } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap'

export function Section({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.from(ref.current!.querySelectorAll('[data-reveal]'), {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current!, start: 'top 75%' },
    })
  }, { scope: ref })
  return (
    <section ref={ref} id={id} className="scroll-mt-24 mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      {children}
    </section>
  )
}
