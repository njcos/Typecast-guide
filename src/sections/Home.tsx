import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { RawHtml } from '../components/RawHtml'

const homeMockup = `
<div class="shot">
  <div class="cep-panel">
    <div class="flex h-8 items-center gap-3 border-b border-border/40 px-3">
      <button class="text-foreground"><svg class="h-4 w-4"><use href="#dept-mark"/></svg></button>
      <span class="flex items-baseline text-[13px] font-black leading-none tracking-[0.06em] text-foreground" style="font-weight:900">
        <span>DEPT</span><span class="mx-[2px]">/</span>
        <span class="inline-block overflow-hidden" style="height:1em;line-height:1"><span class="inline-block">TYPECAST</span></span>
      </span>
    </div>
    <nav class="flex border-b border-border/40 px-1">
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-text"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">TEXT</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-sheets"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">SHEETS</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-dupes"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">DUPES</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-render"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">RENDER</span></button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground"><svg class="h-4 w-4"><use href="#ic-cleanup"/></svg><span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">CLEANUP</span></button>
    </nav>

    <!-- TypecastPage.tsx — about card + license status bar -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col px-3 py-2">
      <div class="flex flex-1 flex-col overflow-hidden">
        <section class="relative overflow-hidden rounded-md border border-border/40 bg-card/40 px-4 py-4 mt-2">
          <button class="flex w-full items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground" aria-expanded="true">
            <span>ABOUT&nbsp;&middot;&nbsp;TYPECAST</span>
            <svg class="h-3 w-3 shrink-0 opacity-50 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="flex flex-col items-center text-center">
            <div class="mt-3 h-px w-8 bg-border/60"></div>
            <p class="mt-3 text-left normal-case tracking-normal text-xs leading-relaxed text-foreground/75">
              Typecast is a proprietary CEP extension for Adobe After Effects developed in-house to power DEPT&rsquo;s multilingual production. It transforms the tedious process of localizing motion graphics by swapping text across dozens of languages and managing bulk renders into a streamlined few-click workflow. By housing DEPT&rsquo;s custom automation logic within a modern UI docked right next to the timeline, Typecast eliminates the manual overhead of global creative delivery.
            </p>
            <div class="mt-3 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/70">v1.1.0</div>
          </div>
        </section>
      </div>
    </div>
    <!-- LicenseStatusBar.tsx -->
    <button class="flex w-full shrink-0 items-center gap-2 border-t border-border/40 px-3 py-2 text-left text-[11px] tracking-[0.08em] text-muted-foreground">
      <span class="h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
      <span class="min-w-0 flex-1 truncate">License active</span>
      <span class="text-[10px] tracking-[0.1em] text-muted-foreground/70">Manage</span>
    </button>
  </div>
  <div class="caption">Home screen with active license</div>
</div>
`

export function Home() {
  return (
    <Section id="home">
      <SectionHeader kicker="CHAPTER 03" title="Home / Typecast." />
      <p className="lede">
        The landing screen. It's reached from any other tab by clicking the DEPT
        mark in the brand header. An expandable about card sits at the top; a
        license status bar along the bottom opens the full license settings in a
        dialog when clicked.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={homeMockup} />

          <Callout variant="tip">
            <strong>Why the mask</strong>
            The key is never shown in full so screenshots, screen-shares, and
            Slack pastes don't leak it. The DEPT administrator can always look
            the key up server-side.
          </Callout>
        </div>

        <div className="col">
          <h3>What's here</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#dept-mark"/></svg></div>
              <div className="meta">
                <div className="name">About card</div>
                <div className="body">Collapsible. Click the <strong>ABOUT · TYPECAST</strong> toggle to expand or collapse the blurb. When open it shows a short description of what Typecast is and the current version number.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x={3} y={11} width={18} height={11} rx={2}/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
              <div className="meta">
                <div className="name">License status bar</div>
                <div className="body">A persistent bar along the bottom of the panel. Shows a coloured dot (green = active, red = problem, grey = no key), a state label, and a <strong>Manage</strong> affordance. Clicking it opens a dialog with the full license settings.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-refresh-cw"/></svg></div>
              <div className="meta">
                <div className="name">Re-check <em>(in license dialog)</em></div>
                <div className="body">Forces a verification right now. Use this if you've just been re-issued a key, or if you want to confirm you're connected before going offline.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-trash-2"/></svg></div>
              <div className="meta">
                <div className="name">Remove <em>(in license dialog)</em></div>
                <div className="body">Clears the saved key from this machine. The panel locks out immediately and prompts for a new key.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
