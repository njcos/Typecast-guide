import type { ReactNode } from 'react'
export function StepList({ children }: { children: ReactNode }) {
  return <ol className="steps" data-reveal>{children}</ol>
}
