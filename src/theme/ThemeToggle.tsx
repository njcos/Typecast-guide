import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="grid h-8 w-8 place-items-center rounded-md border border-hairline text-ink hover:text-dept transition-colors"
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}
