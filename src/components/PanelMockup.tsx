import type { ReactNode } from 'react'
export function PanelMockup({ variant = 'panel', children }: { variant?: 'panel' | 'dialog'; children: ReactNode }) {
  return <div className={variant === 'dialog' ? 'cep-dialog' : 'cep-panel'} data-reveal>{children}</div>
}
