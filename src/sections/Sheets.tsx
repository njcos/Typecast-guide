import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { KeyValueTable } from '../components/KeyValueTable'

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
          <img src="assets/screencaps/Sheets Page.png" alt="sheets" />
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
