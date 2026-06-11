import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
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
      <div class="tip"><strong>Slug-friendly names pay off.</strong> Names that are already lowercase alphanumeric with underscores produce a tag id identical to the name, which makes matching more reliable.</div>
    </div>
  </div>
</div>
`

export function CrossComp() {
  return (
    <Section id="cross-comp">
      <SectionHeader kicker="REFERENCE" title="Cross-comp matching." />
      <p className="lede">Tag a text layer once in your Edit Comp and Typecast links every size and length variant of that creative automatically — so a single translation propagates to all sibling deliverables without copy-paste. It runs in the background when you build or update the master text comp; there is no separate panel and nothing to confirm. This page explains the rules it follows.</p>

      <div className="band">
        <div className="band-title">How siblings are found</div>
        <div className="split wide-left">
          <div>
            <p>Every deliverable comp name starts with an <strong>asset number</strong> — a leading <span className="mono">NNN_NNNN</span> block such as <span className="mono">009_2800</span>. All size variants and length variants of one creative share that same asset number prefix.</p>
            <p>When you build the master text comp from a deliverable, Typecast reads its asset number and gathers every sibling comp that shares the identical prefix — from your <span className="mono">01 master comps</span> folder, or a project-wide scan of deliverable-named comps if that folder isn't found. Comps from a different creative are never touched.</p>
            <Callout variant="tip"><strong>Asset-number scoping is the guardrail.</strong> Because matching is confined to one creative, generic layer names can't bleed across creatives — that is what makes name-only matching safe without ever comparing text.</Callout>
          </div>
          <div>
            <RawHtml html={assetNumberAnatomy} />
          </div>
        </div>
      </div>

      <RawHtml html={tagIdAnatomy} />

      <h3>What links automatically</h3>
      <p>Within that sibling set, Typecast inspects each direct (non-precomped) text layer and links it to a tag whenever the <strong>name</strong> lines up. There is no text comparison — size and length variants legitimately carry different copy, so text never gates a match. A layer links when any of these hold:</p>
      <StepList>
        <li><strong>Tagged comment.</strong> The layer's After Effects comment field already holds a known tag id. This wins over everything else — it survives a later rename, because the comment, not the name, carries the link.</li>
        <li><strong>Name slug.</strong> The layer's name, after slugification, equals a tag id exactly. A sibling layer named <span className="mono">EN_3Ways</span> slugifies to <span className="mono">en_3ways</span> and links to that tag.</li>
        <li><strong>After Effects drift suffix.</strong> When AE duplicates a layer it appends <span className="mono"> 2</span>, <span className="mono"> 3</span>… so <span className="mono">EN_3Ways 2</span> slugifies to <span className="mono">en_3ways_2</span>. Typecast strips the trailing number and links to the base tag <span className="mono">en_3ways</span> — but only when that base is itself a real tag, so an intentional <span className="mono">Headline 2</span> never collapses into <span className="mono">Headline 3</span>.</li>
      </StepList>
      <p>If two or more layers in one comp resolve to the same tag — a duplicated <span className="mono">EN_3Ways</span> and <span className="mono">EN_3Ways 2</span>, say — all of them link. They share one tag and therefore one piece of text, which is exactly what duplicated layers want.</p>

      <div className="band">
        <div className="band-title">What's left untouched</div>
        <p>A layer that produces no name signal — its slug is neither a tag id nor a drift suffix of one — is simply skipped and keeps whatever it had. So are layers whose names start with <span className="mono">_</span> or <span className="mono">global</span>, text inside precomps (already linked through the shared precomp instance), and any layer whose comment points at a tag id Typecast doesn't recognise. Nothing is guessed and nothing waits in a queue.</p>
        <div className="split center">
          <div>
            <Callout variant="tip"><strong>Consistent names just work.</strong> Use the same slug-friendly names across every size: <span className="mono">EN_Headline</span>, <span className="mono">EN_Subhead</span>, <span className="mono">EN_CTA</span>. Identical names across siblings means every layer links on the first pass.</Callout>
          </div>
          <div>
            <Callout variant="warn"><strong>Watch shared base names.</strong> Two genuinely different layers whose names slugify to the same tag — or to <span className="mono">tag_2</span> of an existing tag — will both link to that one text slot. If they should hold different copy, give them distinct names before you build the master comp.</Callout>
          </div>
        </div>
      </div>
    </Section>
  )
}
