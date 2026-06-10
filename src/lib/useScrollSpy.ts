import { useEffect, useState } from 'react'

export function pickActive(entries: IntersectionObserverEntry[], prev: string): string {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
  return visible.length ? (visible[0].target as HTMLElement).id : prev
}

export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      entries => setActive(prev => pickActive(entries, prev)),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ids.join(',')])
  return active
}
