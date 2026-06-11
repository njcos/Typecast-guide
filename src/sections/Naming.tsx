import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { KeyValueTable } from '../components/KeyValueTable'
import { StatCard } from '../components/StatCard'
import { DemoSlot } from '../components/DemoSlot'
import { RawHtml } from '../components/RawHtml'

const deliverableAnatomyBand = `
<div class="band dark">
  <div class="band-title">Deliverable name — slot by slot</div>
  <div class="anatomy">
    <div class="seg req"><div class="v">009_2800</div><div class="l">Job</div></div>
    <div class="seg req"><div class="v">CreativityNeverStops</div><div class="l">Concept</div></div>
    <div class="seg req"><div class="v">APAC</div><div class="l">Region</div></div>
    <div class="seg req"><div class="v">Acq</div><div class="l">Acq / Res</div></div>
    <div class="seg req"><div class="v">EN</div><div class="l">Lang</div></div>
    <div class="seg req"><div class="v">UAC</div><div class="l">Channel</div></div>
    <div class="seg req"><div class="v">1920x1080</div><div class="l">Size</div></div>
    <div class="seg req"><div class="v">15s</div><div class="l">Duration</div></div>
    <div class="seg"><div class="v">Null</div><div class="l">Version (opt)</div></div>
    <div class="seg req"><div class="v">FB</div><div class="l">App</div></div>
    <div class="seg req"><div class="v">MO-980</div><div class="l">Concept #</div></div>
  </div>
  <p>Orange chips are required. Unaccented chips are optional. A complete valid name: <span class="mono">009_2800_CreativityNeverStops_APAC_Acq_EN_UAC_1920x1080_15s_Null_FB_MO-980</span></p>
</div>
`

