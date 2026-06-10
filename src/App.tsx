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
import { CrossComp } from './sections/CrossComp'
import { License } from './sections/License'
import { Troubleshooting } from './sections/Troubleshooting'
import { Glossary } from './sections/Glossary'

export default function App() {
  return (
    <ThemeProvider>
      <a href="#overview" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
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
        <CrossComp />
        <License />
        <Troubleshooting />
        <Glossary />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
