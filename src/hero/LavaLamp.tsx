import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap'

// Deterministic pseudo-random in [0,1) from a seed, so shapes are stable across renders.
function rng(seed: number) {
  let s = (seed * 2654435761) & 0x7fffffff
  return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
}

// An asymmetric "blobby" border-radius: 8 values spread the corners so the shape
// reads as an organic flowing form rather than a perfect circle.
function organicRadius(rand: () => number) {
  const v = () => Math.round(28 + rand() * 52) // 28%–80%
  return `${v()}% ${v()}% ${v()}% ${v()}% / ${v()}% ${v()}% ${v()}% ${v()}%`
}

export function LavaLamp({ count = 6 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const blobs = Array.from({ length: count }, (_, i) => {
    const rand = rng(i + 1)
    const size = 240 + (i % 4) * 95 + Math.round(rand() * 70) // ~240–525px
    return {
      size,
      left: (i * 37) % 90,
      top: (i * 53) % 80,
      radius: organicRadius(rand),
      key: i,
    }
  })
  useGSAP(() => {
    if (prefersReducedMotion()) return
    // Animate transforms only (drift, scale, slow rotation) — these are GPU-composited,
    // so the gooey filter doesn't repaint per frame. The organic silhouette is baked in
    // statically via border-radius and never animated, which keeps the motion smooth.
    // repeatRefresh re-rolls every random() target each cycle, so the drift wanders
    // instead of looping the same path.
    ref.current!.querySelectorAll<HTMLElement>('.blob').forEach((el, i) => {
      gsap.to(el, {
        x: 'random(-140, 140)', y: 'random(-160, 120)',
        scale: 'random(0.85, 1.35)', rotate: 'random(-28, 28)',
        duration: 'random(7, 13)', repeat: -1, yoyo: true, repeatRefresh: true,
        ease: 'sine.inOut', delay: i * 0.5, force3D: true,
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
          style={{ width: b.size, height: b.size, left: `${b.left}%`, top: `${b.top}%`, borderRadius: b.radius, opacity: 0.7 }} />
      ))}
    </div>
  )
}
