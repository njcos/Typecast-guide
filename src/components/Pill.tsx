import type { ReactNode } from 'react'
export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full border border-hairline px-2 py-0.5 text-xs text-ink-soft">{children}</span>
}
