import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { DemoSlot } from '../components/DemoSlot'

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
          <img src="assets/screencaps/Tagging Panel.png" alt="tagging" />

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

      <DemoSlot src="assets/webm/tagging.webm" caption="Assigning tags to layers in the Tag Layers window." media />

      <h3>Common gotchas</h3>
      <ul>
        <li><strong>Tagging is per-scan.</strong> If you re-scan, you'll need to re-include anything new. Existing tags survive between scans of the same project.</li>
        <li><strong>Position expression error after dragging?</strong> The master text comp's position expression can break if a layer was dragged. Rebuild the Edit Comp (the <span className="mono">+</span> button on TEXT) to recover.</li>
        <li><strong>Don't include decorative layers.</strong> Logos, separators, and ornaments don't need translation — leaving them switched off keeps the Edit Comp focused.</li>
      </ul>
    </Section>
  )
}
