import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { DemoSlot } from '../components/DemoSlot'

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
          <img src="assets/screencaps/Render Page.png" alt="render" />

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
