const capabilities = [
  {
    id: 'memory',
    label: 'Memory',
    title: 'Carry the context forward.',
    description:
      "The next chat can start with the context you've already saved. Keep facts, preferences, and decisions in local searchable memory and readable Markdown.",
    detail:
      'Recall combines keywords with semantic search when configured, plus links between related records. Browse agent, project, and shared memory in the dashboard.',
    link: 'docs/agents/memory.md',
    linkLabel: 'Explore memory',
  },
  {
    id: 'jev',
    label: 'JEV model routing',
    title: 'Match the model to the work.',
    description:
      'Let JEV help choose a model for each request from profiles you configure — from routine work to deeper reasoning. The selected model handles the response and its tool calls.',
    detail:
      'Routing is optional. Your explicit model choice takes priority, and Sloppy falls back to the configured model when routing is unavailable or uncertain.',
    link: 'docs/specs/semantic-decision-routing.md',
    linkLabel: 'How JEV routing works',
  },
  {
    id: 'mesh',
    label: 'Mesh',
    title: 'Your machines, working together.',
    description:
      'Connect the machines you control through a relay. A laptop can coordinate the project while a workstation handles remote agent work, builds, or tests.',
    detail:
      'Invite nodes, inspect their status and capabilities, and map a shared project to each machine’s local checkout. Run your own coordinator and decide where work goes.',
    link: 'docs/guides/mesh.md',
    linkLabel: 'Connect your machines',
  },
  {
    id: 'plugins',
    label: 'Plugins & MCP',
    title: 'Open to the way you work.',
    description:
      'Extend Sloppy with a Swift or Node.js plugin, or connect an MCP server. Bring your own tools, model and memory providers, messaging gateways, and task integrations.',
    detail:
      'The open PluginSDK lets you add capabilities without forking the core runtime. Skills and APIs give your agents more ways to work with the systems you already use.',
    link: 'docs/guides/plugins.md',
    linkLabel: 'Build an integration',
  },
]

function CapabilityPreview({ id }: { id: string }) {
  if (id === 'memory') {
    return (
      <div className="capability-preview capability-memory">
        <div>
          <span>Preference</span>
          <span>Atlas Studio / demo</span>
        </div>
        <p>Keep release notes concise.</p>
        <small>Saved context, ready for the next conversation.</small>
      </div>
    )
  }
  const items =
    id === 'jev'
      ? ['Your request', 'JEV', 'Configured model']
      : id === 'mesh'
        ? ['Your laptop', 'Your relay', 'Your worker']
        : ['Swift SDK', 'Node.js', 'MCP servers']
  return (
    <div className={`capability-preview capability-preview--${id}`}>
      <div className="capability-flow">
        {items.map((item, index) => (
          <span key={item}>
            {index > 0 && id !== 'plugins' ? <i aria-hidden="true">→</i> : null}
            <strong>{item}</strong>
          </span>
        ))}
      </div>
      <small>
        {id === 'jev'
          ? 'Optional routing. Your choice comes first.'
          : id === 'mesh'
            ? 'A network of machines you control.'
            : 'Your tools. Your providers. Your integrations.'}
      </small>
    </div>
  )
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="refresh-section capabilities-section">
      <div className="refresh-container">
        <div className="refresh-section-heading">
          <span className="refresh-eyebrow">Built to grow with your work</span>
          <h2>More than a chat window.</h2>
          <p>
            Context that lasts, models that fit the task, and room for your
            machines and integrations.
          </p>
        </div>
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <article
              id={capability.id}
              className="capability-card"
              key={capability.id}
            >
              <span className="refresh-eyebrow">
                0{index + 1} / {capability.label}
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <CapabilityPreview id={capability.id} />
              <p className="capability-detail">{capability.detail}</p>
              <a
                href={`https://github.com/TeamSloppy/Sloppy/blob/main/${capability.link}`}
                target="_blank"
                rel="noreferrer"
              >
                {capability.linkLabel} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
