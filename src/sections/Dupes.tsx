import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { DemoSlot } from '../components/DemoSlot'

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
          <img src="assets/screencaps/Dupes Page.png" alt="dupes" />

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

      <DemoSlot src="assets/webm/dups.webm" caption="Choosing a source folder and target languages, then duplicating." media />

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
          <DemoSlot src="assets/webm/csv-mismatch.webm" caption="Resolving an unmatched language header in the mapping window." w={382} h={239} media />
        </div>
      </div>
    </Section>
  )
}
