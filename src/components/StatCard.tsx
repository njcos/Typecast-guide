import type { ReactNode } from 'react'
export function StatCard({ children }: { children: ReactNode }) {
  return <div className="statcard" data-reveal>{children}</div>
}
