import type { ReactNode } from 'react'
export function KeyValueTable({ children }: { children: ReactNode }) {
  return <table className="kv" data-reveal><tbody>{children}</tbody></table>
}
