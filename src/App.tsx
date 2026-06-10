import { ThemeProvider } from './theme/ThemeProvider'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './hero/Hero'
import { SvgSprite } from './components/SvgSprite'
import { Overview } from './sections/Overview'
import { PanelAnatomy } from './sections/PanelAnatomy'
import { Home } from './sections/Home'
import { Text } from './sections/Text'
import { Tagging } from './sections/Tagging'
import { Sheets } from './sections/Sheets'
import { Dupes } from './sections/Dupes'
import { DupesAll } from './sections/DupesAll'
import { Render } from './sections/Render'
import { Cleanup } from './sections/Cleanup'
import { LanguageSafety } from './sections/LanguageSafety'
import { Naming } from './sections/Naming'

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
        <Tagging />
        <Sheets />
        <Dupes />
        <DupesAll />
        <Render />
        <Cleanup />
        <LanguageSafety />
        <Naming />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
