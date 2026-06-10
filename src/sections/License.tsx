import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { KeyValueTable } from '../components/KeyValueTable'
import { RawHtml } from '../components/RawHtml'

const graceBannerShot = `
<div class="shot" style="margin-top:6pt">
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
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2 px-3 py-2" style="opacity:.7">
      <button class="action-row"><svg><use href="#lc-crosshair"/></svg><span>Focus Text</span></button>
      <button class="action-row"><svg><use href="#lc-grip-vertical"/></svg><span>Reflow Layout</span></button>
    </div>
    <div class="border-t border-border bg-yellow-500/10 px-3 py-1.5 text-xs flex items-center justify-between gap-2" style="text-transform:none;letter-spacing:normal">
      <span class="text-foreground">Could not verify your license — 5 days remaining</span>
      <button class="btn btn-ghost btn-size-sm" style="font-size:12px">Re-check now</button>
    </div>
  </div>
  <div class="caption">Grace banner · 5 days remaining</div>
</div>
`

const lockoutShot = `
<div class="shot" style="margin-top:6pt">
  <div class="cep-panel">
    <main class="flex h-full flex-col items-center justify-center bg-background text-foreground px-4 py-4" style="min-height:200px">
      <div class="w-full max-w-[300px] rounded-md border border-border/60 bg-card/40 p-4">
        <h1 class="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">Your license has been revoked</h1>
        <p class="mt-2 normal-case tracking-normal text-[11px] leading-relaxed text-muted-foreground">
          Contact your administrator to restore access.
        </p>
        <div class="mt-3 space-y-2">
          <button class="btn btn-outline h-8 w-full text-[10px] tracking-[0.1em]">Re-check now</button>
          <button class="btn btn-ghost h-8 w-full text-[10px] tracking-[0.1em] text-muted-foreground">Use a different key</button>
        </div>
      </div>
    </main>
  </div>
  <div class="caption">Lockout · revoked key</div>
</div>
`

export function License() {
  return (
    <Section id="license">
      <SectionHeader kicker="CHAPTER 09" title="License states." />
      <p className="lede">
        Three things can happen with your license. Most of the time you'll
        never see anything beyond a fresh "Active" line on the home screen.
        The other two are here so you know what they mean when they appear.
      </p>

      <div className="cols">
        <div className="col no-break">
          <h3>Grace banner</h3>
          <p>
            When the panel can't reach the license server but you still have
            days of grace remaining, a yellow banner appears at the bottom edge
            of the panel. You can keep working — the count tells you how long
            until lockout.
          </p>
          <RawHtml html={graceBannerShot} />
        </div>

        <div className="col no-break">
          <h3>Lockout screen</h3>
          <p>
            When grace runs out — or the key is revoked or unknown — the
            panel replaces its entire content with a lockout card. Re-enter
            a key, ask for a Re-check, or use a different key.
          </p>
          <RawHtml html={lockoutShot} />
        </div>
      </div>

      <h3 style={{ marginTop: '14pt' }}>What each status line means</h3>
      <KeyValueTable>
        <tr><th>Active · verified N hours ago</th><td>Everything's fine. The panel re-checks in the background every 6 days.</td></tr>
        <tr><th>Couldn't verify · N days to fix</th><td>Network failure, or the server is down. You have a grace window — keep working but reconnect when you can.</td></tr>
        <tr><th>Revoked · N days to fix</th><td>An administrator has explicitly removed your key. Contact them.</td></tr>
        <tr><th>Unknown key · N days to fix</th><td>The key on this machine isn't in the records. Likely re-issued; enter the new one.</td></tr>
        <tr><th>Not yet verified</th><td>Brand-new install. The first <strong>Save</strong> will run an immediate check.</td></tr>
      </KeyValueTable>
    </Section>
  )
}
