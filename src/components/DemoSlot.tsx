import { useEffect, useRef } from 'react'

// The guide's demo slots are intentional placeholders until a real asset is
// shipped. With media, a video src (webm/mp4/mov) renders a <video>; anything
// else renders an <img>. Otherwise the source-faithful dark frame shows the
// intended asset label and its target export size.
//
// Videos are lazy: only the clip in (or near) the viewport loads and plays.
// Eagerly autoplaying every slot makes ~10 large webms contend for bandwidth on
// page load, so most never finish buffering — they stall at a blank frame. An
// IntersectionObserver plays the visible one and pauses the rest; preload="none"
// keeps offscreen clips from downloading at all until you scroll to them.
//
// w/h are the frame's max DISPLAY size in CSS px (16:10). The frame is fluid but
// never exceeds these. Author GIFs at 2× for crisp HiDPI playback — shown below
// the label as the recommended export size. Full-width slots are 976×610; the
// only narrower slot is the column-nested one in Dupes (382×239).
export function DemoSlot({ src, caption, media = false, w = 976, h = 610 }: { src: string; caption?: string; media?: boolean; w?: number; h?: number }) {
  const label = src.replace(/^demos\//, '')
  const url = `${import.meta.env.BASE_URL}${src}`
  const isVideo = /\.(webm|mp4|mov)$/i.test(src)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { rootMargin: '300px 0px', threshold: 0.01 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <figure className="demo my-6" data-reveal>
      <div className="frame">
        {media
          ? isVideo
            ? <video ref={videoRef} src={url} loop muted playsInline preload="none" aria-label={caption ?? ''} />
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
