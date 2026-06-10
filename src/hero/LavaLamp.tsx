import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap'

export function LavaLamp({ count = 6 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const blobs = Array.from({ length: count }, (_, i) => {
    const size = 180 + (i % 4) * 70
    return { size, left: (i * 37) % 90, top: (i * 53) % 80, key: i }
  })
  useGSAP(() => {
    if (prefersReducedMotion()) return
    ref.current!.querySelectorAll<HTMLElement>('.blob').forEach((el, i) => {
      gsap.to(el, {
        x: `+=${60 + i * 18}`, y: `+=${-80 - i * 22}`, scale: 1 + (i % 3) * 0.15,
        duration: 8 + i * 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.6,
      })
    })
    gsap.to(ref.current, {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, { scope: ref })
  return (
    <div ref={ref} className="lava" aria-hidden="true">
      {blobs.map(b => (
        <span key={b.key} className="blob"
          style={{ width: b.size, height: b.size, left: `${b.left}%`, top: `${b.top}%`, opacity: 0.7 }} />
      ))}
    </div>
  )
}
