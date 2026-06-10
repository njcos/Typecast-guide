import { useState } from 'react'
import { SECTIONS } from '../lib/sections'
import { useScrollSpy } from '../lib/useScrollSpy'
import { ThemeToggle } from '../theme/ThemeToggle'
import { useGSAP, gsap } from '../lib/gsap'

export function Nav() {
  const active = useScrollSpy(['top', ...SECTIONS.map(s => s.id)])
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    gsap.to('#tc-progress', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true },
    })
  }, [])

  return (
    <>
      {/* desktop sidebar */}
      <nav className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-hairline bg-paper-bg/80 backdrop-blur px-5 py-6 lg:flex">
        <a href="#top" className="flex items-center gap-1.5 text-sm font-black uppercase tracking-[0.1em] text-ink">
          <svg className="h-3.5 w-3.5 text-dept" aria-hidden="true"><use href="#dept-mark" /></svg>
          Typecast
        </a>
        <ul className="mt-6 flex-1 space-y-1 overflow-y-auto text-sm">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`}
                 className={`flex gap-2 rounded px-2 py-1 transition-colors ${active === s.id ? 'text-dept' : 'text-ink-soft hover:text-ink'}`}>
                <span className="w-8 shrink-0 text-ink-mute">{s.label}</span>{s.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-4"><ThemeToggle /></div>
      </nav>

      {/* mobile top bar + drawer */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-hairline bg-paper-bg/90 px-4 py-3 backdrop-blur lg:hidden">
        <a href="#top" className="flex items-center gap-1.5 text-sm font-black uppercase tracking-[0.1em] text-ink">
          <svg className="h-3.5 w-3.5 text-dept" aria-hidden="true"><use href="#dept-mark" /></svg>
          Typecast
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button type="button" aria-label="Open navigation" onClick={() => setOpen(o => !o)} className="h-8 w-8 rounded-md border border-hairline text-ink">≡</button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-20 bg-paper-bg/95 pt-16 lg:hidden" onClick={() => setOpen(false)}>
          <ul className="space-y-1 px-6 text-base">
            {SECTIONS.map(s => (
              <li key={s.id}><a href={`#${s.id}`} className="block py-2 text-ink-soft">{s.title}</a></li>
            ))}
          </ul>
        </div>
      )}

      {/* scroll progress bar */}
      <div id="tc-progress" className="fixed left-0 top-0 z-40 h-0.5 w-full origin-left scale-x-0 bg-dept" />
    </>
  )
}
