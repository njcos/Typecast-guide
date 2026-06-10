// The guide's demo slots are intentional placeholders (no media shipped yet).
// Renders the source-faithful dark frame with the intended asset label; when a
// real asset exists under public/ (src resolves to a file), it shows the media.
export function DemoSlot({ src, caption, media = false }: { src: string; caption?: string; media?: boolean }) {
  const label = src.replace(/^demos\//, '')
  return (
    <figure className="demo my-6" data-reveal>
      <div className="frame">
        {media
          ? <img src={`${import.meta.env.BASE_URL}${src}`} alt={caption ?? ''} loading="lazy" />
          : <div className="placeholder">▸ GIF — {label}</div>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
