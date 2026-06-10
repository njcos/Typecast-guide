export function DemoSlot({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="demo my-6" data-reveal>
      <img src={`${import.meta.env.BASE_URL}${src}`} alt={caption ?? ''} loading="lazy" className="w-full rounded-lg border border-hairline" />
      {caption && <figcaption className="mt-2 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  )
}
