import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { DemoSlot } from '../components/DemoSlot'
import { RawHtml } from '../components/RawHtml'

const dupesMockup = `
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

    <!-- DupesTab.tsx -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2 px-3 py-2">
      <div class="flex flex-col gap-4">

        <section class="space-y-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Source</h2>
          <!-- SheetSource.tsx — Local CSV state -->
          <div class="flex items-center gap-1.5">
            <button class="btn btn-outline btn-size-icon h-8 w-8 shrink-0 bg-accent text-accent-foreground"><svg class="h-4 w-4"><use href="#lc-file-spreadsheet"/></svg></button>
            <button class="btn btn-outline btn-size-icon h-8 w-8 shrink-0"><svg class="h-4 w-4"><use href="#lc-globe"/></svg></button>
            <button class="btn btn-outline btn-size-icon h-8 w-8 shrink-0"><svg class="h-4 w-4"><use href="#lc-folder-open"/></svg></button>
            <span class="min-w-0 flex-1 truncate text-xs text-muted-foreground">WA_TRANSLATED_FIXED.CSV</span>
          </div>
        </section>

        <section class="space-y-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Target Folder</h2>
          <!-- FolderPicker.tsx -->
          <div class="flex items-center gap-1.5">
            <span class="shrink-0 text-xs text-muted-foreground">Folder</span>
            <button class="btn btn-outline h-8 min-w-0 flex-1 px-3 text-xs font-normal" style="justify-content:space-between">
              <span class="truncate">EN · Master</span>
              <svg class="ml-2 h-3 w-3 shrink-0 opacity-50"><use href="#lc-chevron-down"/></svg>
            </button>
            <button class="btn btn-outline btn-size-icon h-8 w-8 shrink-0"><svg class="h-4 w-4"><use href="#lc-refresh-cw"/></svg></button>
          </div>
        </section>

        <section class="space-y-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Languages</h2>
          <div class="flex items-center gap-1.5">
            <span class="shrink-0 text-[10px] tracking-[0.08em] text-muted-foreground">From</span>
            <input class="cep-input h-8 text-xs text-center" style="width:48px" value="en">
            <button class="btn btn-outline h-8 min-w-0 flex-1 px-3 text-xs font-normal" style="justify-content:space-between">
              <span class="truncate">All (12)</span>
              <svg class="ml-2 h-3 w-3 shrink-0 opacity-50"><use href="#lc-chevron-down"/></svg>
            </button>
            <button class="btn h-8 shrink-0 gap-1 bg-accent px-3 text-[10px] tracking-[0.1em] text-accent-foreground">
              <svg class="h-3 w-3"><use href="#lc-play"/></svg>Duplicate
            </button>
          </div>
        </section>

        <div class="cep-toast">Created: FR, DE, ES, IT · Updated: JA, KO · 3.2s</div>
      </div>
    </div>
  </div>
  <div class="caption">DUPES tab · Google Sheet loaded, "All (12)" selected</div>
</div>
`

export function Dupes() {
  return (
    <Section id="dupes">
      <SectionHeader kicker="CHAPTER 06" title="Dupes." />
      <p className="lede">
        Once your Edit Comp is translated, the Dupes tab is what turns one
        master folder of comps into a folder per language — each with the right
        translations applied and ready to render.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={dupesMockup} />

          <Callout variant="tip">
            <strong>Local CSV or Google Sheet?</strong>
            Pick the source that matches how your team works. The Google Sheet
            flow re-loads on every Duplicate, so translators can keep editing
            in the sheet up to the moment you run it. Local CSV is a snapshot.
          </Callout>
        </div>

        <div className="col">
          <h3>The three rows</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-file-spreadsheet"/></svg></div>
              <div className="meta">
                <div className="name">Source</div>
                <div className="body">Pick where translations live. The leftmost icon is a local CSV; the next is a Google Sheet URL. When you paste a sheet URL the panel auto-loads it; for a local file, click the folder icon to browse.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h18M3 12h18M3 17h12"/></svg></div>
              <div className="meta">
                <div className="name">Target Folder</div>
                <div className="body">The "master" folder in your project that will be duplicated per language. Typically your English version. Hit refresh if you've reorganised the project panel.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-play"/></svg></div>
              <div className="meta">
                <div className="name">Languages &amp; Duplicate</div>
                <div className="body"><strong>From</strong> is the source language column in your sheet (default <span className="mono">en</span>). The picker next to it lets you target one language, or <strong>All (N)</strong> to do every language in one pass.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoSlot src="demos/dupes-translate.gif" caption="Choosing a source folder and target languages, then duplicating." />

      <div className="split wide-left">
        <div>
          <h3>Language Mapping window</h3>
          <p>
            When a CSV or Google Sheet is loaded, Typecast checks every column
            header against its list of known languages. If any header can't be
            matched automatically — either unrecognised or colliding with
            another code — a standalone <strong>Language Mapping</strong>
            window opens before the duplicate runs.
          </p>
          <p>
            Each problematic header is listed with a dropdown. Pick the
            correct language from the list, or choose
            <strong>Skip / not a language</strong> to exclude that column
            entirely. Once every row has a selection, click
            <strong>Apply mapping</strong> to continue the dupe/translate
            flow with your choices. <strong>Cancel</strong> aborts the
            operation without duplicating anything.
          </p>
        </div>
        <div>
          <DemoSlot src="demos/language-mapping.gif" caption="Resolving an unmatched language header in the mapping window." />
        </div>
      </div>
    </Section>
  )
}
