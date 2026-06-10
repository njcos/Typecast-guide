import sprite from '../assets/sprite.svg?raw'

export function SvgSprite() {
  return <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: sprite }} />
}
