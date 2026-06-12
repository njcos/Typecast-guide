import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { DemoSlot } from '../components/DemoSlot'

export function Text() {
  return (
    <Section id="text">
      <SectionHeader kicker="CHAPTER 04" title="Text." />
      <p className="lede">
        The heart of the workflow. Scan the active comp, tag the layers you want to
        translate, and build an Edit Comp that drives every language variant.
        Once it's built you can focus individual text layers, reflow the layout,
        or remove layers you no longer need.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <img src="assets/screencaps/Text Panel.png" alt="text panel" />

          <Callout variant="tip">
            <strong>Hiding a layer from the scan</strong>
            Prefix the <em>layer name</em> with <span className="mono">_</span> (underscore) and the scan will skip it entirely — it won't appear in the tagging window or the Edit Comp. <span className="mono">GLOBAL</span> and <span className="mono">Global</span> prefixes work too. Use this for signoffs, watermarks, legal text, or any layer that shouldn't be translatable. Renaming is undoable in After Effects, so it's safe to try.
          </Callout>
        </div>

        <div className="col">
          <h3>The build row</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-scan-line"/></svg></div>
              <div className="meta">
                <div className="name">Scan document</div>
                <div className="body">Scans the active comp for translatable text layers. Once the scan completes, a pill badge (e.g. <span className="mono">8 Layers</span>) appears showing the number of layers in your current tagged selection.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-bookmark-plus"/></svg></div>
              <div className="meta">
                <div className="name">Tag layers</div>
                <div className="body">Opens the Tagging window in a separate floating panel. There you choose which layers should appear in the Edit Comp. Disabled until a scan has run.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-plus"/></svg></div>
              <div className="meta">
                <div className="name">Create / Update Text Comp</div>
                <div className="body">Builds (or rebuilds) the Edit Comp from your tagged selection. A toast reports how many layers were newly added, how many already existed, and how many were cross-linked to deliverable sibling comps.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoSlot src="assets/webm/scan-and-tag.webm" caption="Scan the document, tag the layers, then build the Edit Comp." media />

      <div className="split wide-left">
        <div>
          <h3>Text Utilities</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-crosshair"/></svg></div>
              <div className="meta">
                <div className="name">Focus Text</div>
                <div className="body">Jumps to and focuses the underlying editable text layer for the layer currently selected in the Edit Comp.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m3 7 5 5-5 5V7"/><path d="m21 7-5 5 5 5V7"/><path d="M12 2v2"/><path d="M12 8v2"/><path d="M12 14v2"/><path d="M12 20v2"/></svg></div>
              <div className="meta">
                <div className="name">Flip Text Direction</div>
                <div className="body">For right-to-left languages. Expand the row for two options, both on by default: <strong>Flip Alignment</strong> reverses the justification on the master source layer, and <strong>Mirror position</strong> mirrors every linked instance's position across the comp. The whole flip is a single undo step.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-grip-vertical"/></svg></div>
              <div className="meta">
                <div className="name">Reflow Layout</div>
                <div className="body">Re-runs the master-text-comp layout pass, redistributing layers vertically to account for any text changes or sizing adjustments since the comp was last built.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-trash-2"/></svg></div>
              <div className="meta">
                <div className="name">Remove Selected from Edit Comp</div>
                <div className="body">Drops the selected layer(s) from the Edit Comp without touching the underlying text comps. The button label and icon are rendered in red to signal the action is destructive.</div>
              </div>
            </div>
          </div>
          <Callout variant="warn">
            <strong>Point text gets a heads-up.</strong> If <strong>Mirror position</strong> is on and a selected instance is point text rather than a paragraph box, a dialog warns <em>“Layer is point text. For best results convert to paragraph text.”</em> with <strong>Cancel</strong> and <strong>Proceed</strong>. Mirroring point text is less reliable than a box, so convert when you can.
          </Callout>
        </div>
        <div>
          <h3>Cross-comp linking is automatic</h3>
          <p>
            When you build the Edit Comp, the panel links matching text layers across the deliverable's sibling comps for you — by tag id and layer name, scoped to the same creative. It runs silently in the background: there is no review step, no <strong>Confirm</strong>/<strong>Reject</strong> box, and nothing to resolve. A clean build simply links what it can and leaves the rest untouched.
          </p>
          <Callout variant="tip">
            <strong>How the matching works</strong>
            The full rule set — how siblings are found by asset number and exactly what links automatically — is covered under <span className="mono">Cross-comp matching</span>.
          </Callout>
        </div>
      </div>

      <header className="mt-16 mb-6 border-t border-dept pt-10" data-reveal>
        <h3 className="mt-2 text-xl md:text-4xl font-black uppercase tracking-[0.02em] text-ink">Per-character styling carries over</h3>
      </header>
      <p>
        Style part of a layer differently — a brand word in another font, one phrase
        in an accent colour, a single glyph bumped up a few points — and that styling
        follows the copy across every sibling deliverable and every language. This is a
        bigger deal than it sounds, because After Effects normally <em>destroys</em> it:
        the instant a layer's source text is reassigned, every per-character style run
        collapses to the first character's style. A styled word survives a translation
        pass only because Typecast deliberately preserves it — and it does so in two
        different ways depending on how the layer gets its text.
      </p>

      <div className="band">
        <div className="band-title">Linked layers — a live, full-fidelity mirror</div>
        <p>
          This is the path that makes styling "transfer from the Edit&nbsp;Comp." When a
          layer is linked to the master text comp, its Source Text is driven by an
          <strong> expression</strong> rather than overwritten. That expression rebuilds
          the master's text one character at a time and copies the master's style at every
          index — so the link carries the <em>complete</em> character style, not a handful
          of attributes:
        </p>
        <StepList>
          <li><strong>Type &amp; weight</strong> — font, size, faux bold, faux italic, all-caps, small-caps.</li>
          <li><strong>Fill &amp; stroke</strong> — fill on/off and colour; stroke on/off, colour, and width.</li>
          <li><strong>Spacing &amp; transform</strong> — tracking, leading, baseline shift, baseline option, horizontal and vertical scaling.</li>
          <li><strong>Paragraph</strong> — justification, re-applied from the master (the per-character rebuild resets it, so it is restored explicitly).</li>
        </StepList>
        <p>
          Because it is an expression, it is <strong>live</strong>: restyle a word in the
          Edit&nbsp;Comp master and every linked size and length updates instantly, in every
          language, with no re-duplication and no manual copy-paste. There is nothing to
          "bake" — the look is recomputed from the master each frame. This path needs After
          Effects 25.0 or newer and the JavaScript expression engine; the panel switches the
          project to that engine automatically when it builds the Edit&nbsp;Comp.
        </p>
      </div>

      <DemoSlot src="assets/webm/perchar.webm" caption="A styled brand word keeps its look as the translation is applied across sibling comps." media />

      <h3>The fallback: when text is overwritten directly</h3>
      <p>
        Layers that are <em>not</em> expression-linked — text written straight onto the
        layer by <strong>Duplicate &amp; Translate</strong> or <strong>Apply
        Translations</strong> — can't mirror live, so here Typecast falls back to a
        best-effort capture-and-reapply. Just before the overwrite (while the runs are still
        intact) it snapshots each styled word and the attributes it can carry —
        <span className="mono"> font</span>, <span className="mono">size</span>,
        <span className="mono"> faux&nbsp;bold</span>, <span className="mono">faux&nbsp;italic</span>,
        and <span className="mono">fill&nbsp;colour</span> — writes the translated text, then
        re-finds those exact words and re-applies the captured look.
      </p>

      <Callout variant="warn">
        <strong>The fallback is a best effort, not a guarantee.</strong> It carries a smaller
        set of attributes than the live link, and it matches by <em>exact</em> word text — so
        if the translation re-cases, re-punctuates, or respells a styled word, it won't match
        and that word returns in the layer's base style. Re-running into an <em>existing</em>
        language folder also can't recover styling that was already flattened on a previous
        pass; delete the folder and duplicate fresh to restore it. Whenever you can, keep
        brand words on linked layers so they ride the live mirror instead — and spot-check
        them after any overwrite pass.
      </Callout>
    </Section>
  )
}
