import { Section } from '../components/Section'
import { SectionHeader } from '../components/SectionHeader'
import { Callout } from '../components/Callout'
import { StepList } from '../components/StepList'
import { DemoSlot } from '../components/DemoSlot'

export function Cleanup() {
  return (
    <Section id="cleanup">
      <SectionHeader kicker="CHAPTER 08" title="Cleanup." />
      <p className="lede">
        Three actions to close out a project: color-code and organise the
        footage structure, crop the active comp to its content bounds, and
        NoIP — bake the Source Text expressions and strip all Typecast master
        comps before handoff.
      </p>

      <div className="cols-2-3">
        <div className="col">
          <img src="assets/screencaps/Cleanup Page.png" alt="cleanup" />
          <img src="assets/screencaps/NoIP.png" alt="NoIP" />

          <Callout variant="tip">
            <strong>One Cmd+Z</strong>
            The whole NoIP operation is wrapped in a single undo group, so a
            single <strong>Cmd+Z</strong> rolls it all back if you change your
            mind.
          </Callout>
        </div>

        <div className="col">
          <h3>The actions</h3>
          <div className="feature-list">
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-palette"/></svg></div>
              <div className="meta">
                <div className="name">Color and Organize</div>
                <div className="body">Moves footage into a dedicated folder, color-codes layers and folders, and sets comp backgrounds. Run this once before handoff to make the project legible to anyone opening it cold.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#lc-crosshair"/></svg></div>
              <div className="meta">
                <div className="name">Crop to Contents</div>
                <div className="body">Trims the active comp's dimensions to the exact bounds of its content layers. Instances of the comp elsewhere in the project are adjusted to keep them visually in place. The toast confirms the new dimensions and how many parent instances were kept in place.</div>
              </div>
            </div>
            <div className="feature">
              <div className="icon"><svg viewBox="0 0 24 24"><use href="#ic-bake"/></svg></div>
              <div className="meta">
                <div className="name">NoIP</div>
                <div className="body">The handoff strip. Bakes every Source Text expression that references a master <span className="mono">Change_Text_Here</span> layer, deletes those master comps, and prunes any parent folder left empty. A confirm dialog opens first — click <strong>NoIP</strong> to proceed or <strong>Cancel</strong> to abort.</div>
              </div>
            </div>
          </div>

          <h3 style={{marginTop:'12pt'}}>NoIP — what it does, in order</h3>
          <StepList>
            <li><strong>Bakes</strong> every Source Text expression that references the master <span className="mono">Change_Text_Here</span> layer. Each expression is evaluated once and the result is written into the layer's Source Text. The expression is then cleared.</li>
            <li><strong>Deletes</strong> every master comp whose name <em>contains</em> <span className="mono">Change_Text_Here</span>. Decorated names like <span className="mono">!!_Change_Text_Here_XX_!!</span> are caught — match is by substring.</li>
            <li><strong>Prunes</strong> any parent folder that's now empty after the comp deletions.</li>
            <li><strong>Reports</strong> baked-expression count, deleted-comp count, deleted-folder count. If any master comp couldn't be deleted, it's listed as "stuck" in a follow-up toast.</li>
          </StepList>

          <Callout variant="warn">
            <strong>Do this last</strong>
            Run NoIP <em>after</em> every language has rendered. Once a project
            is stripped, the Edit Comp workflow is gone — there's no live link
            between language variants anymore.
          </Callout>
        </div>
      </div>

      <DemoSlot src="assets/webm/noip.webm" caption="Stripping Typecast and cleaning up before handoff." media />
    </Section>
  )
}
