import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { RawHtml } from '../components/RawHtml'

const dupesAllMockup = `
<div class="shot">
  <div class="cep-panel">
    <div class="flex h-8 items-center gap-3 border-b border-border/40 px-3">
      <button class="text-foreground"><svg class="h-4 w-4"><use href="#dept-mark"/></svg></button>
      <span class="flex items-baseline text-[13px] font-black leading-none tracking-[0.06em] text-foreground" style="font-weight:900">
        <span>DEPT</span><span class="mx-[2px]">/</span>
        <span class="inline-block overflow-hidden" style="height:1em;line-height:1"><span class="inline-block">DUPES</span></span>
      </span>
    </div>
    <nav class="flex border-b border-border/40 px-1">
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-text"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">TEXT</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-sheets"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">SHEETS</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-accent px-1 pt-2 pb-1.5 -mb-px text-foreground"><svg class="h-4 w-4"><use href="#ic-dupes"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">DUPES</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-render"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">RENDER</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-cleanup"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">CLEANUP</span></button>
    </nav>

    <div class="cep-overlay">
      <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2 px-3 py-2" style="filter:brightness(.5)">
        <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Source</h2>
        <div class="flex items-center gap-1.5">
          <button class="btn btn-outline btn-size-icon h-8 w-8"><svg class="h-4 w-4"><use href="#lc-file-spreadsheet"/></svg></button>
          <button class="btn btn-outline btn-size-icon h-8 w-8 bg-accent"><svg class="h-4 w-4"><use href="#lc-globe"/></svg></button>
          <input class="cep-input h-8 text-xs min-w-0 flex-1" value="docs.google.com/…">
        </div>
        <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Languages</h2>
        <div class="flex items-center gap-1.5">
          <input class="cep-input h-8 text-xs text-center" style="width:48px" value="en">
          <button class="btn btn-outline h-8 flex-1 text-xs" style="justify-content:space-between;padding:0 12px">
            <span class="truncate">All (12)</span>
            <svg class="h-3 w-3 opacity-50"><use href="#lc-chevron-down"/></svg>
          </button>
          <button class="btn h-8 bg-accent text-accent-foreground" style="padding:0 12px;font-size:10px">
            <svg class="h-3 w-3" style="margin-right:4px"><use href="#lc-play"/></svg>Duplicate
          </button>
        </div>
      </div>
      <div class="cep-overlay-mask"></div>
      <!-- Radix Dialog → ConfirmDialog -->
      <div class="cep-dialog">
        <div class="cep-dialog-header">
          <h2 class="cep-dialog-title">Duplicate for 12 languages?</h2>
          <p class="cep-dialog-description">Languages with existing folders will be updated. New languages will be duplicated from "EN · Master".</p>
        </div>
        <div class="cep-dialog-footer">
          <button class="btn btn-ghost h-7 px-3 text-[10px] tracking-[0.1em] text-muted-foreground">Cancel</button>
          <button class="btn btn-outline h-7 px-3 text-[10px] tracking-[0.1em]">Duplicate all</button>
        </div>
      </div>
    </div>
  </div>
  <div class="caption">Confirm dialog before duplicating all languages</div>
</div>
`

export function DupesAll() {
  return (
    <Section id="dupes-all">
      <SectionHeader kicker="CHAPTER 06 · CONTINUED" title="Duplicating all languages." />
      <p className="lede">
        When you choose <strong>All (N)</strong> instead of a single language,
        Typecast asks you to confirm before duplicating. It's a single click
        that touches every language column in your sheet, so it's the one
        action worth a second look.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={dupesAllMockup} />

          <Callout variant="tip">
            <strong>Re-running is safe</strong>
            Running Duplicate again with the same sheet only updates existing
            language folders. It won't create duplicates of duplicates.
          </Callout>
        </div>

        <div className="col">
          <h3>What "Duplicate" actually does</h3>
          <StepList>
            <li><strong>Reads</strong> the sheet or CSV. The first column must be <span className="mono">ID</span>, every other column is a language code.</li>
            <li><strong>Creates</strong> a duplicate of the target folder for every language column that doesn't already have a folder.</li>
            <li><strong>Re-wires</strong> sources and expressions in each duplicate so its text comps point at its <em>own</em> instances, not the master's.</li>
            <li><strong>Applies</strong> translations from the matching language column, matched by layer <span className="mono">ID</span>.</li>
            <li><strong>Reports</strong> which languages were created, which were updated, and how long it took.</li>
          </StepList>

          <Callout variant="warn">
            <strong>The sheet's first column must be <span className="mono">ID</span></strong>
            If the first column isn't called <span className="mono">ID</span> the
            panel rejects the load with "CSV is missing an ID column."
          </Callout>
        </div>
      </div>
    </Section>
  )
}
