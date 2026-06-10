import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { DemoSlot } from '../components/DemoSlot'
import { RawHtml } from '../components/RawHtml'

const textMockup = `
<div class="shot">
  <div class="cep-panel">
    <div class="flex h-8 items-center gap-3 border-b border-border/40 px-3">
      <button class="text-foreground"><svg class="h-4 w-4"><use href="#dept-mark"/></svg></button>
      <span class="flex items-baseline text-[13px] font-black leading-none tracking-[0.06em] text-foreground" style="font-weight:900">
        <span>DEPT</span><span class="mx-[2px]">/</span>
        <span class="inline-block overflow-hidden" style="height:1em;line-height:1"><span class="inline-block">TEXT</span></span>
      </span>
    </div>
    <nav class="flex border-b border-border/40 px-1">
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-accent px-1 pt-2 pb-1.5 -mb-px text-foreground"><svg class="h-4 w-4"><use href="#ic-text"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">TEXT</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-sheets"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">SHEETS</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-dupes"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">DUPES</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-render"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">RENDER</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-cleanup"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">CLEANUP</span></button>
    </nav>

    <!-- TextCompPage.tsx -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2 px-3 py-2">
      <div class="flex flex-col gap-2">
        <div class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Build</div>
        <div class="flex items-center gap-2">
          <button class="btn btn-outline btn-size-icon h-9 w-9 shrink-0"><svg class="h-5 w-5"><use href="#lc-scan-line"/></svg></button>
          <span class="ml-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">45 Layers</span>
          <button class="btn btn-outline btn-size-icon h-9 w-9 shrink-0"><svg class="h-5 w-5"><use href="#lc-bookmark-plus"/></svg></button>
          <button class="btn btn-outline btn-size-icon h-9 w-9 shrink-0"><svg class="h-5 w-5"><use href="#lc-plus"/></svg></button>
        </div>
        <div class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Edit Comp</div>
        <button class="action-row"><svg><use href="#lc-crosshair"/></svg><span>Focus Text</span></button>
        <button class="action-row"><svg><use href="#lc-grip-vertical"/></svg><span>Reflow Layout</span></button>
        <button class="btn btn-outline h-10 justify-start gap-3 px-3 text-xs text-red-500 w-full">
          <svg class="h-4 w-4 shrink-0"><use href="#lc-trash-2"/></svg>
          Remove Selected from Edit Comp
        </button>
      </div>
    </div>
  </div>
  <div class="caption">TEXT tab after a successful scan</div>
</div>
`

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
          <RawHtml html={textMockup} />

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

      <DemoSlot src="demos/text-scan-tag-create.gif" caption="Scan the document, tag the layers, then build the Edit Comp." />

      <div className="split wide-left">
        <div>
          <h3>Edit Comp actions</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-crosshair"/></svg></div>
              <div className="meta">
                <div className="name">Focus Text</div>
                <div className="body">Jumps to and focuses the underlying editable text layer for the layer currently selected in the Edit Comp.</div>
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
        </div>
        <div>
          <h3>Cross-comp match review</h3>
          <p>
            When building the Edit Comp, the panel automatically attempts to link text layers across deliverable sibling comps by matching tag IDs. Matches the panel is uncertain about are surfaced in a bordered <strong>Review N uncertain match(es)</strong> box that appears below the Edit Comp actions. Each row shows <span className="mono">compName › layerName → tagId</span> with two buttons: <strong>Confirm</strong> accepts the link, <strong>Reject</strong> discards it. The review block disappears once all rows have been resolved.
          </p>
          <Callout variant="tip">
            <strong>Where matches show up</strong>
            The review box lives on the <span className="mono">TEXT</span> tab, directly beneath the Edit Comp actions. It only appears when there is something to confirm — a clean build shows no box at all.
          </Callout>
        </div>
      </div>
    </Section>
  )
}
