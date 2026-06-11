import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
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
          <h3>Cross-comp match review</h3>
          <p>
            When building the Edit Comp, the panel automatically attempts to link text layers across deliverable sibling comps by matching tag IDs. Matches the panel is uncertain about are surfaced in a bordered <strong>Review N uncertain match(es)</strong> box that appears below the Edit Comp actions. Each row shows <span className="mono">compName › layerName → tagId</span> with two buttons: <strong>Confirm</strong> accepts the link, <strong>Reject</strong> discards it. The review block disappears once all rows have been resolved.
          </p>
          <Callout variant="tip">
            <strong>Where matches show up</strong>
            The review box lives on the <span className="mono">TEXT</span> tab, directly beneath the Text Utilities actions. It only appears when there is something to confirm — a clean build shows no box at all.
          </Callout>
        </div>
      </div>

      <h3>Per-character styling carries over</h3>
      <p>
        Style a single word differently inside a text layer — a brand name in another
        font, one phrase in an accent colour — and Typecast does its best to keep that
        styling when the layer's text is overwritten during <strong>Duplicate &amp;
        Translate</strong> or <strong>Apply Translations</strong>. It captures the
        per-character styling (fill colour, font, size, faux bold/italic) before the
        overwrite and re-applies it to the matching words in the translated text, so the
        look propagates across every sibling comp.
      </p>

      <DemoSlot src="assets/webm/perchar.webm" caption="A styled brand word keeps its look as the translation is applied across sibling comps." media />

      <Callout variant="warn">
        <strong>It's a best effort, not a guarantee.</strong> Matching is by exact text, so
        if a styled word is altered by the translation — different casing, punctuation, or
        spelling — the styling won't carry and the word returns in the layer's base style.
        Re-running into an <em>existing</em> language folder also can't recover styling that
        was already flattened; delete the folder and duplicate fresh to restore it. Always
        spot-check brand words after a pass.
      </Callout>
    </Section>
  )
}
