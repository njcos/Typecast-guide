import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { KeyValueTable } from '../components/KeyValueTable'
import { StepList } from '../components/StepList'
import { DemoSlot } from '../components/DemoSlot'

export function Overview() {
  return (
    <Section id="overview">
      <SectionHeader kicker="CHAPTER 01" title="Overview & install." />

      <div className="cols-3-2">
        <div className="col">
          <p>
            Typecast is a CEP extension that docks inside After Effects and
            handles every step of multilingual production: scanning a comp for
            text, building an Edit Comp you can translate from, duplicating a
            folder of comps per language, applying the right font per language,
            and queueing the renders. It is DEPT's tool — it ships only to
            licensed machines.
          </p>

          <h3>What it does for you</h3>
          <ul>
            <li><strong>Scan</strong> any comp for translatable text layers.</li>
            <li><strong>Tag</strong> which layers should appear in the Edit Comp.</li>
            <li><strong>Build</strong> a single Edit Comp that drives all language variants by expression.</li>
            <li><strong>Translate</strong> by editing one comp, exporting to CSV / Sheets, or pulling translations back from a sheet.</li>
            <li><strong>Apply</strong> the correct font automatically for each language using the platform font map.</li>
            <li><strong>Render</strong> the active or selected comps, or queue them.</li>
            <li><strong>NoIP</strong> the project for vendor handoff — strip all expressions and master comps in one step.</li>
          </ul>

          <h3>System requirements</h3>
          <KeyValueTable>
            <tr><th>Host</th><td>Adobe After Effects 2023 or later</td></tr>
            <tr><th>Platform</th><td>macOS or Windows</td></tr>
            <tr><th>Network</th><td>Required at activation; license re-checks every 24 hours with a 7-day grace window</td></tr>
            <tr><th>License</th><td>Per-machine key issued by your DEPT administrator</td></tr>
          </KeyValueTable>
        </div>

        <div className="col">
          <h3>Install</h3>
          <StepList>
            <li>Quit After Effects.</li>
            <li>Double-click the supplied <span className="mono">.zxp</span> with Anastasiy's Extension Manager (or use the included installer).</li>
            <li>Launch After Effects.</li>
            <li>Open <strong>Window → Extensions → Typecast</strong>. Dock the panel wherever you keep your tools — most people dock it next to the timeline.</li>
            <li>Enter your license key on the home screen and click <strong>Save</strong>.</li>
          </StepList>

          <Callout variant="tip">
            <strong>Tip</strong>
            Once activated, the panel verifies in the background every 24 hours.
            You can keep working offline for up to seven days before access is
            paused.
          </Callout>
        </div>
      </div>

      <h3>Daily flow at a glance</h3>
      <div className="statrow cols-3">
        <div className="statcard"><div className="num">01</div><div className="lbl">Scan &amp; Tag</div></div>
        <div className="statcard"><div className="num">02</div><div className="lbl">Edit Comp</div></div>
        <div className="statcard"><div className="num">03</div><div className="lbl">Translate</div></div>
        <div className="statcard"><div className="num">04</div><div className="lbl">Duplicate</div></div>
        <div className="statcard"><div className="num">05</div><div className="lbl">Render</div></div>
        <div className="statcard"><div className="num">06</div><div className="lbl">Cleanup</div></div>
      </div>

      <DemoSlot src="demos/daily-flow.gif" caption="The end-to-end loop: scan, tag, build, sheets, dupes, render." />
    </Section>
  )
}
