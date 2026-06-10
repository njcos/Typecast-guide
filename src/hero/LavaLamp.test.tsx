import { render } from '@testing-library/react'
import { LavaLamp } from './LavaLamp'

test('renders the configured number of blobs', () => {
  const { container } = render(<LavaLamp count={5} />)
  expect(container.querySelectorAll('.blob').length).toBe(5)
})
