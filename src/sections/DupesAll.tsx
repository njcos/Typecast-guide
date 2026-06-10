import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'

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
          <img src="assets/screencaps/Dupe all .png" alt="dupe all" />

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
