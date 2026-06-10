import { ThemeProvider } from './theme/ThemeProvider'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './hero/Hero'

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Hero />
      <main className="lg:pl-60">
        {/* content sections added in Tasks 12–15 */}
      </main>
      <Footer />
    </ThemeProvider>
  )
}
