export function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="mb-8">
      <div className="section-num text-dept" data-reveal>{kicker}</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-black uppercase tracking-[0.02em] text-ink" data-reveal>{title}</h2>
    </header>
  )
}
