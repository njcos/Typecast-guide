import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'

export function Home() {
  return (
    <Section id="home">
      <SectionHeader kicker="CHAPTER 03" title="Home / Typecast." />
      <p className="lede">
        The landing screen. It's reached from any other tab by clicking the DEPT
        mark in the brand header. An expandable about card sits at the top; a
        license status bar along the bottom opens the full license settings in a
        dialog when clicked.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <img src="assets/screencaps/Home About Open.png" alt="home about" />

          <Callout variant="tip">
            <strong>Why the mask</strong>
            The key is never shown in full so screenshots, screen-shares, and
            Slack pastes don't leak it. The DEPT administrator can always look
            the key up server-side.
          </Callout>
        </div>

        <div className="col">
          <h3>What's here</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#dept-mark"/></svg></div>
              <div className="meta">
                <div className="name">About card</div>
                <div className="body">Collapsible. Click the <strong>ABOUT · TYPECAST</strong> toggle to expand or collapse the blurb. When open it shows a short description of what Typecast is and the current version number.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x={3} y={11} width={18} height={11} rx={2}/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
              <div className="meta">
                <div className="name">License status bar</div>
                <div className="body">A persistent bar along the bottom of the panel. Shows a coloured dot (green = active, red = problem, grey = no key), a state label, and a <strong>Manage</strong> affordance. Clicking it opens a dialog with the full license settings.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-refresh-cw"/></svg></div>
              <div className="meta">
                <div className="name">Re-check <em>(in license dialog)</em></div>
                <div className="body">Forces a verification right now. Use this if you've just been re-issued a key, or if you want to confirm you're connected before going offline.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-trash-2"/></svg></div>
              <div className="meta">
                <div className="name">Remove <em>(in license dialog)</em></div>
                <div className="body">Clears the saved key from this machine. The panel locks out immediately and prompts for a new key.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
