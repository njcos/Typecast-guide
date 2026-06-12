import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { KeyValueTable } from '../components/KeyValueTable'
import { StepList } from '../components/StepList'

export function Troubleshooting() {
  return (
    <Section id="troubleshooting">
      <SectionHeader kicker="HELP" title="Troubleshooting." />
      <p className="lede">Most problems have a one-step fix. This chapter collects the things motion designers get caught on most often — find your symptom, follow the fix, get back to work.</p>

      <div className="band">
        <div className="band-title">Quick reference</div>
        <KeyValueTable>
          <tr>
            <th>Symptom</th>
            <td><strong>What to do</strong></td>
          </tr>
          <tr>
            <th>A Language Mapping window appeared and nothing duplicated yet</th>
            <td>A column header wasn't recognised. Map it to the right language, or choose <em>Skip / not a language</em> for non-language columns, then confirm. Cancel leaves everything untouched.</td>
          </tr>
          <tr>
            <th>The Mapping window says "clashes on <span className="mono">CODE</span>"</th>
            <td>Two columns resolve to the same language code. Pick the one that should win and leave the other unmapped.</td>
          </tr>
          <tr>
            <th>A layer didn't translate / translated when it shouldn't have</th>
            <td>Check the layer name. Names starting with <span className="mono">_</span> (underscore) or <span className="mono">global</span> (any capitalisation) are intentionally skipped. Rename to include or exclude the layer.</td>
          </tr>
          <tr>
            <th>Per-character styling (e.g. one bold word) disappeared after duplication</th>
            <td>This is a known After Effects limitation — see the callout below. Re-apply the styling by hand on the affected language.</td>
          </tr>
          <tr>
            <th>A position expression shows an error after dragging a layer in the master comp</th>
            <td>Manually dragging a linked layer breaks its position expression. Re-run <em>Create / Update Text Comp</em> to restore it. Avoid hand-dragging linked layers.</td>
          </tr>
          <tr>
            <th>An invalid comp name is blocking a render</th>
            <td>Open the Invalid Comp Names window. Rename each flagged comp with the chip editor, or use <em>Skip Invalid</em> to drop them from this render, or <em>Include All</em> to proceed without renaming.</td>
          </tr>
        </KeyValueTable>
      </div>

      <h3>The details on the trickier ones</h3>

      <Callout variant="warn">
        <strong>Per-character styling is lost after duplication</strong>
        <p>When the tool replaces a layer's text programmatically, After Effects collapses any per-character style runs — for example, a sentence where one word is bold or in a different colour. This is an After Effects limitation, not a bug in the panel. The translation data contains the new text string but no record of where those style runs sat within the original, so they cannot be restored automatically.</p>
        <p>The practical workaround: re-apply the per-character styling by hand on the affected language version after the duplication is complete. The easier long-term approach is to keep mixed per-character styling out of layers that will be translated — use separate layers for words that need different treatment instead.</p>
      </Callout>

      <Callout variant="warn">
        <strong>Position expression broke after dragging a layer</strong>
        <p>Layers in the master / Edit text comp can carry position expressions that keep them aligned relative to one another. If you manually drag one of these linked layers in the After Effects timeline, After Effects can break the expression — you will see a red expression-error badge on the layer's Position property.</p>
        <p>The fix is straightforward: re-run <em>Create / Update Text Comp</em> from the panel. This rebuilds the comp and restores the expressions to a clean state. Going forward, make layout adjustments through the panel rather than by hand-dragging linked layers in the timeline.</p>
      </Callout>

      <Callout variant="tip">
        <strong>Use the underscore prefix to control which layers get translated</strong>
        <p>The scan that finds translatable layers deliberately skips two categories of name:</p>
        <StepList>
          <li>Any layer whose name starts with <span className="mono">_</span> (a single underscore character) is skipped entirely.</li>
          <li>Any layer whose name starts with <span className="mono">global</span> — in any capitalisation, e.g. <span className="mono">Global</span>, <span className="mono">GLOBAL</span> — is also skipped.</li>
        </StepList>
        <p>This gives you a quick, reversible way to exclude a layer from translation without deleting it. Add a leading underscore to exclude; remove it to include. Renaming a layer in After Effects is fully undoable, so it is safe to experiment.</p>
      </Callout>

      <div className="band dark">
        <div className="band-title">Still stuck?</div>
        <div className="split center">
          <div>
            <h4>Ask the team</h4>
            <p>Post in the DEPT Slack channel <span className="mono">#motiongraphics_solutions</span>. Include a screenshot of any error message or unexpected output — that context speeds things up considerably.</p>
          </div>
          <div>
            <h4>Ask your manager</h4>
            <p>If the issue is blocking a delivery or you are seeing something not listed here, loop in your manager directly. Bring the project file and a clear description of what you expected versus what happened.</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