export function Naming() {
  return (
    <Section id="naming">
      <SectionHeader kicker="REFERENCE" title="Naming conventions." />
      <p className="lede">Typecast reads, validates, and auto-links your work entirely from comp and layer names. Get the schema right once and the tool handles the rest — language detection, sibling grouping, and export gating all flow from what you type in the Project panel.</p>

      <div className="statrow">
        <StatCard>
          <div className="num">11</div>
          <div className="lbl">Required slots</div>
        </StatCard>
        <StatCard>
          <div className="num">1</div>
          <div className="lbl">Optional slot</div>
        </StatCard>
        <StatCard>
          <div className="num">_</div>
          <div className="lbl">Skip prefix</div>
        </StatCard>
        <StatCard>
          <div className="num">!!</div>
          <div className="lbl">Text marker</div>
        </StatCard>
      </div>

      <h3>Anatomy of a deliverable name.</h3>
      <p>Every deliverable comp name follows a fixed underscore-separated schema. The validator aligns each token to the correct slot in sequence, highlights problems in red, and gates the Rename button until the full name is clean.</p>

      <RawHtml html={deliverableAnatomyBand} />

      <div className="band">
        <div className="band-title">Slot reference</div>
        <div className="split">
          <div>
            <h4>Required slots</h4>
            <p><strong>Job</strong> — Two numeric groups: a 3-digit project prefix and a 4-digit asset number, written together as <span className="mono">NNN_NNNN</span> (e.g. <span className="mono">009_2800</span>). The asset number is also the key Typecast uses to group all size and duration variants of the same creative into a sibling set.</p>
            <p><strong>Concept</strong> — Free text, no spaces. CamelCase by convention. Subconcepts use a hyphen: <span className="mono">Studies-Buddies</span>.</p>
            <p><strong>Region</strong> — From a known list: e.g. <span className="mono">APAC</span>, <span className="mono">GLOBAL</span>, <span className="mono">EUR</span>, <span className="mono">LATAM</span>, <span className="mono">MEAST</span>.</p>
            <p><strong>Acq / Res</strong> — One of <span className="mono">acq</span>, <span className="mono">res</span>, or <span className="mono">widen</span>.</p>
            <p><strong>Lang</strong> — Free text language code, e.g. <span className="mono">EN</span>, <span className="mono">FR</span>.</p>
            <p><strong>Channel</strong> — From a known list: e.g. <span className="mono">UAC</span>, <span className="mono">ONP</span>, <span className="mono">DV360</span>.</p>
            <p><strong>Size</strong> — Pixel dimensions in the form <span className="mono">NNNNxNNNN</span>.</p>
            <p><strong>Duration</strong> — Seconds with trailing s, or the literal word <span className="mono">static</span>: e.g. <span className="mono">15s</span>, <span className="mono">6s</span>, <span className="mono">static</span>.</p>
            <p><strong>App</strong> — From a known list: e.g. <span className="mono">FB</span>, <span className="mono">IG</span>, <span className="mono">MG</span>, <span className="mono">WA</span>.</p>
            <p><strong>Concept #</strong> — Free text delivery code, typically hyphenated: e.g. <span className="mono">MO-980</span>.</p>
          </div>
          <div>
            <h4>Optional slots</h4>
            <p><strong>Version</strong> — Free text variant descriptor, positioned after Duration. Use <span className="mono">Null</span> as a placeholder when no variant applies. For ONP work this slot carries the layout variant: <span className="mono">Tall</span>, <span className="mono">Portrait</span>, or <span className="mono">Square</span>.</p>
            <h4>Known-list vs free-text slots</h4>
            <p>Slots tied to a known list — Region, Acq/Res, Channel, App — are validated against that list and offer a dropdown in the validator. Free-text slots — Concept, Lang, Version, Concept # — accept any value; the validator only checks that they are not empty.</p>
            <Callout variant="tip">
              <strong>Do not leave blank tokens</strong>An accidental double-underscore (e.g. <span className="mono">APAC__EN</span>) creates an empty token that the validator reads as an Unexpected chip. Always remove optional slots entirely rather than leaving them blank.
            </Callout>
          </div>
        </div>
      </div>

      <h3>How the validator reads it.</h3>
      <div className="split wide-left">
        <div>
          <p>The Invalid Comp Names window opens whenever Typecast encounters a deliverable comp whose name does not conform to the schema. It splits the name on underscores and walks each token through the slot list in order, using best-fit alignment to map each token to its expected slot.</p>
          <p>Missing required slots appear as red dashed <span className="mono">(missing)</span> chips in the slot row. Tokens that cannot be assigned to any remaining slot appear as <span className="mono">Unexpected</span> chips. Correctly matched tokens show in green.</p>
          <p>Clicking any chip opens an inline editor: known-list slots present a dropdown of valid values; free-text slots present a text field. The schema preview updates live as you edit, so you can see the corrected name building up before committing.</p>
          <p>The <strong>Rename</strong> button activates only when every required slot carries a valid value and there are no Unexpected chips. The bottom-bar actions are <strong>Cancel</strong>, <strong>Skip Invalid</strong> (removes bad-named comps from the current render queue without renaming them), and <strong>Include All / Continue</strong> (proceeds with names as-is).</p>
        </div>
        <div>
          <Callout variant="tip">
            <strong>Chip colour key</strong>Green — slot is filled and valid. Red dashed — required slot is missing. Orange "Unexpected" — token does not fit any remaining slot (usually a typo, extra token, or wrong order). Fix all non-green chips before Rename activates.
          </Callout>
          <Callout variant="warn">
            <strong>Order is load-bearing</strong>The validator aligns tokens positionally. Swapping two slots — say, putting Size before Channel — causes every downstream token to misalign, flooding the row with Unexpected chips. Check the slot order diagram above if the validator reports more errors than expected.
          </Callout>
        </div>
      </div>

      <DemoSlot src="assets/webm/naming-safety.webm" caption="The Invalid Comp Names validator: chip colours update live as you edit each slot; the Rename button activates the moment the full name is valid." media />

      <h3>The text marker &amp; skip prefixes.</h3>
      <div className="split wide-left">
        <div>
          <h4>Text marker — <span className="mono">Change_Text_Here</span></h4>
          <p>The translatable text layer inside your Edit Comp must be named with the marker <span className="mono">Change_Text_Here</span>. The current canonical decorated form is <span className="mono">!!_Change_Text_Here_!!</span>. The legacy single-underscore form <span className="mono">_Change_Text_Here_</span> and the bare <span className="mono">Change_Text_Here</span> are both still recognised — but prefer the decorated form for new work.</p>
          <p>Matching is by substring: the layer name must <em>start with</em> <span className="mono">Change_Text_Here</span>. When Typecast detects the active deliverable's language it appends the language code automatically, producing names like <span className="mono">!!_Change_Text_Here_EN_!!</span> or <span className="mono">!!_Change_Text_Here_FR_!!</span>. You set the base marker once; Typecast manages the suffix from that point on.</p>
          <Callout variant="tip">
            <strong>One marker per Edit Comp</strong>Only the first layer whose name begins with the marker is treated as the translatable source. If you have multiple candidate layers, name only the primary one with the marker and skip-prefix the rest.
          </Callout>
        </div>
        <div>
          <h4>Skip prefixes</h4>
          <p>Any text layer whose name starts with <span className="mono">_</span> (underscore) or starts with the word <span className="mono">global</span> in any capitalisation is silently skipped. Typecast will not scan it, will not surface it in the tagging window, and will not pull it into the Edit Comp.</p>
          <p>Reach for skip prefixes for:</p>
          <ul>
            <li>Watermarks and brand bug treatments</li>
            <li>Legal lines and disclaimer copy</li>
            <li>Signoff cards and holding slates</li>
            <li>Any text that must never be localised</li>
          </ul>
          <Callout variant="warn">
            <strong>global prefix is case-insensitive</strong>Layers named <span className="mono">Global_Lockup</span>, <span className="mono">GLOBAL_BUG</span>, and <span className="mono">globalDisclaimer</span> are all skipped. Any layer name that merely begins with the characters g-l-o-b-a-l triggers the skip — check for accidental matches before relying on the scan results.
          </Callout>
        </div>
      </div>

      <h3>Platform naming formats.</h3>
      <p>The slot schema is consistent across all platform types. What varies is which optional slots are populated and how Channel and Version are interpreted for each delivery context.</p>

      <KeyValueTable>
        <tr><th>Type</th><td><strong>CC — Creator concepts</strong></td></tr>
        <tr><th>Channel slot</th><td>Specific channel tag — e.g. <span className="mono">UAC</span>, <span className="mono">DV360</span>, <span className="mono">YT</span></td></tr>
        <tr><th>Version slot</th><td>Free-text variant note — e.g. <span className="mono">Null</span>, <span className="mono">NoVO</span>, <span className="mono">VO</span></td></tr>
        <tr><th>Subconcepts</th><td>Hyphenated within the Concept slot — e.g. <span className="mono">Studies-Buddies</span></td></tr>
        <tr><th>Example</th><td><span className="mono">009_2710_CreativityNeverStops_APAC_Acq_EN_UAC_1920x1080_15s_Null_FB_MO-980</span></td></tr>
        <tr><th>Type</th><td><strong>ONP — On-platform</strong></td></tr>
        <tr><th>Channel slot</th><td>Literally <span className="mono">ONP</span></td></tr>
        <tr><th>Version slot</th><td>Layout variant: <span className="mono">Tall</span>, <span className="mono">Portrait</span>, or <span className="mono">Square</span></td></tr>
        <tr><th>Multi-language</th><td>Slash-separated in the Lang slot — e.g. <span className="mono">EN/HI</span></td></tr>
        <tr><th>Acq + Res together</th><td>Slash-separated in the Acq/Res slot — e.g. <span className="mono">Acq/Res</span></td></tr>
        <tr><th>Example</th><td><span className="mono">009_2880_IWasAlreadyDoingThis_GLOBAL_Acq/Res_EN/HI_ONP_1440x2560_15s_Tall_FB_M0-904</span></td></tr>
        <tr><th>Type</th><td><strong>Widen</strong></td></tr>
        <tr><th>Schema</th><td><span className="mono">JobNumber_CreativeConcept_Module/Portal_Language_WIDEN_Size_Static_App</span></td></tr>
        <tr><th>Channel slot</th><td>Literally <span className="mono">WIDEN</span></td></tr>
        <tr><th>Duration slot</th><td>Literally <span className="mono">Static</span> — Widen assets are always non-animated</td></tr>
      </KeyValueTable>

      <Callout variant="tip">
        <strong>Shared asset number groups siblings</strong>All size and duration variants of one creative share the same leading <span className="mono">NNN_NNNN</span> job number — for example <span className="mono">009_2800</span>. Typecast reads this asset number to identify every deliverable comp that belongs to the same creative family, enabling automatic sibling propagation when you apply a translation or style update to any one size.
      </Callout>
    </Section>
  )
}
