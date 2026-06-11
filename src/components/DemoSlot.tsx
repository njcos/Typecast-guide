// The guide's demo slots are intentional placeholders (no media shipped yet).
// Renders the source-faithful dark frame with the intended asset label; when a
// real asset exists under public/ (src resolves to a file), it shows the media.
//
// w/h are the frame's max DISPLAY size in CSS px (16:10). The frame is fluid but
// never exceeds these. Author GIFs at 2× for crisp HiDPI playback — shown below
// the label as the recommended export size. Full-width slots are 976×610; the
// only narrower slot is the column-nested one in Dupes (382×239).
export function DemoSlot({ src, caption, media = false, w = 976, h = 610 }: { src: string; caption?: string; media?: boolean; w?: number; h?: number }) {
  const label = src.replace(/^demos\//, '')
  const url = `${import.meta.env.BASE_URL}${src}`
  const isVideo = /\.(webm|mp4|mov)$/i.test(src)
  return (
    <figure className="demo my-6" data-reveal>
      <div className="frame">
        {media
          ? isVideo
            ? <video src={url} autoPlay loop muted playsInline aria-label={caption ?? ''} />
            : <img src={url} alt={caption ?? ''} loading="lazy" />
          : <div className="placeholder">
              ▸ GIF — {label}
              <span className="dims">make @ {w * 2} × {h * 2} px · displays {w} × {h}</span>
            </div>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
