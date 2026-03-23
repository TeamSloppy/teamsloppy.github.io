import { useState, useEffect } from 'react'

const soLogo = '/so_logo.svg'

const runtimeStats = [
  { id: 'agents', icon: 'support_agent', value: '3', label: 'Agents Available', sub: 'Registered in sloppy' },
  { id: 'active', icon: 'schedule', value: '2', label: 'Tasks In Progress', sub: '2 running · 0 queued' },
  { id: 'running', icon: 'bolt', value: '2', label: 'Running Now', sub: 'Active worker processes' },
  { id: 'waiting', icon: 'hourglass_empty', value: '0', label: 'Waiting Input', sub: 'Blocked on human review' }
]

type ChannelMessage = { time: string; user: string; content: string; isBot: boolean }
type Channel = { id: string; title: string; members: string; updatedAt: string; messages: ChannelMessage[] }

const channels: Channel[] = [
  {
    id: 'agent-ceo',
    title: 'agent:ceo',
    members: '2 active',
    updatedAt: '3m ago',
    messages: [
      { time: '10:14a', user: 'tg:vlad', content: 'Prepare a weekly metrics report', isBot: false },
      { time: '10:14a', user: 'bot', content: 'Pulling data from analytics...', isBot: true },
      { time: '10:15a', user: 'bot', content: '1,240 users (+18%), retention 42%', isBot: true },
      { time: '10:16a', user: 'tg:vlad', content: 'Which channels perform best?', isBot: false },
      { time: '10:16a', user: 'bot', content: 'Telegram 38%, organic 27%, referral 19%', isBot: true },
      { time: '10:18a', user: 'tg:vlad', content: 'Draft a plan for next week', isBot: false },
      { time: '10:18a', user: 'bot', content: 'Push campaign, A/B test landing, CRM sync', isBot: true },
    ]
  },
  {
    id: 'agent-dev',
    title: 'agent:developer',
    members: '1 active',
    updatedAt: '1m ago',
    messages: [
      { time: '11:02a', user: 'github', content: 'PR #142: Add rate limiter middleware', isBot: false },
      { time: '11:02a', user: 'bot', content: 'Reviewing PR #142...', isBot: true },
      { time: '11:03a', user: 'bot', content: '2 issues: missing tests, hardcoded config', isBot: true },
      { time: '11:05a', user: 'bot', content: 'Fixed: added tests, moved config to .env', isBot: true },
      { time: '11:05a', user: 'github', content: 'All checks passed ✓', isBot: false },
      { time: '11:06a', user: 'bot', content: 'Merged to main. Deploying to staging...', isBot: true },
    ]
  },
  {
    id: 'agent-research',
    title: 'agent:researcher',
    members: '1 active',
    updatedAt: '12m ago',
    messages: [
      { time: '9:40a', user: 'slack:anna', content: 'Competitor analysis for AI-agents', isBot: false },
      { time: '9:41a', user: 'bot', content: 'Sources: Crunchbase, G2, ProductHunt...', isBot: true },
      { time: '9:45a', user: 'bot', content: '12 competitors found. Building report...', isBot: true },
      { time: '9:48a', user: 'bot', content: 'SWOT analysis ready. Sending to Notion.', isBot: true },
      { time: '9:49a', user: 'slack:anna', content: 'Add pricing comparison too', isBot: false },
      { time: '9:50a', user: 'bot', content: 'Pricing comparison added ✓', isBot: true },
    ]
  }
]

const USER_COLORS = ['#c084fc', '#67e8f9', '#f472b6', '#fbbf24', '#6ee7b7', '#fb923c']
function userColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return USER_COLORS[Math.abs(hash) % USER_COLORS.length]
}

const MSG_INTERVAL = 900
const CHANNEL_OFFSET = 300

