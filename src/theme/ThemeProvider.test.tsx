import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeProvider'

function Probe() {
  const { theme, toggle } = useTheme()
  return <button onClick={toggle}>{theme}</button>
}

beforeEach(() => { localStorage.clear(); document.documentElement.classList.remove('dark') })

test('defaults to light and toggles to dark, persisting + setting html.dark', async () => {
  render(<ThemeProvider><Probe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('light')
  await act(async () => { await userEvent.click(screen.getByRole('button')) })
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('tc-theme')).toBe('dark')
})

test('reads persisted dark on mount', () => {
  localStorage.setItem('tc-theme', 'dark')
  render(<ThemeProvider><Probe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
})
