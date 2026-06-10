import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { RawHtml } from '../components/RawHtml'

const panelMockup = `
<div class="shot">
  <div class="cep-panel">
    <div class="ae-frame">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      <span style="margin-left:6px">Typecast</span>
    </div>
    <!-- BrandHeader.tsx -->
    <div class="flex h-8 items-center gap-3 border-b border-border/40 px-3">
      <button class="text-foreground">
        <svg class="h-4 w-4"><use href="#dept-mark"/></svg>
      </button>
      <span class="flex items-baseline text-[13px] font-black leading-none tracking-[0.06em] text-foreground" style="font-weight:900">
        <span>DEPT</span><span class="mx-[2px]">/</span>
        <span class="inline-block overflow-hidden" style="height:1em;line-height:1"><span class="inline-block">SHEETS</span></span>
      </span>
    </div>
    <!-- NavRail.tsx -->
    <nav class="flex border-b border-border/40 px-1">
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground">
        <svg class="h-4 w-4"><use href="#ic-text"/></svg>
        <span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">TEXT</span>
      </button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-accent px-1 pt-2 pb-1.5 -mb-px text-foreground">
        <svg class="h-4 w-4"><use href="#ic-sheets"/></svg>
        <span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">SHEETS</span>
      </button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground">
        <svg class="h-4 w-4"><use href="#ic-dupes"/></svg>
        <span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">DUPES</span>
      </button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground">
        <svg class="h-4 w-4"><use href="#ic-render"/></svg>
        <span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">RENDER</span>
      </button>
      <button class="flex flex-1 flex-col items-center gap-1 border-b-2 border-transparent px-1 pt-2 pb-1.5 -mb-px text-muted-foreground">
        <svg class="h-4 w-4"><use href="#ic-cleanup"/></svg>
        <span class="text-[8.5px] font-semibold tracking-[0.12em]" style="white-space:nowrap">CLEANUP</span>
      </button>
    </nav>
    <!-- Content area (max-w-2xl mx-auto flex-1 flex-col gap-2 px-3 py-2) -->
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2 px-3 py-2">
      <div class="cep-toast info">Page content sits here. Each tab swaps the body; header and rail stay put.</div>
    </div>
  </div>
  <div class="caption">Typecast panel · SHEETS tab shown</div>
</div>
`

export function PanelAnatomy() {
  return (
    <Section id="panel-anatomy">
      <SectionHeader kicker="CHAPTER 02" title="The panel, top to bottom." />
      <p className="lede">
        Every screen shares the same chrome. Learn it once and you know where to
        find anything in the panel.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <RawHtml html={panelMockup} />
        </div>

        <div className="col">
          <h3>The four zones</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x={3} y={3} width={18} height={6} rx={1}/></svg></div>
              <div className="meta">
                <div className="name">01 · Brand Header</div>
                <div className="body">The DEPT asterisk on the left is the <em>home button</em> — click it from any tab to return to the about screen. The animated word right of <span className="mono">DEPT/</span> tells you which page you're on.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#ic-text"/></svg></div>
              <div className="meta">
                <div className="name">02 · Nav Rail</div>
                <div className="body">Five icons + labels: TEXT, SHEETS, DUPES, RENDER, CLEANUP. The active tab has the DEPT-orange underline. The Typecast home screen is reached via the brand-mark button, not the rail.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x={3} y={4} width={18} height={16} rx={2}/></svg></div>
              <div className="meta">
                <div className="name">03 · Page Content</div>
                <div className="body">Buttons, lists, and pickers for the current page. The panel is built for narrow widths — labels hide and icons centre when you drag the panel below ~200&nbsp;px.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 17h18" strokeLinecap="round"/><path d="M5 13h6" strokeLinecap="round"/></svg></div>
              <div className="meta">
                <div className="name">04 · Toasts &amp; Banners</div>
                <div className="body">Confirmations, warnings, and the license <em>grace banner</em> appear at the bottom edge. They don't block input — keep working while they're shown.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