function AnimatedChannelCard({ channel, channelIndex }: { channel: Channel; channelIndex: number }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers = channel.messages.map((_, i) =>
      setTimeout(
        () => setVisibleCount(i + 1),
        channelIndex * CHANNEL_OFFSET + (i + 1) * MSG_INTERVAL
      )
    )
    return () => timers.forEach(clearTimeout)
  }, [channel.messages, channelIndex])

  return (
    <div className="channel-card">
      <div className="channel-card-head">
        <span className="channel-card-dot channel-dot-active" />
        <span className="channel-card-title">{channel.title}</span>
        <span className="channel-card-members">{channel.members}</span>
      </div>
      <div className="channel-card-sub">{channel.updatedAt}</div>
      <div className="channel-card-messages">
        {channel.messages.slice(0, visibleCount).map((msg, i) => (
          <div key={i} className="channel-msg-row channel-msg-appear">
            <span className="channel-msg-time">{msg.time}</span>
            <span
              className={`channel-msg-user${msg.isBot ? ' channel-msg-bot' : ''}`}
              style={msg.isBot ? undefined : { color: userColor(msg.user) }}
            >
              {msg.user}
            </span>
            <span className="channel-msg-text">{msg.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const botActivity = [
  { id: 'ceo', name: 'CEO', initials: 'CE', runs: [43, 2, 2, 21, 33, 20, 79, 67, 80, 72, 88, 3] },
  { id: 'happy', name: 'Developer', initials: 'DE', runs: [23, 21, 11, 12, 12, 33, 2, 78, 66, 43, 55, 49] },
  { id: 'researcher', name: 'Researcher', initials: 'RE', runs: [1, 23, 20, 15, 11, 12, 28, 24, 30, 10, 30, 33] }
]

export function HeroDashboardPreview() {
  return (
    <div className="hero-image glass hover-levitate">
      <div className="window-controls">
        <span /><span /><span />
      </div>

      <div className="dashboard-screen">
        <aside className="dashboard-rail">
          <div className="dashboard-rail-logo">
            <img src={soLogo} alt="Sloppy" className="dashboard-rail-logo-image" />
          </div>
          <div className="dashboard-rail-nav">
            {['dashboard', 'folder', 'monitoring', 'groups', 'settings', 'description'].map((icon, index) => (
              <div key={icon} className={`dashboard-rail-item${index === 0 ? ' is-active' : ''}`}>
                <span className="material-symbols-rounded">{icon}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="dashboard-screen-main">
          <div className="dashboard-screen-status">[&gt;_ SECURE_SESSION_ACTIVE // PID: 9284]</div>
          <div className="dashboard-screen-header">
            <h3>Overview</h3>
          </div>
          <div className="dashboard-screen-divider" />

          <div className="preview-overview-shell">
            <section className="overview-section">
              <div className="overview-section-header">
                <h2>
                  <span className="material-symbols-rounded">forum</span>
                  Active Channels
                </h2>
                <span className="overview-section-count">{channels.length}</span>
              </div>
              <div className="active-channels-grid">
                {channels.map((channel, i) => (
                  <AnimatedChannelCard key={channel.id} channel={channel} channelIndex={i} />
                ))}
              </div>
            </section>

            <section className="overview-section">
              <div className="overview-section-header">
                <h2>
                  <span className="material-symbols-rounded">monitoring</span>
                  System Status
                </h2>
              </div>
              <div className="stat-row">
                {runtimeStats.map((stat) => (
                  <div key={stat.id} className="stat-card">
                    <div className="stat-card-icon">
                      <span className="material-symbols-rounded">{stat.icon}</span>
                    </div>
                    <div className="stat-card-value">{stat.value}</div>
                    <div className="stat-card-label">{stat.label}</div>
                    <div className="stat-card-sub">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overview-section">
              <div className="overview-section-header">
                <h2>
                  <span className="material-symbols-rounded">bar_chart</span>
                  Bot Activity
                  <span className="overview-section-period">Last 14 days</span>
                </h2>
                <span className="overview-section-count">3 bots</span>
              </div>
              <div className="activity-charts-grid">
                {botActivity.map((agent) => {
                  const max = Math.max(...agent.runs, 1)
                  return (
                    <div key={agent.id} className="agent-chart-card chart-card">
                      <div className="chart-header">
                        <div className="agent-chart-title">
                          <span className="channel-agent-avatar agent-chart-avatar">
                            {agent.initials}
                          </span>
                          <h4>{agent.name}</h4>
                        </div>
                        <span className="chart-period">Runs</span>
                      </div>
                      <div className="chart-body">
                        <div className="chart-bars">
                          {agent.runs.map((value, index) => (
                            <div key={index} className="chart-bar-wrap">
                              <div
                                className="chart-bar bg-accent"
                                style={{ height: `${Math.round((value / max) * 100)}%` }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="chart-x-axis">
                          <span>3/10</span>
                          <span>3/17</span>
                          <span>3/23</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="overview-section">
              <div className="overview-section-header">
                <h2>
                  <span className="material-symbols-rounded">check_circle</span>
                  Closed Tasks
                </h2>
                <span className="overview-section-count">0 done</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
