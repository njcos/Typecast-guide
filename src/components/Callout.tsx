import type { ReactNode } from 'react'
export function Callout({ variant = 'tip', children }: { variant?: 'tip' | 'warn'; children: ReactNode }) {
  return <div className={variant} data-reveal>{children}</div>
}
