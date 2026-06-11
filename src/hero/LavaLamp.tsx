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
    const radius = organicRadius(rand)
    // Per-blob timing so they drift independently rather than in a uniform cascade.
    const dur = 11 + rand() * 10  // 11–21s, base period (distinct per blob)
    const offset = rand()         // 0–1 phase — start each blob mid-cycle, not at rest
    const ax = 80 + rand() * 80   // x travel amplitude 80–160px (guarantees visible motion)
    const ay = 80 + rand() * 90   // y travel amplitude 80–170px
    return {
      size,
      left: (i * 37) % 90,
      top: (i * 53) % 80,
      radius,
      dur,
      offset,
      ax,
      ay,
      key: i,
    }
  })
  useGSAP(() => {
    if (prefersReducedMotion()) return
    // Transform-only motion (GPU-composited, no per-frame filter repaint). Each axis runs
    // on its OWN period, so the blob is always moving in some axis and never eases to a full
    // stop at a shared turnaround — a smooth, continuous, organic float. .progress() seeds
    // each oscillation mid-cycle so nothing sits frozen on load.
    ref.current!.querySelectorAll<HTMLElement>('.blob').forEach((el) => {
      const dur = Number(el.dataset.dur)
      const offset = Number(el.dataset.offset)
      const ax = Number(el.dataset.ax)
      const ay = Number(el.dataset.ay)
      gsap.fromTo(el, { x: -ax }, { x: ax, duration: dur, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true }).progress(offset)
      gsap.fromTo(el, { y: -ay }, { y: ay, duration: dur * 1.45, repeat: -1, yoyo: true, ease: 'sine.inOut', force3D: true }).progress((offset + 0.37) % 1)
      gsap.fromTo(el, { scale: 0.9 }, { scale: 1.3, duration: dur * 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' }).progress((offset + 0.6) % 1)
      gsap.fromTo(el, { rotate: -24 }, { rotate: 24, duration: dur * 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' }).progress((offset + 0.5) % 1)
    })
    gsap.to(ref.current, {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, { scope: ref })
  return (
    <div ref={ref} className="lava" aria-hidden="true">
      {blobs.map(b => (
        <span key={b.key} className="blob" data-dur={b.dur} data-offset={b.offset} data-ax={b.ax} data-ay={b.ay}
          style={{ width: b.size, height: b.size, left: `${b.left}%`, top: `${b.top}%`, borderRadius: b.radius, opacity: 0.7 }} />
      ))}
    </div>
  )
}
