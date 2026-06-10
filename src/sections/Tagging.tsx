import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { DemoSlot } from '../components/DemoSlot'
import { RawHtml } from '../components/RawHtml'

const taggingMockup = `
<div class="shot">
  <div class="cep-panel cep-panel-wide">
    <div class="ae-frame">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span style="margin-left:6px">Typecast · Tagging</span>
    </div>
    <!-- tagging.tsx <main> -->
    <main class="flex h-full flex-col overflow-hidden bg-background p-3 text-foreground">
      <div class="mb-2 flex items-baseline justify-between">
        <h1 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground">Tag layers</h1>
        <span class="text-[10px] tracking-[0.08em] text-muted-foreground">5 of 12 included</span>
      </div>

      <div class="flex-1 overflow-hidden rounded-md border border-border/60">
        <div class="flex items-center gap-2 border-b border-border/40 bg-background px-2 py-1.5">
          <span class="cep-switch on"></span>
          <div class="min-w-0 flex-1">
            <div class="truncate text-xs">&ldquo;3 ways WhatsApp protects your privacy.&rdquo;</div>
            <div class="truncate text-[11px] text-muted-foreground">EN_3WAYS</div>
          </div>
          <span class="flex h-5 w-5 items-center justify-center text-muted-foreground"><svg class="h-3.5 w-3.5"><use href="#lc-grip-vertical"/></svg></span>
        </div>
        <div class="flex items-center gap-2 border-b border-border/40 bg-background px-2 py-1.5">
          <span class="cep-switch on"></span>
          <div class="min-w-0 flex-1">
            <div class="truncate text-xs">&ldquo;End-to-end encryption across iOS and Android&rdquo;</div>
            <div class="truncate text-[11px] text-muted-foreground">EN_ENDTOEND</div>
          </div>
          <span class="flex h-5 w-5 items-center justify-center text-muted-foreground"><svg class="h-3.5 w-3.5"><use href="#lc-grip-vertical"/></svg></span>
        </div>
        <div class="flex items-center gap-2 border-b border-border/40 bg-background px-2 py-1.5">
          <span class="cep-switch on"></span>
          <div class="min-w-0 flex-1">
            <div class="truncate text-xs">&ldquo;Got it?&rdquo;</div>
            <div class="truncate text-[11px] text-muted-foreground">EN_SCENE3_GREENBUBBLE_1 &rsaquo; EN_GOTIT</div>
          </div>
          <span class="flex h-5 w-5 items-center justify-center text-muted-foreground"><svg class="h-3.5 w-3.5"><use href="#lc-grip-vertical"/></svg></span>
        </div>
        <div class="flex items-center gap-2 border-b border-border/40 bg-background px-2 py-1.5">
          <span class="cep-switch on"></span>
          <div class="min-w-0 flex-1">
            <div class="truncate text-xs">&ldquo;Wifi password is millerfamily&lt;3&rdquo;</div>
            <div class="truncate text-[11px] text-muted-foreground">EN_SCENE4_WHITEBUBBLE &rsaquo; EN_WIFIPASS</div>
          </div>
          <span class="flex h-5 w-5 items-center justify-center text-muted-foreground"><svg class="h-3.5 w-3.5"><use href="#lc-grip-vertical"/></svg></span>
        </div>
        <div class="flex items-center gap-2 bg-background px-2 py-1.5">
          <span class="cep-switch on"></span>
          <div class="min-w-0 flex-1">
            <div class="truncate text-xs">&ldquo;Thanks for house sitting!&rdquo;</div>
            <div class="truncate text-[11px] text-muted-foreground">EN_SCENE4_WHITEBUBBLE &rsaquo; EN_THANKS</div>
          </div>
          <span class="flex h-5 w-5 items-center justify-center text-muted-foreground"><svg class="h-3.5 w-3.5"><use href="#lc-grip-vertical"/></svg></span>
        </div>
      </div>

      <div class="mt-3 flex justify-end gap-2">
        <button class="btn btn-ghost h-7 px-3 text-[10px] tracking-[0.1em] text-muted-foreground">Close</button>
        <button class="btn btn-outline h-7 px-3 text-[10px] tracking-[0.1em]">Add to edit comp (5)</button>
      </div>
    </main>
  </div>
  <div class="caption">Tagging window · 5 of 12 layers included</div>
</div>
`

export function Tagging() {
  return (
    <Section id="tagging">
      <SectionHeader kicker="CHAPTER 04 · CONTINUED" title="Tagging window." />
      <p className="lede">
        Tap the bookmark icon and a separate window opens with a list of every
        text layer the scan found. Tick the rows you want in the Edit Comp, then
        close. The main panel picks up your selection within a second.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={taggingMockup} />

          <Callout variant="tip">
            <strong>Why a separate window</strong>
            After Effects panels are narrow. A full-height tagging window gives
            you room to see every layer name and breadcrumb path, and leaves
            the timeline visible so you can cross-check.
          </Callout>
        </div>

        <div className="col">
          <h3>How it works</h3>
          <StepList>
            <li><strong>Open</strong> the window from the bookmark button on the TEXT tab.</li>
            <li><strong>Toggle</strong> any layer's switch on to include it in the Edit Comp, or off to exclude it. Clicking anywhere in a row is equivalent to toggling its switch.</li>
            <li><strong>Re-order</strong> rows by dragging the grip on the right — the order is reflected in the Edit Comp when you click <strong>Add to edit comp</strong>.</li>
          </StepList>
        </div>
      </div>

      <DemoSlot src="demos/tagging-window.gif" caption="Assigning tags to layers in the Tag Layers window." />

      <h3>Common gotchas</h3>
      <ul>
        <li><strong>Tagging is per-scan.</strong> If you re-scan, you'll need to re-include anything new. Existing tags survive between scans of the same project.</li>
        <li><strong>Position expression error after dragging?</strong> The master text comp's position expression can break if a layer was dragged. Rebuild the Edit Comp (the <span className="mono">+</span> button on TEXT) to recover.</li>
        <li><strong>Don't include decorative layers.</strong> Logos, separators, and ornaments don't need translation — leaving them switched off keeps the Edit Comp focused.</li>
      </ul>
    </Section>
  )
}
