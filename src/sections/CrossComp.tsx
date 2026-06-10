import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { KeyValueTable } from '../components/KeyValueTable'
import { DemoSlot } from '../components/DemoSlot'
import { RawHtml } from '../components/RawHtml'

const assetNumberAnatomy = `
<div class="band dark">
  <div class="band-title">Anatomy of an asset number</div>
  <div class="anatomy">
    <div class="seg req"><div class="v">009</div><div class="l">project&nbsp;num</div></div>
    <div class="seg"><div class="v">_</div><div class="l">separator</div></div>
    <div class="seg req"><div class="v">2800</div><div class="l">asset&nbsp;num</div></div>
  </div>
  <p>The combined token <span class="mono">009_2800</span> is the scope key. Every comp whose name starts with this token is a sibling of the one you are editing.</p>
</div>
`

const tagIdAnatomy = `
<div class="band dark">
  <div class="band-title">How a layer becomes a tag id</div>
  <div class="split">
    <div>
      <p>When you tag a text layer, Typecast derives a <strong>tag id</strong> from the layer name by <em>slugifying</em> it: the name is lowercased and every character that is not alphanumeric or an underscore is dropped.</p>
      <p>That slug becomes the stable identifier that links the same logical text slot across all sibling comps. The layer's actual display name in the AE timeline is never modified.</p>
    </div>
    <div>
      <div class="anatomy">
        <div class="seg"><div class="v">EN_3Ways</div><div class="l">original layer name</div></div>
        <div class="seg"><div class="v">→</div><div class="l">slugify</div></div>
        <div class="seg"><div class="v">en_3ways</div><div class="l">tag&nbsp;id</div></div>
      </div>
      <div class="tip"><strong>Slug-friendly names pay off.</strong> Names that are already lowercase alphanumeric with underscores produce a tag id identical to the name, which makes automatic matching more reliable.</div>
    </div>
  </div>
</div>
`

export function CrossComp() {
  return (
    <Section id="cross-comp">
      <SectionHeader kicker="REFERENCE" title="Cross-comp matching." />
      <p className="lede">Tag a text layer once in your Edit Comp and Typecast can link every size and length variant of that creative automatically — so a single translation propagates to all sibling deliverables without copy-paste. This page explains the rules it follows, when it acts silently, and when it stops to ask you.</p>

      <div className="band">
        <div className="band-title">How siblings are found</div>
        <div className="split wide-left">
          <div>
            <p>Every deliverable comp name starts with an <strong>asset number</strong> — a leading <span className="mono">NNN_NNNN</span> block such as <span className="mono">009_2800</span>. All size variants and length variants of one creative share that same asset number prefix.</p>
            <p>When you work inside a comp, Typecast reads its asset number and searches the project for every other comp whose name begins with the identical prefix. Only those sibling comps are candidates for matching — comps from a different creative are never touched.</p>
            <Callout variant="tip"><strong>Keep comp names tidy.</strong> Typecast extracts the asset number from the literal comp name. If a deliverable comp is renamed or given a non-standard prefix the sibling scan won't find it, and its layers won't be linked.</Callout>
          </div>
          <div>
            <RawHtml html={assetNumberAnatomy} />
          </div>
        </div>
      </div>

      <RawHtml html={tagIdAnatomy} />

      <h3>Automatic links</h3>
      <p>After the tag is created, Typecast walks every sibling comp and tries to match each of its text layers to a known tag id. Two conditions produce a silent, automatic link with no confirmation required:</p>
      <StepList>
        <li><strong>Comment match.</strong> The layer's AE comment field contains a string that equals a known tag id exactly. Comment-based matching takes priority — it is the most reliable signal because comments are set deliberately and aren't affected by layer-rename drift.</li>
        <li><strong>Name match.</strong> The layer's name, after slugification, equals a known tag id exactly. For example, a sibling layer named <span className="mono">EN_3Ways</span> slugifies to <span className="mono">en_3ways</span> and links to the tag of the same id without any prompt.</li>
      </StepList>
      <p>Both of these paths require an <em>exact</em> string equality. Nothing fuzzy; no partial prefix matching. If neither condition holds, Typecast moves the candidate to the uncertain queue and waits for your review.</p>

      <h3>When Typecast asks you to confirm</h3>
      <p>Certain situations are close enough to be useful but not certain enough to link automatically. Typecast surfaces these as a <strong>Review N uncertain match(es)</strong> panel on the Text page. Each row shows <span className="mono">compName › layerName → tagId</span> with <strong>Confirm</strong> and <strong>Reject</strong> buttons.</p>

      <DemoSlot src="demos/cross-comp-review.gif" caption="The review panel listing uncertain candidates. Each row names the source comp, the layer, and the tag id it would be linked to. Confirm to link; Reject to leave the layer unlinked and untouched." />

      <p>There are three distinct reasons a match ends up in the review queue:</p>

      <KeyValueTable>
        <tr>
          <th>Reason</th>
          <td><strong>What it means & what to do</strong></td>
        </tr>
        <tr>
          <th><span className="mono">ambiguous-suffix</span></th>
          <td>After Effects appended a drift suffix when the layer was duplicated — e.g. <span className="mono">EN_3Ways 2</span> slugifies to <span className="mono">en_3ways_2</span>, which does not exactly match <span className="mono">en_3ways</span>. Stripping the trailing numeral produces a match, but Typecast treats it as a guess. <em>Confirm</em> if it genuinely is the same text slot; <em>Reject</em> if it is a distinct layer with a similar name.</td>
        </tr>
        <tr>
          <th><span className="mono">text-mismatch</span></th>
          <td>A layer with the correct name was found and its slug matches exactly, but its current source text differs from the master's. A safety flag — something unexpected may already be in that slot. Inspect both values; confirm if the sibling holds stale/placeholder copy, reject if it is intentional alternate content.</td>
        </tr>
        <tr>
          <th><span className="mono">collision</span></th>
          <td>Two or more layers in the same comp resolve to the same tag id (e.g. <span className="mono">EN_3Ways</span> and <span className="mono">EN_3Ways 2</span>). Typecast treats these as intentional duplicates and links all of them to share the tagged text. Confirm to share; if they should differ, rename one before confirming.</td>
        </tr>
      </KeyValueTable>

      <div className="band">
        <div className="band-title">Safe by design</div>
        <p>Exact matches are linked automatically and silently. Every uncertain case — ambiguous suffix, text mismatch, or collision — is held in the review queue until you decide. Rejecting a row leaves that layer completely untouched and unlinked; it will not receive translated text until you either rename it to produce an exact match or manually confirm it in a later pass.</p>
        <div className="split center">
          <div>
            <Callout variant="tip"><strong>Good layer naming makes matching just work.</strong> Use consistent, slug-friendly names across all sizes: <span className="mono">EN_Headline</span>, <span className="mono">EN_Subhead</span>, <span className="mono">EN_CTA</span>. When the slugified name is identical across every sibling comp, all links are automatic and the review queue stays empty.</Callout>
          </div>
          <div>
            <Callout variant="warn"><strong>Renamed copies drift.</strong> After Effects appends a number suffix to a duplicated layer, creating the pattern that triggers <span className="mono">ambiguous-suffix</span> flags. If you need a second instance of the same text, rename the copy immediately before tagging.</Callout>
          </div>
        </div>
      </div>
    </Section>
  )
}
