import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { KeyValueTable } from '../components/KeyValueTable'
import { RawHtml } from '../components/RawHtml'

const sheetsMockup = `
<div class="shot">
  <div class="cep-panel">
    <div class="flex h-8 items-center gap-3 border-b border-border/40 px-3">
      <button class="text-foreground"><svg class="h-4 w-4"><use href="#dept-mark"/></svg></button>
      <span class="flex items-baseline text-[13px] font-black leading-none tracking-[0.06em] text-foreground" style="font-weight:900">
        <span>DEPT</span><span class="mx-[2px]">/</span>
        <span class="inline-block overflow-hidden" style="height:1em;line-height:1"><span class="inline-block">SHEETS</span></span>
      </span>
    </div>
    <nav class="flex border-b border-border/40 px-1">
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-text"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">TEXT</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-accent px-1 pt-2 pb-1.5 -mb-px text-foreground"><svg class="h-4 w-4"><use href="#ic-sheets"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">SHEETS</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-dupes"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">DUPES</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-render"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">RENDER</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-cleanup"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">CLEANUP</span></button>
    </nav>

    <!-- SheetsTab.tsx -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2 px-3 py-2">
      <div class="flex flex-col gap-4">
        <section class="space-y-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Export</h2>
          <div class="flex items-center gap-2">
            <button class="btn btn-outline h-8 w-[130px] px-3 text-[10px] font-normal tracking-[0.1em]" style="justify-content:space-between">
              <span class="truncate">CSV</span>
              <svg class="ml-2 h-3 w-3 shrink-0 opacity-50"><use href="#lc-chevron-down"/></svg>
            </button>
            <button class="btn btn-outline h-8 flex-1 gap-2 px-3 text-[10px] tracking-[0.1em]">
              <svg class="h-3.5 w-3.5"><use href="#lc-share"/></svg>Export CSV
            </button>
          </div>
        </section>

        <section class="space-y-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Validation</h2>
          <div class="flex flex-col gap-1">
            <div class="flex items-start gap-2 text-[11px] tracking-[0.04em] leading-snug">
              <svg class="h-3 w-3 shrink-0 text-emerald-500/80" style="margin-top:3px"><use href="#lc-check"/></svg>
              <span class="text-muted-foreground">Scan is current</span>
            </div>
            <div class="flex items-start gap-2 text-[11px] tracking-[0.04em] leading-snug">
              <svg class="h-3 w-3 shrink-0 text-emerald-500/80" style="margin-top:3px"><use href="#lc-check"/></svg>
              <span class="text-muted-foreground">Layer selection is not empty</span>
            </div>
            <div class="flex items-start gap-2 text-[11px] tracking-[0.04em] leading-snug">
              <svg class="h-3 w-3 shrink-0 text-destructive" style="margin-top:3px"><use href="#lc-x"/></svg>
              <span class="text-destructive">All selected layers have ID tags<span class="text-muted-foreground"> · 17 layer(s) missing ID tags</span></span>
            </div>
            <div class="flex items-start gap-2 text-[11px] tracking-[0.04em] leading-snug">
              <svg class="h-3 w-3 shrink-0 text-emerald-500/80" style="margin-top:3px"><use href="#lc-check"/></svg>
              <span class="text-muted-foreground">No duplicate IDs</span>
            </div>
            <div class="flex items-start gap-2 text-[11px] tracking-[0.04em] leading-snug">
              <svg class="h-3 w-3 shrink-0 text-emerald-500/80" style="margin-top:3px"><use href="#lc-check"/></svg>
              <span class="text-muted-foreground">No empty text layers</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div class="caption">SHEETS tab · one validation warning</div>
</div>
`

export function Sheets() {
  return (
    <Section id="sheets">
      <SectionHeader kicker="CHAPTER 05" title="Sheets." />
      <p className="lede">
        Export the Edit Comp as a translation-ready file. The Sheets tab pulls
        rows directly from the Edit Comp — no separate selection needed — and
        writes them out as CSV, JSON, PDF, Word, or to your clipboard in
        Google-Sheets-friendly tab-separated form.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={sheetsMockup} />
        </div>

        <div className="col">
          <h3>Export formats</h3>
          <KeyValueTable>
            <tr><th>CSV</th><td>One row per layer, columns <span className="mono">ID, en</span>. Universal translator-ready format.</td></tr>
            <tr><th>JSON</th><td>Same data, machine-readable. For pipelines that ingest translations programmatically.</td></tr>
            <tr><th>PDF</th><td>Printable layout. Hand to a reviewer who doesn't open spreadsheets.</td></tr>
            <tr><th>Word</th><td>For translators who prefer <span className="mono">.docx</span>. Editable in any word processor.</td></tr>
            <tr><th>Copy to Sheets</th><td>Writes a TSV blob to your clipboard. Paste straight into a Google Sheet with <span className="mono">⌘V</span>.</td></tr>
          </KeyValueTable>
        </div>
      </div>

      <div className="split wide-left">
        <div>
          <h3>Invalid Comp Names window</h3>
          <p>
            When you trigger a render and some comps in scope have names that
            don't parse as valid Typecast comp names, the panel opens a
            standalone <strong>Invalid Comp Names</strong> window before adding
            anything to the render queue.
          </p>
          <p>
            Each invalid comp is shown with its original name, an inline text
            field for editing, and a row of token chips — one per naming
            segment (Job, Region, Lang, Size, etc.). Red or dashed
            chips indicate missing or unrecognised segments. Click a chip to
            open a small edit panel with a filtered dropdown; type to narrow
            options or enter a custom value. When the name parses as valid,
            click <strong>Rename</strong> to apply the change in After Effects.
          </p>
          <p>
            The window's footer offers three actions:
          </p>
          <ul>
            <li><strong>Cancel</strong> — abort the render entirely.</li>
            <li><strong>Skip Invalid</strong> — exclude the invalid comps and render only the valid ones.</li>
            <li><strong>Include All</strong> — proceed with all comps regardless of name validity. Once every comp has been renamed in the window, this button becomes <strong>Continue</strong>.</li>
          </ul>

          <Callout variant="tip">
            <strong>Fix names before rendering</strong>
            Using <strong>Skip Invalid</strong> is safe when a handful of
            utility comps have non-standard names and you don't want to render
            them anyway. If you need every comp in the queue, rename them first
            with the chip editor and use <strong>Continue</strong> — the
            rename is written directly into the After Effects project.
          </Callout>
        </div>

        <div>
          <h3>The validation checklist</h3>
          <p>
            Below the export button you'll see a live list of checks that look
            at the current Edit Comp. Green ticks are good. A red cross is a
            warning — you can still export, but the toast will tell you
            "Exporting with N warnings" and you'll likely want to fix them
            first.
          </p>

          <Callout variant="warn">
            <strong>Duplicate IDs</strong>
            IDs are how translations are matched back to layers. If two layers
            share an ID, one of them silently overwrites the other when you
            import the translated CSV.
          </Callout>
        </div>
      </div>
    </Section>
  )
}
