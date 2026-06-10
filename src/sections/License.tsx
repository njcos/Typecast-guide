import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { KeyValueTable } from '../components/KeyValueTable'

export function License() {
  return (
    <Section id="license">
      <SectionHeader kicker="CHAPTER 09" title="License states." />
      <p className="lede">
        Three things can happen with your license. Most of the time you'll
        never see anything beyond a fresh "Active" line on the home screen.
        The other two are here so you know what they mean when they appear.
      </p>

      <div className="cols">
        <div className="col no-break">
          <h3>Grace banner</h3>
          <p>
            When the panel can't reach the license server but you still have
            days of grace remaining, a yellow banner appears at the bottom edge
            of the panel. You can keep working — the count tells you how long
            until lockout.
          </p>
          <img className="panel-shot" src="assets/screencaps/License Panel Problem.png" alt="license problem" />
        </div>

        <div className="col no-break">
          <h3>Lockout screen</h3>
          <p>
            When grace runs out — or the key is revoked or unknown — the
            panel replaces its entire content with a lockout card. Re-enter
            a key, ask for a Re-check, or use a different key.
          </p>
          <img className="panel-shot" src="assets/screencaps/Licenese Panel Enter License.png" alt="enter license" />
        </div>
      </div>

      <h3 style={{ marginTop: '14pt' }}>What each status line means</h3>
      <KeyValueTable>
        <tr><th>Active · verified N hours ago</th><td>Everything's fine. The panel re-checks in the background every 6 days.</td></tr>
        <tr><th>Couldn't verify · N days to fix</th><td>Network failure, or the server is down. You have a grace window — keep working but reconnect when you can.</td></tr>
        <tr><th>Revoked · N days to fix</th><td>An administrator has explicitly removed your key. Contact them.</td></tr>
        <tr><th>Unknown key · N days to fix</th><td>The key on this machine isn't in the records. Likely re-issued; enter the new one.</td></tr>
        <tr><th>Not yet verified</th><td>Brand-new install. The first <strong>Save</strong> will run an immediate check.</td></tr>
      </KeyValueTable>
    </Section>
  )
}
