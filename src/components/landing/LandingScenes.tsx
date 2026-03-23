import type { ReactNode } from 'react'
import type { SceneVariant } from './types'

const soLogo = '/so_logo.svg'

const dashboardChannels = [
  { id: 'project-visor', title: 'project:visor', preview: 'Visor bulletin generated and delivered.', members: '3 members' },
  { id: 'review-queue', title: 'review:queue', preview: 'New diff ready for human approval.', members: '2 members' },
  { id: 'ops-bridge', title: 'ops:bridge', preview: 'Telegram message routed into channel runtime.', members: '4 members' }
]

const dashboardStats = [
  { label: 'Open channels', value: '12', delta: '+3 today' },
  { label: 'Active workers', value: '7', delta: '2 waiting input' },
  { label: 'Artifacts emitted', value: '38', delta: 'Across 5 projects' },
  { label: 'Bulletins', value: '5', delta: 'Fresh in 9m' }
]

function DashboardFrame({
  title,
  status,
  kicker,
  children,
  className = '',
  hideHead = false
}: {
  title: string
  status: string
  kicker?: string
  children: ReactNode
  className?: string
  hideHead?: boolean
}) {
  return (
    <div className={`scene-window ${className}`.trim()}>
      <div className="scene-window__bar">
        <div className="scene-window__traffic">
          <span />
          <span />
          <span />
        </div>
        <div className="scene-window__title">
          <img src={soLogo} alt="" />
          <span>{title}</span>
        </div>
        <div className="scene-window__status">{status}</div>
      </div>

      <div className="scene-shell">
        <aside className="scene-rail">
          <div className="scene-rail__logo">
            <img src={soLogo} alt="Sloppy" className="scene-rail__logo-image" />
          </div>
          <div className="scene-rail__nav">
            {['dashboard', 'folder', 'monitoring', 'groups', 'settings', 'description'].map((icon, index) => (
              <div key={icon} className={`scene-rail__item${index === 0 ? ' is-active' : ''}`}>
                <span className="material-symbols-rounded">{icon}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="scene-main">
          {!hideHead && (
            <div className="scene-main__head">
              <div>
                <p className="scene-main__eyebrow">Runtime view</p>
                <h3>{title}</h3>
              </div>
              {kicker ? <span className="scene-kicker">{kicker}</span> : null}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

function HeroScene() {
  return (
    <DashboardFrame title="Operator Snapshot" status="session live" kicker="Q1 system pulse">
      <div className="scene-grid scene-grid--hero">
        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Active Channels</span>
            <span className="badge">3 hot</span>
          </div>
          <div className="channel-stack">
            {dashboardChannels.map((channel) => (
              <article key={channel.id} className="channel-tile">
                <div className="channel-tile__top">
                  <span className="channel-dot" />
                  <strong>{channel.title}</strong>
                  <span>{channel.members}</span>
                </div>
                <p>{channel.preview}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>System Status</span>
            <span className="badge badge--success">stable</span>
          </div>
          <div className="stat-grid">
            {dashboardStats.map((stat) => (
              <article key={stat.label} className="stat-tile">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.delta}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Review + Bulletins</span>
            <span className="badge badge--accent">visible</span>
          </div>
          <div className="ticker-list">
            {[
              'review/api-diff flagged 2 unresolved comments',
              'visor digest summarized 4 operator-facing changes',
              'channel route moved support issue into worker flow',
              'artifact bundle persisted to project workspace'
            ].map((item) => (
              <div key={item} className="ticker-item">
                <span className="ticker-item__pulse" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardFrame>
  )
}

function RuntimeScene() {
  return (
    <DashboardFrame title="Routing Board" status="[>_ SECURE_SESSION_ACTIVE // PID: 9284]" hideHead>
      <section className="routing-board-scene">
        <div className="routing-board-scene__canvas">
          <div className="routing-board-scene__grid" />

          <div
            className="routing-team-group"
            style={{ left: '48%', top: '2%', width: '44%', height: '70%' }}
          >
            <span className="routing-team-label">
              <span className="routing-team-dot" />
              Core Team
            </span>
          </div>

          <svg className="routing-board-links" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 350 280 C 420 280, 460 250, 540 250" className="routing-link routing-link--peer" />
            <path d="M 350 280 C 420 280, 460 250, 540 250" className="routing-link-flow routing-link-flow--peer" />
            <path d="M 630 140 C 630 175, 630 185, 630 220" className="routing-link routing-link--hierarchical" />
            <path d="M 630 140 C 630 175, 630 185, 630 220" className="routing-link-flow routing-link-flow--hierarchical" />
            <path d="M 630 310 C 630 350, 630 380, 630 420" className="routing-link routing-link--hierarchical" />
            <path d="M 630 310 C 630 350, 630 380, 630 420" className="routing-link-flow routing-link-flow--hierarchical" />
            <text x="445" y="252" className="routing-link-label">chat</text>
            <text x="650" y="178" className="routing-link-label">task</text>
            <text x="650" y="365" className="routing-link-label">chat</text>
          </svg>

          <div className="routing-node routing-node--human" style={{ left: '17%', top: '34%' }}>
            <span className="routing-node__socket routing-node__socket--top" />
            <span className="routing-node__socket routing-node__socket--right" />
            <span className="routing-node__socket routing-node__socket--bottom" />
            <span className="routing-node__socket routing-node__socket--left" />
            <strong>Dispatcher</strong>
            <span>human:dispatcher</span>
            <small>HUMAN</small>
          </div>

          <div className="routing-node routing-node--agent" style={{ left: '54%', top: '8%' }}>
            <span className="routing-node__socket routing-node__socket--top" />
            <span className="routing-node__socket routing-node__socket--right" />
            <span className="routing-node__socket routing-node__socket--bottom" />
            <span className="routing-node__socket routing-node__socket--left" />
            <strong>Happy Path Agent</strong>
            <span>agent:happy-path-agent</span>
            <small>AGENT</small>
          </div>

          <div className="routing-node routing-node--human is-selected" style={{ left: '54%', top: '33%' }}>
            <span className="routing-node__socket routing-node__socket--top" />
            <span className="routing-node__socket routing-node__socket--right" />
            <span className="routing-node__socket routing-node__socket--bottom" />
            <span className="routing-node__socket routing-node__socket--left" />
            <strong>Admin</strong>
            <span>human:admin</span>
            <small>HUMAN</small>
          </div>

          <div className="routing-node routing-node--agent" style={{ left: '54%', top: '62%' }}>
            <span className="routing-node__socket routing-node__socket--top" />
            <span className="routing-node__socket routing-node__socket--right" />
            <span className="routing-node__socket routing-node__socket--bottom" />
            <span className="routing-node__socket routing-node__socket--left" />
            <strong>CEO</strong>
            <span>agent:ceo</span>
            <small>AGENT</small>
          </div>

          <div className="routing-board-hint">
            <p>Drag between handles to link</p>
            <p>Top/Bottom → Hierarchical</p>
            <p>Left/Right → Peer</p>
            <button type="button">+ New Actor</button>
            <button type="button">+ New Team</button>
          </div>
        </div>

        <div className="routing-board-scene__footer">
          Loaded 4 actors
        </div>
      </section>
    </DashboardFrame>
  )
}

function DashboardScene() {
  return (
    <DashboardFrame title="Runtime Overview" status="operators online" kicker="dashboard parity">
      <div className="scene-grid scene-grid--dashboard">
        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>System Metrics</span>
            <span className="badge">overview</span>
          </div>
          <div className="stat-grid">
            {dashboardStats.map((stat) => (
              <article key={stat.label} className="stat-tile">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.delta}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Active Channels</span>
            <span className="badge badge--success">updated 14s ago</span>
          </div>
          <div className="channel-stack">
            {dashboardChannels.map((channel) => (
              <article key={channel.id} className="channel-tile channel-tile--with-lines">
                <div className="channel-tile__top">
                  <span className="channel-dot" />
                  <strong>{channel.title}</strong>
                  <span>{channel.members}</span>
                </div>
                <div className="channel-lines">
                  <span>10:24a operator Investigate rollout state.</span>
                  <span>10:25a bot Routing to branch and review worker.</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Bulletins</span>
            <span className="badge badge--accent">visor</span>
          </div>
          <div className="bulletin-list">
            {[
              {
                headline: 'Search rollout stabilized',
                body: '2 workers completed, 1 review waiting, artifacts persisted to project.'
              },
              {
                headline: 'Support bridge active',
                body: 'Discord ingress mapped to channel ops-bridge with approval checks enforced.'
              }
            ].map((bulletin) => (
              <article key={bulletin.headline} className="bulletin-card">
                <strong>{bulletin.headline}</strong>
                <p>{bulletin.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardFrame>
  )
}

const projectColumns: {
  id: string
  title: string
  tasks: { id: string; title: string; priority: string; desc?: string; agent?: string; assignee?: string }[]
}[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: [
      { id: '142', title: 'Audit support channel logs', priority: 'low' },
      { id: '156', title: 'Configure artifact retention', desc: 'Set TTL policies for workspace artifacts', priority: 'medium' },
      { id: '161', title: 'Update onboarding flow', priority: 'low' }
    ]
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    tasks: [
      { id: '131', title: 'Implement search indexer', desc: 'Full-text search with tokenizers', priority: 'high', agent: 'Happy Path' },
      { id: '144', title: 'Patch provider failover', priority: 'medium', assignee: 'Dispatcher' }
    ]
  },
  {
    id: 'needs_review',
    title: 'Needs Review',
    tasks: [
      { id: '127', title: 'Review API rate limiting', desc: 'Rate limiter for project endpoints', priority: 'medium', assignee: 'Admin' }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '119', title: 'Setup CI/CD pipeline', priority: 'low', agent: 'CEO' },
      { id: '122', title: 'Deploy monitoring stack', priority: 'medium' }
    ]
  }
]

function ProjectsScene() {
  return (
    <DashboardFrame title="Project Operations" status="3 projects active" kicker="tasks + channels + artifacts">
      <section className="ps-scene">
        <div className="ps-head">
          <div className="ps-summary">
            <span className="ps-pill">
              <span className="material-symbols-rounded">list_alt</span>
              9 tasks
            </span>
            <span className="ps-pill">
              <span className="material-symbols-rounded">pending_actions</span>
              2 in progress
            </span>
          </div>
          <span className="ps-create-btn">Create Task</span>
        </div>

        <div className="ps-board">
          {projectColumns.map((col) => (
            <div key={col.id} className="ps-col">
              <div className={`ps-col-head ps-col-head--${col.id}`}>
                <span>{col.title}</span>
                <strong>{col.tasks.length}</strong>
              </div>
              <div className="ps-col-body">
                {col.tasks.map((task) => (
                  <article key={task.id} className="ps-card">
                    <div className="ps-card-top">
                      <span className="ps-task-id">#{task.id}</span>
                    </div>
                    <h5>{task.title}</h5>
                    {task.desc && <p>{task.desc}</p>}
                    <div className="ps-card-meta">
                      <span className={`ps-priority ps-priority--${task.priority}`}>
                        <span className="material-symbols-rounded">flag</span>
                        {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
                      </span>
                      {(task.agent || task.assignee) && (
                        <span className={`ps-assignee${task.agent ? ' ps-assignee--agent' : ''}`}>
                          <span className="material-symbols-rounded">{task.agent ? 'smart_toy' : 'person'}</span>
                          {task.agent || task.assignee}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ps-modal-overlay">
          <div className="ps-modal">
            <div className="ps-modal-body">
              <span className="ps-modal-typewriter">Integrate Slack webhook alerts</span>
              <span className="ps-modal-desc">
                Connect Slack incoming webhooks to project channels. Route task updates, review completions and artifact alerts as formatted messages.
              </span>
            </div>
            <div className="ps-modal-toolbar">
              <div className="ps-modal-chips">
                <span className="ps-modal-chip">
                  <span className="ps-status-dot" />
                  Backlog
                </span>
                <span className="ps-modal-chip">
                  <span className="material-symbols-rounded">flag</span>
                  Medium
                </span>
                <span className="ps-modal-chip">
                  <span className="material-symbols-rounded">smart_toy</span>
                  CEO Agent
                </span>
              </div>
              <span className="ps-modal-create-btn">Create</span>
            </div>
          </div>
        </div>

        <div className="ps-cursor" aria-hidden="true">
          <svg viewBox="0 0 16 22" width="20" height="28" fill="none">
            <path d="M1 1v18l4.5-4.5L9 22l3-1.5L8.5 13H15L1 1z" fill="#fff" stroke="#1a1a2e" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </div>
      </section>
    </DashboardFrame>
  )
}

function ReviewScene() {
  return (
    <DashboardFrame title="Task Review" status="2 unresolved comments" kicker="approve or reject">
      <div className="scene-grid scene-grid--review">
        <section className="scene-review-diff">
          <div className="scene-review-diff__toolbar">
            <span>Unified diff</span>
            <span className="badge badge--success">+338 −1</span>
          </div>
          <div className="scene-review-diff__layout">
            <aside className="scene-review-files">
              {[
                'search-config.json',
                'demo-search.ts',
                'tokenize.ts',
                'SearchBox.tsx'
              ].map((file, index) => (
                <div key={file} className={`review-file${index === 0 ? ' is-active' : ''}`}>
                  <span>{file}</span>
                  <small>{index === 0 ? '+6 -1' : `+${42 + index * 17} -0`}</small>
                </div>
              ))}
            </aside>

            <div className="scene-review-code">
              {[
                { line: 1, type: 'plain', text: '{' },
                { line: 2, type: 'plain', text: '  "siteIndex": "https://kotlinlang.org/search",'},
                { line: 3, type: 'remove', text: '  "playgroundIndex": "https://play.kotlinlang.org/search",' },
                { line: 4, type: 'add', text: '  "playgroundIndex": "/api/demo-search",' },
                { line: 5, type: 'add', text: '  "demoEnabled": true,' },
                { line: 6, type: 'add', text: '  "demoNotes": "Do not ship to production",' },
                { line: 7, type: 'plain', text: '  "indexVersion": "2.1.0",' },
                { line: 8, type: 'plain', text: '  "cacheTTL": 300' },
                { line: 9, type: 'plain', text: '}' }
              ].map((row) => (
                <div key={row.line} className={`code-row code-row--${row.type}`}>
                  <span className="code-row__line">{row.line}</span>
                  <code>{row.text}</code>
                  {row.line === 4 ? <span className="code-comment-pin" /> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="scene-review-sidebar">
          <div className="scene-panel scene-panel--fill">
            <div className="scene-panel__head">
              <span>Review chat</span>
              <span className="badge">assistant + operator</span>
            </div>
            <div className="chat-thread">
              <div className="chat-bubble chat-bubble--assistant">
                Flagged the index override. Safe for demo mode, risky for production rollout.
              </div>
              <div className="chat-bubble">
                Please keep demo mode but add a stronger guard before approval.
              </div>
              <div className="chat-bubble chat-bubble--assistant">
                Updating recommendation and leaving a line comment on the config change.
              </div>
            </div>
          </div>

          <div className="review-actions">
            <button type="button" className="review-actions__button review-actions__button--danger">
              Reject
            </button>
            <button type="button" className="review-actions__button review-actions__button--success">
              Approve
            </button>
          </div>
        </section>
      </div>
    </DashboardFrame>
  )
}

function ChannelsScene() {
  return (
    <DashboardFrame title="Channel Bridge" status="telegram + discord live" kicker="entry points stay coherent">
      <div className="scene-grid scene-grid--channels">
        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Inbound channels</span>
            <span className="badge">3 connected</span>
          </div>
          <div className="inbox-list">
            {[
              { name: 'Telegram / Support Ops', state: 'allowed' },
              { name: 'Discord / Dev Infra', state: 'allowed' },
              { name: 'Telegram / External QA', state: 'pending approval' }
            ].map((item, index) => (
              <div key={item.name} className="inbox-row">
                <span className={`badge ${index < 2 ? 'badge--success' : ''}`}>{item.state}</span>
                <strong>{item.name}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="scene-panel scene-panel--fill">
          <div className="scene-panel__head">
            <span>Routed conversation</span>
            <span className="badge badge--accent">ops-bridge</span>
          </div>
          <div className="chat-thread chat-thread--tall">
            <div className="chat-bubble">Telegram user: Search rollout is failing for demo traffic.</div>
            <div className="chat-bubble chat-bubble--assistant">
              Sloppy: Routed into branch review workflow and created a project task.
            </div>
            <div className="chat-bubble chat-bubble--assistant">
              Sloppy: Waiting on operator review before posting the remediation note back to the channel.
            </div>
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Approvals + handoffs</span>
            <span className="badge">guardrails</span>
          </div>
          <div className="approval-stack">
            {[
              'verification code requested for new QA user',
              'approved channel user synced to policy store',
              'handoff sent to review:alpha with linked task'
            ].map((item) => (
              <div key={item} className="approval-row">
                <span className="ticker-item__pulse" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardFrame>
  )
}

function AgentsScene() {
  return (
    <DashboardFrame title="Agent Configuration" status="ceo agent selected" kicker="providers + tools + cron">
      <div className="scene-grid scene-grid--agents">
        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Model providers</span>
            <span className="badge badge--success">4 available</span>
          </div>
          <div className="provider-grid">
            {[
              { name: 'OpenAI', state: 'selected' },
              { name: 'Gemini', state: 'ready' },
              { name: 'Anthropic', state: 'ready' },
              { name: 'Ollama', state: 'local' }
            ].map((provider, index) => (
              <div key={provider.name} className={`provider-card${index === 0 ? ' is-active' : ''}`}>
                <strong>{provider.name}</strong>
                <span>{provider.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Tool policy</span>
            <span className="badge">gated</span>
          </div>
          <div className="toggle-list">
            {[
              { name: 'exec_command', enabled: true },
              { name: 'file_edit', enabled: true },
              { name: 'memory_save', enabled: true },
              { name: 'web_search', enabled: false }
            ].map((tool) => (
              <div key={tool.name} className="toggle-row">
                <span>{tool.name}</span>
                <span className={`toggle-pill${tool.enabled ? ' is-on' : ''}`}>
                  <span />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Installed skills</span>
            <span className="badge badge--accent">3 active</span>
          </div>
          <div className="mini-list">
            {['swift-concurrency', 'playwright', 'openai-docs'].map((skill) => (
              <div key={skill} className="mini-list__row">
                <span className="material-symbols-rounded">extension</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="scene-panel">
          <div className="scene-panel__head">
            <span>Cron jobs</span>
            <span className="badge">scheduled</span>
          </div>
          <div className="cron-list">
            <div className="cron-row">
              <strong>0 9 * * 1-5</strong>
              <span>Post daily runtime digest</span>
            </div>
            <div className="cron-row">
              <strong>*/15 * * * *</strong>
              <span>Check review queue health</span>
            </div>
          </div>
        </section>
      </div>
    </DashboardFrame>
  )
}

export function LandingScene({ variant }: { variant: SceneVariant }) {
  switch (variant) {
    case 'hero':
      return <HeroScene />
    case 'runtime':
      return <RuntimeScene />
    case 'dashboard':
      return <DashboardScene />
    case 'projects':
      return <ProjectsScene />
    case 'review':
      return <ReviewScene />
    case 'channels':
      return <ChannelsScene />
    case 'agents':
      return <AgentsScene />
    default:
      return null
  }
}
