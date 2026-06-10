import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'

export function PanelAnatomy() {
  return (
    <Section id="panel-anatomy">
      <SectionHeader kicker="CHAPTER 02" title="The panel, top to bottom." />
      <p className="lede">
        Every screen shares the same chrome. Learn it once and you know where to
        find anything in the panel.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <img src="assets/screencaps/Home Page.png" alt="homepage" />
        </div>

        <div className="col">
          <h3>The four zones</h3>
          <div className="feature-list">
            <div className="feature" data-step>
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x={3} y={3} width={18} height={6} rx={1}/></svg></div>
              <div className="meta">
                <div className="name">01 · Brand Header</div>
                <div className="body">The DEPT asterisk on the left is the <em>home button</em> — click it from any tab to return to the about screen. The animated word right of <span className="mono">DEPT/</span> tells you which page you're on.</div>
              </div>
            </div>
            <div className="feature" data-step>
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#ic-text"/></svg></div>
              <div className="meta">
                <div className="name">02 · Nav Rail</div>
                <div className="body">Five icons + labels: TEXT, SHEETS, DUPES, RENDER, CLEANUP. The active tab has the DEPT-orange underline. The Typecast home screen is reached via the brand-mark button, not the rail.</div>
              </div>
            </div>
            <div className="feature" data-step>
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x={3} y={4} width={18} height={16} rx={2}/></svg></div>
              <div className="meta">
                <div className="name">03 · Page Content</div>
                <div className="body">Buttons, lists, and pickers for the current page. The panel is built for narrow widths — labels hide and icons centre when you drag the panel below ~200&nbsp;px.</div>
              </div>
            </div>
            <div className="feature" data-step>
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 17h18" strokeLinecap="round"/><path d="M5 13h6" strokeLinecap="round"/></svg></div>
              <div className="meta">
                <div className="name">04 · Toasts &amp; Banners</div>
                <div className="body">Confirmations, warnings, and the license <em>grace banner</em> appear at the bottom edge. They don't block input — keep working while they're shown.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
