import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { KeyValueTable } from '../components/KeyValueTable'
import { StatCard } from '../components/StatCard'
import { DemoSlot } from '../components/DemoSlot'

export function LanguageSafety() {
  return (
    <Section id="language-safety">
      <SectionHeader kicker="REFERENCE" title="Language safety." />
      <p className="lede">Before a single frame is duplicated, Typecast audits every column header in your CSV or Google Sheet and refuses to proceed on ambiguity — because silently writing text into the wrong language is worse than stopping.</p>

      <h3>Three header states</h3>
      <p>Every column header (except the ID column and your source language column) is classified into one of three states. The duplication workflow does not start until every header is either <strong>ok</strong> or explicitly resolved by you.</p>

      <div className="statrow cols-3">
        <StatCard>
          <div className="num">ok</div>
          <div className="lbl">Maps cleanly to a known language — no action needed</div>
        </StatCard>
        <StatCard>
          <div className="num">?</div>
          <div className="lbl">Unrecognized — typo, brand word, blank, or unknown code</div>
        </StatCard>
        <StatCard>
          <div className="num">!!</div>
          <div className="lbl">Collision — two or more columns resolve to the same language code</div>
        </StatCard>
      </div>

      <h3>How headers are matched</h3>

      <div className="split wide-left">
        <div>
          <p>Matching is case-insensitive and works against a built-in table of language names and ISO codes. The lookup sequence is:</p>
          <StepList>
            <li>Try the header as-is against the name table (e.g. <span className="mono">English</span> &rarr; <span className="mono">en</span>, <span className="mono">Spanish</span> &rarr; <span className="mono">es</span>, <span className="mono">Portuguese (Brazil)</span> &rarr; <span className="mono">pt-br</span>, <span className="mono">Chinese (Simplified)</span> &rarr; <span className="mono">zh-cn</span>).</li>
            <li>If the header contains a parenthetical qualifier — e.g. <span className="mono">Spanish (MX)</span> — try the base name first (<span className="mono">Spanish</span> &rarr; <span className="mono">es</span>), then attempt to upgrade to a known regional variant (<span className="mono">es-mx</span>). If the regional form is not in the table, the base code is kept.</li>
            <li>If the header is already a short ISO code (&le; 3 letters, e.g. <span className="mono">en</span>, <span className="mono">fil</span>) or a regional code in the form <span className="mono">pt-br</span> / <span className="mono">zh-cn</span>, it passes through directly.</li>
            <li>If nothing matches, the header is left <strong>unrecognized</strong>. A collision is declared when two distinct headers resolve to the identical code.</li>
          </StepList>
        </div>
        <div>
          <Callout variant="tip">
            <strong>Typecast never invents a language code.</strong> If a header does not match anything in the built-in table it is flagged unrecognized and you are asked to resolve it — it is never silently guessed, and duplication never starts on a header that is still in an unknown state. An explicit human decision is always what gets used.
          </Callout>
          <p>Common examples that resolve cleanly:</p>
          <KeyValueTable>
            <tr><th>Header</th><td>Resolved code</td></tr>
            <tr><th>English</th><td><span className="mono">en</span></td></tr>
            <tr><th>Spanish (MX)</th><td><span className="mono">es-mx</span></td></tr>
            <tr><th>Portuguese (Brazil)</th><td><span className="mono">pt-br</span></td></tr>
            <tr><th>zh-cn</th><td><span className="mono">zh-cn</span> (pass-through)</td></tr>
            <tr><th>fil</th><td><span className="mono">fil</span> (short code)</td></tr>
            <tr><th>Espa&#241;ol</th><td>unrecognized — flag raised</td></tr>
            <tr><th>ES &amp; Spanish both present</th><td>collision on <span className="mono">es</span> — flag raised</td></tr>
          </KeyValueTable>
        </div>
      </div>

      <h3>The mapping window</h3>
      <p>The floating window titled <strong>Map unrecognized columns</strong> opens automatically whenever any header is unrecognized or collides. It is a blocking step: the duplication workflow is paused until you act.</p>

      <DemoSlot src="demos/language-mapping-window.gif" caption="The mapping window lists every problem header with its status and a resolution dropdown. Apply mapping is disabled until every row has a choice." />

      <div className="split">
        <div>
          <h4>What you see</h4>
          <p>Each row shows the raw column header from your sheet and a status label:</p>
          <ul>
            <li><strong>not recognized</strong> — the header matched nothing in the built-in table.</li>
            <li><strong>clashes on "CODE"</strong> — another column already resolved to this code. Both are listed so you can decide which to keep and which to redirect or skip.</li>
          </ul>
          <p>Next to each label is a dropdown listing every known language. For a collision the dropdown is pre-set to the detected code, so you only need to break the tie — redirect one column to a different language or skip it.</p>
        </div>
        <div>
          <h4>Resolving the window</h4>
          <StepList>
            <li>For an <strong>unrecognized</strong> header: pick the correct language from the dropdown, or choose <span className="mono">Skip / not a language</span> if the column contains notes, internal metadata, or anything that is not a translation target.</li>
            <li>For a <strong>collision</strong>: the two conflicting columns are listed separately. Assign each to a distinct language, or skip whichever one is not needed.</li>
            <li>Once every row has a selection the <strong>Apply mapping</strong> button becomes active. Click it to confirm — duplication proceeds using your explicit choices.</li>
            <li>To abort entirely, click <strong>Cancel</strong>. Nothing is duplicated and the panel reverts to its idle state.</li>
          </StepList>
        </div>
      </div>

      <h3>Per-language rules applied automatically</h3>

      <div className="band">
        <div className="band-title">What Typecast writes correctly without any manual fix</div>
        <p>After your mapping choices are confirmed, Typecast applies a set of correctness rules per language when it writes the translated text into After Effects. These run automatically — you do not configure them.</p>
        <KeyValueTable>
          <tr>
            <th>Rule</th>
            <td>Languages affected</td>
          </tr>
          <tr>
            <th>Right-to-left layout</th>
            <td>Arabic, Hebrew, Farsi, Urdu</td>
          </tr>
          <tr>
            <th>Tracking reset to default</th>
            <td>CJK (Chinese, Japanese, Korean); Indic and complex scripts including Hindi, Bengali, Tamil, Telugu, Thai, Khmer, Burmese; and all RTL scripts (Arabic, Hebrew, Farsi, Urdu). Inherited letter-spacing breaks shaping in these scripts — resetting it prevents rendering errors.</td>
          </tr>
          <tr>
            <th>Automatic leading enabled</th>
            <td>Vietnamese — stacked diacritics require extra line height that AE's auto-leading provides.</td>
          </tr>
          <tr>
            <th>Localized digit forms</th>
            <td>Arabic &rarr; Arabic-Indic digits; Farsi and Urdu &rarr; Eastern (Farsi) digits; Hebrew &rarr; default digits. Requires a recent version of After Effects.</td>
          </tr>
        </KeyValueTable>
      </div>

      <div className="split center">
        <div>
          <Callout variant="tip">
            <strong>RTL + tracking work together.</strong> For Arabic, Farsi, Hebrew, and Urdu both the RTL layout flag and the tracking reset are applied. You do not need to set either manually — the comp is ready to present as soon as duplication finishes.
          </Callout>
        </div>
        <div>
          <Callout variant="tip">
            <strong>Skip is not the same as leaving a header unresolved.</strong> Choosing <span className="mono">Skip / not a language</span> is an explicit decision — Typecast records that column as intentionally excluded. Leaving a row without any selection keeps the Apply button disabled.
          </Callout>
        </div>
      </div>

      <Callout variant="warn">
        <strong>The header check is blocking — Cancel means nothing is duplicated.</strong> The mapping window must be fully resolved before any comp is created. If you click Cancel the workflow exits cleanly: no comps are created, no layers are touched, and the panel returns to its previous state. There is no partial duplication and no silent fallback — every language that gets written was explicitly approved by you in this step.
      </Callout>
    </Section>
  )
}
