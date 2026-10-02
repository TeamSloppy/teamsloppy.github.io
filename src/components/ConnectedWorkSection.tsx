import { Sloppie } from './Sloppie'

const tasks = [
  ['Inspect the project', 'Findings returned to the main chat', 'Done'],
  ['Implement the changes', 'Working in a separate session', 'Running'],
  ['Verify the result', 'Starts after implementation', 'Queued'],
]

export function ConnectedWorkSection() {
  return (
    <>
      <section id="long-chats" className="refresh-section connected-work">
        <div className="refresh-container connected-work__grid">
          <div className="connected-work__copy">
            <span className="refresh-eyebrow">Long Chats</span>
            <h2>Keep talking.<br />Let the work move.</h2>
            <p>
              Give your project a lasting conversation with your agent. A
              coordinator delegates work to separate worker sessions and brings
              their results back, so you can keep talking while tasks run.
            </p>
            <ul className="connected-work__benefits">
              <li>A persistent main chat for your project</li>
              <li>Parallel workers with task dependencies</li>
              <li>Inspect, clarify, cancel, or retry tasks</li>
              <li>Results, evidence, and artifacts in one thread</li>
            </ul>
            <p className="connected-work__note">
              For native Sloppy agents, in the app and dashboard.
            </p>
          </div>

          <div className="connected-preview" aria-hidden="true">
            <div className="connected-preview__header">
              <strong>Project / Main chat</strong><span>Example workspace</span>
            </div>
            <div className="long-chat-message long-chat-message--user">
              <span>You</span><p>Build the new search flow and verify it.</p>
            </div>
            <div className="long-chat-message">
              <span>Coordinator</span>
              <p>I’ll split the work into tasks. You can keep talking here while the workers run.</p>
            </div>
            <div className="long-chat-tasks">
              <span className="refresh-eyebrow">Assignment / Search flow</span>
              {tasks.map(([title, detail, status]) => (
                <div className="long-chat-task" key={title}>
                  <div><strong>{title}</strong><p>{detail}</p></div>
                  <span className={`connected-preview__badge${status === 'Running' ? ' connected-preview__badge--accent' : ''}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div className="connected-preview__footer">One conversation. Separate worker sessions.</div>
          </div>
        </div>
      </section>

      <section id="console" className="refresh-section connected-work connected-work--console">
        <div className="refresh-container connected-work__grid">
          <div className="connected-work__copy">
            <span className="refresh-eyebrow">Meet Sloppy Console</span>
            <h2>Your Sloppy.<br />Connected on your terms.</h2>
            <p>
              One place for your account, instances, and trusted devices. Connect
              the Sloppy you run on your own machines and manage who can reach
              each instance.
            </p>
            <ul className="connected-work__benefits">
              <li>Your instances, together under one account</li>
              <li>Trusted devices and explicit access approvals</li>
              <li>Team access to shared instances</li>
              <li>Agents and project contents stay on your machines</li>
            </ul>
            <a className="refresh-button refresh-button--primary" href="https://console.sloppy.team/" target="_blank" rel="noreferrer">
              Open Console <span aria-hidden="true">↗</span>
            </a>
            <p className="connected-work__note">Optional by design. Local first, always.</p>
          </div>

          <div className="connected-preview" aria-hidden="true">
            <div className="connected-preview__header">
              <strong>Sloppy Console</strong><span>Example workspace</span>
            </div>
            <div className="console-account">
              <Sloppie shape="diamond" />
              <div><span className="refresh-eyebrow">One account</span><strong>Your Sloppy, connected</strong></div>
            </div>
            <div className="console-instances">
              <div><span>01</span><div><strong>Personal Sloppy</strong><p>Your machine · Local execution</p></div></div>
              <div><span>02</span><div><strong>Team Sloppy</strong><p>Your server · Shared access</p></div></div>
            </div>
            <div className="console-trust">
              <span className="connected-preview__badge connected-preview__badge--accent">Explicit trust</span>
              <span className="connected-preview__badge">Encrypted connections</span>
            </div>
            <div className="connected-preview__footer">Your projects stay on your instances.</div>
          </div>
        </div>
      </section>
    </>
  )
}
