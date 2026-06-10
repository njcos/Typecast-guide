import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { DemoSlot } from '../components/DemoSlot'
import { RawHtml } from '../components/RawHtml'

const renderMockup = `
<div class="shot">
  <div class="cep-panel">
    <div class="flex h-8 items-center gap-3 border-b border-border/40 px-3">
      <button class="text-foreground"><svg class="h-4 w-4"><use href="#dept-mark"/></svg></button>
      <span class="flex items-baseline text-[13px] font-black leading-none tracking-[0.06em] text-foreground" style="font-weight:900">
        <span>DEPT</span><span class="mx-[2px]">/</span>
        <span class="inline-block overflow-hidden" style="height:1em;line-height:1"><span class="inline-block">RENDER</span></span>
      </span>
    </div>
    <nav class="flex border-b border-border/40 px-1">
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-text"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">TEXT</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-sheets"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">SHEETS</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-dupes"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">DUPES</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-accent px-1 pt-2 pb-1.5 -mb-px text-foreground"><svg class="h-4 w-4"><use href="#ic-render"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">RENDER</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-cleanup"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">CLEANUP</span></button>
    </nav>

    <!-- RenderPage.tsx -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-3 py-2">
      <!-- Scope section -->
      <div class="space-y-1">
        <h2 class="flex items-center text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Scope
          <span class="ml-auto"><svg class="h-3 w-3 text-muted-foreground"><use href="#lc-refresh-cw"/></svg></span>
        </h2>
        <div class="flex rounded-md border border-input bg-background p-0.5" style="gap:2px">
          <button class="flex-1 rounded-[5px] py-1.5 text-[8px] font-semibold tracking-[0.08em] bg-accent text-accent-foreground">ACTIVE COMP</button>
          <button class="flex-1 rounded-[5px] py-1.5 text-[8px] font-semibold tracking-[0.08em] text-muted-foreground">SELECTED · 4</button>
        </div>
      </div>
      <!-- Render section -->
      <div class="space-y-1">
        <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Render</h2>
        <div class="flex gap-2">
          <button class="btn h-9 flex-1 bg-accent text-accent-foreground gap-1.5 text-[9px] tracking-[0.08em]">
            <svg class="h-3.5 w-3.5"><use href="#lc-play"/></svg>Render Active
          </button>
          <button class="btn btn-outline h-9 flex-1 gap-1.5 text-[9px] tracking-[0.08em]">
            <svg class="h-3.5 w-3.5"><use href="#lc-plus"/></svg>Add to Queue
          </button>
        </div>
      </div>
      <!-- Selection section -->
      <div class="space-y-1">
        <h2 class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Selection</h2>
        <div>
          <button class="action-row"><svg><use href="#lc-crosshair"/></svg><span>Select Comps in Folder</span></button>
          <button class="action-row"><svg><use href="#ic-sheets"/></svg><span>Create Contact Sheet · 4</span></button>
        </div>
      </div>
    </div>
  </div>
  <div class="caption">RENDER tab</div>
</div>
`

export function Render() {
  return (
    <Section id="render">
      <SectionHeader kicker="CHAPTER 07" title="Render." />
      <p className="lede">
        Scope, render, and two project utilities. Pick whether you're targeting
        the active comp or a project-panel selection, then render or queue.
        Two additional actions let you select all comps in a folder at once,
        or build a contact sheet from the detected comps.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={renderMockup} />

          <Callout variant="tip">
            <strong>Render settings &amp; output module</strong>
            Typecast uses whatever defaults you've set in After Effects'
            render queue. Adjust the templates there once and they'll be picked
            up on every render.
          </Callout>
        </div>

        <div className="col">
          <h3>The actions</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-play"/></svg></div>
              <div className="meta">
                <div className="name">Render Active / Render <em>N</em></div>
                <div className="body">Queues the comp(s) and starts the render queue immediately. When a project-panel selection is detected the label becomes <strong>Render&nbsp;<em>N</em></strong> (e.g. "Render&nbsp;4"); with no selection it reads <strong>Render&nbsp;Active</strong> for the currently open comp.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-plus"/></svg></div>
              <div className="meta">
                <div className="name">Add to Queue</div>
                <div className="body">Adds the active comp (or the detected selection) to the After Effects render queue <em>without starting it</em>. Use this to stage several batches before committing a single render run.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-crosshair"/></svg></div>
              <div className="meta">
                <div className="name">Select Comps in Folder</div>
                <div className="body">Selects every deliverable comp inside the active project folder, so you can immediately drive the Render or Add to Queue buttons with a full-folder scope. Comps whose names start with <span className="mono">!!</span> are skipped.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#ic-sheets"/></svg></div>
              <div className="meta">
                <div className="name">Create Contact Sheet</div>
                <div className="body">Builds a single review comp that tiles thumbnails of all detected comps across labelled sections. When comps are detected the label shows a count: <strong>Create Contact Sheet&nbsp;·&nbsp;<em>N</em></strong>.</div>
              </div>
            </div>
          </div>

          <Callout variant="tip">
            <strong>Scope auto-switches</strong>
            The panel polls for a Project-panel selection every 0.5&nbsp;s.
            When comps are detected the scope jumps to
            <strong>SELECTED</strong> automatically and the button label
            updates to show the count. Clear the selection and it returns to
            <strong>ACTIVE COMP</strong>. You can always override by clicking
            either side of the control manually.
          </Callout>
        </div>
      </div>

      <DemoSlot src="demos/contact-sheet.gif" caption="Creating a contact sheet from the detected comps." />
    </Section>
  )
}
