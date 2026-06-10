import { pickActive } from './useScrollSpy'

test('returns the id of the topmost intersecting entry', () => {
  const entries = [
    { target: { id: 'a' }, isIntersecting: false, boundingClientRect: { top: -200 } },
    { target: { id: 'b' }, isIntersecting: true, boundingClientRect: { top: 40 } },
    { target: { id: 'c' }, isIntersecting: true, boundingClientRect: { top: 600 } },
  ] as unknown as IntersectionObserverEntry[]
  expect(pickActive(entries, 'a')).toBe('b')
})

test('keeps previous id when nothing intersects', () => {
  const entries = [
    { target: { id: 'a' }, isIntersecting: false, boundingClientRect: { top: -50 } },
  ] as unknown as IntersectionObserverEntry[]
  expect(pickActive(entries, 'a')).toBe('a')
})
