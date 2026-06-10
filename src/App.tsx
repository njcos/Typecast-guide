import { ThemeProvider } from './theme/ThemeProvider'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './hero/Hero'
import { SvgSprite } from './components/SvgSprite'
import { Overview } from './sections/Overview'
import { PanelAnatomy } from './sections/PanelAnatomy'
import { Home } from './sections/Home'
import { Text } from './sections/Text'

export default function App() {
  return (
    <ThemeProvider>
      <SvgSprite />
      <Nav />
      <Hero />
      <main className="lg:pl-60">
        <Overview />
        <PanelAnatomy />
        <Home />
        <Text />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
