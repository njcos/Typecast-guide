import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { KeyValueTable } from '../components/KeyValueTable'

export function Glossary() {
  return (
    <Section id="glossary">
      <SectionHeader kicker="CHAPTER 10" title="Glossary & tips." />
      <p className="lede">
        A short reference. Keep this page near your monitor for the first
        week or two.
      </p>

      <div className="cols">
        <div className="col">
          <h3>Vocabulary</h3>
          <KeyValueTable>
            <tr>
              <th>Edit Comp</th>
              <td>The single comp Typecast builds for you out of every tagged layer. It's the one place you edit, translate, and validate from.</td>
            </tr>
            <tr>
              <th>Master text comp</th>
              <td>A pre-comp Typecast creates per text layer, named so it contains <span className="mono">Change_Text_Here</span>. The master comp is what every language variant references.</td>
            </tr>
            <tr>
              <th>Language folder</th>
              <td>A duplicate of your "master" project folder, made by the Dupes tab, with translations applied. One per language.</td>
            </tr>
            <tr>
              <th>Tag</th>
              <td>Marking a layer as one that should appear in the Edit Comp. Untagged layers are ignored by every downstream step.</td>
            </tr>
            <tr>
              <th>NoIP</th>
              <td>The vendor-handoff action (formerly Strip Typecast / Bake). Bakes every Source Text expression referencing a master comp, deletes those master comps, and prunes empty parent folders. One Cmd+Z reverts everything. Lives on the Cleanup page.</td>
            </tr>
            <tr>
              <th>Grace window</th>
              <td>Seven days during which the panel continues to work even though it can't reach the license server.</td>
            </tr>
          </KeyValueTable>
        </div>

        <div className="col">
          <h3>Good habits</h3>
          <ul>
            <li><strong>Name your text layers.</strong> The layer name becomes the <span className="mono">ID</span> column in your CSV. Good IDs (<span className="mono">HERO_HEADLINE</span>, <span className="mono">CTA_PRIMARY</span>) make translator handoffs painless.</li>
            <li><strong>Keep one "master" folder.</strong> Your English (or whatever your source language is) should live in one folder named clearly. The Dupes tab will duplicate from it.</li>
            <li><strong>Re-check before going offline.</strong> One click on the home page guarantees you've got a fresh 7-day grace window before you fly.</li>
            <li><strong>NoIP last.</strong> Render everything first, then run NoIP. Once stripped, the Edit Comp workflow is gone and can't be restored without rebuilding from scratch.</li>
          </ul>

          <h3>Getting unstuck</h3>
          <Callout variant="tip">
            <strong>Position error after dragging</strong>
            Rebuild the Edit Comp (<span className="mono">+</span> on the TEXT tab)
            and the link is restored.
          </Callout>
          <Callout variant="tip">
            <strong>Translations not appearing</strong>
            Check the layer's <span className="mono">ID</span> matches a row in your sheet
            <em>exactly</em>. IDs are case-sensitive and whitespace-sensitive.
          </Callout>
          <Callout variant="tip">
            <strong>Font missing on a language</strong>
            Check <span className="mono">Platform Fonts.csv</span> — the
            language probably needs a fallback added.
          </Callout>
        </div>
      </div>

      <div className="divider"></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24pt' }}>
        <div>
          <h3>Need help?</h3>
          <p className="small" style={{ color: 'var(--ink-soft)' }}>
            Ask in the DEPT motiongraphics_solutions Slack channel, <br />
            or reach out to your manager. Include what is going wrong
            <br />and any alerts you may have received.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <svg style={{ width: '30pt', height: '30pt', color: 'var(--dept-orange)' }}><use href="#dept-mark" /></svg>
          <div style={{ fontWeight: 900, fontSize: '8pt', letterSpacing: '0.10em', marginTop: '2pt' }}>DEPT / TYPECAST</div>
          <div style={{ fontSize: '7pt', color: 'var(--ink-mute)', letterSpacing: '0.08em', marginTop: '2pt' }}>v1.3 · INTERNAL USE</div>
        </div>
      </div>
    </Section>
  )
}
