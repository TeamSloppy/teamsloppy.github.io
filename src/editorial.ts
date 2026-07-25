export type EditorialKind = 'Blog' | 'News'

export interface EditorialSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface EditorialEntry {
  kind: EditorialKind
  slug: string
  title: string
  summary: string
  date: string
  readTime: string
  tag: string
  featured?: boolean
  sections: EditorialSection[]
}

export const blogPosts: EditorialEntry[] = [
  {
    kind: 'Blog',
    slug: 'observable-agent-systems',
    title: 'Why agent work needs an observable control plane',
    summary:
      'Autonomy becomes useful when operators can inspect routes, decisions, artifacts, and handoffs—not just the final chat reply.',
    date: 'July 25, 2026',
    readTime: '8 min read',
    tag: 'Architecture',
    featured: true,
    sections: [
      {
        heading: 'A transcript is not an operating model',
        paragraphs: [
          'A chat transcript is a useful interface for one conversation. It is a poor source of truth for work that branches, waits for approval, touches tools, produces files, or moves between people and agents.',
          'Once an agent workflow becomes longer than a single response, operators need durable state. They need to see which worker owns the next step, what evidence it produced, why a route was selected, and what remains blocked.'
        ]
      },
      {
        heading: 'Visibility should be structural',
        paragraphs: [
          'Sloppy records agent work through typed runtime events, project tasks, worker state, artifacts, review actions, and channel traffic. The dashboard renders that structure instead of guessing progress from conversational phrases.'
        ],
        bullets: [
          'Channels preserve the shared conversation and operator context.',
          'Branches isolate a line of work without hiding it from the parent session.',
          'Workers expose declared tools, status, results, and completion evidence.',
          'Artifacts turn useful output into durable project material.'
        ]
      },
      {
        heading: 'Autonomy with an audit trail',
        paragraphs: [
          'The goal is not to slow agents down. It is to make greater autonomy safer to grant. Clear state and review boundaries let teams increase the amount of work an agent can own without losing the ability to understand or interrupt it.',
          'An observable control plane makes the system legible during execution, not only after something goes wrong.'
        ]
      }
    ]
  },
  {
    kind: 'Blog',
    slug: 'typed-signals-over-model-prose',
    title: 'Stop parsing model prose to understand agent state',
    summary:
      'Progress, completion, and routing should come from stable protocol fields—not a growing list of phrases in every language.',
    date: 'July 18, 2026',
    readTime: '6 min read',
    tag: 'Engineering',
    sections: [
      {
        heading: 'Language is output, not control flow',
        paragraphs: [
          'Models naturally vary their wording. A worker may say it is checking, investigating, reviewing, or simply begin using tools. Treating those phrases as runtime state creates fragile behavior that changes with language, model, or prompt style.',
          'Reliable agent systems separate conversational text from machine-readable execution state.'
        ]
      },
      {
        heading: 'Prefer explicit signals',
        paragraphs: [
          'Sloppy uses typed task status, runtime events, tool call records, planner intents, review actions, and persisted metadata to decide what the system should do next.'
        ],
        bullets: [
          'A task moves because a lifecycle API accepted a typed transition.',
          'A review closes because an approve or reject action was recorded.',
          'A worker completes with structured evidence and emitted artifacts.',
          'A route follows actor links and declared policy.'
        ]
      },
      {
        heading: 'The product benefit',
        paragraphs: [
          'Typed signals are not only an implementation detail. They make the UI more trustworthy. Operators see a stable status, can filter and audit work, and can build automation without relying on accidental wording in a transcript.'
        ]
      }
    ]
  },
  {
    kind: 'Blog',
    slug: 'why-sloppy-runs-on-swift',
    title: 'Why Sloppy’s runtime is built in Swift',
    summary:
      'Actors, strong types, and one cohesive runtime are a practical fit for long-running, local-first agent operations.',
    date: 'July 10, 2026',
    readTime: '7 min read',
    tag: 'Runtime',
    sections: [
      {
        heading: 'Agent work is systems work',
        paragraphs: [
          'A production agent runtime coordinates network requests, tools, persistence, channels, timers, approvals, and concurrent workers. That looks less like a prompt demo and more like a distributed application running on one machine.',
          'Swift gives Sloppy a strong concurrency model and a compiler that helps keep values safe as they move across actor boundaries.'
        ]
      },
      {
        heading: 'One core, several surfaces',
        paragraphs: [
          'The Swift runtime powers the Core API, CLI, TUI, channel integrations, local persistence, and the services consumed by the React dashboard and Apple client.'
        ],
        bullets: [
          'Swift actors isolate shared mutable runtime state.',
          'SwiftNIO provides the transport layer for the Core API.',
          'SQLite keeps project and execution history local and durable.',
          'SwiftPM keeps the runtime and reusable packages in one build graph.'
        ]
      },
      {
        heading: 'Local-first without becoming local-only',
        paragraphs: [
          'Running close to the workspace makes files, tools, and operator approvals easier to reason about. Mesh and channel integrations can connect those local runtimes without requiring the product to become a collection of opaque remote services.'
        ]
      }
    ]
  }
]

export const newsPosts: EditorialEntry[] = [
  {
    kind: 'News',
    slug: 'native-clients-and-project-workflows',
    title: 'Native clients get richer chat, Live Activities, and project workflows',
    summary:
      'The latest development update expands project editing, kanban creation, chat rendering, scheduled work, and at-a-glance activity on Apple platforms.',
    date: 'July 24, 2026',
    readTime: '3 min read',
    tag: 'Development update',
    featured: true,
    sections: [
      {
        heading: 'A broader native workspace',
        paragraphs: [
          'Sloppy’s Apple client now covers more of the project lifecycle directly. The update adds project editing, task creation from kanban, richer sidebar context, improved scheduled-task surfaces, and a more capable desktop overlay.',
          'Chat received a substantial pass across transcript state, rendering, navigation, drafts, failure handling, and server address management.'
        ]
      },
      {
        heading: 'Work at a glance',
        paragraphs: [
          'Live Activity models, approval intents, coordination, and widget UI are now part of the client packages. This gives long-running work and approvals a path to remain visible outside the main application window.'
        ]
      },
      {
        heading: 'Core and dashboard alignment',
        paragraphs: [
          'The same update expands project workspace directories, file indexing, project services, persistence, tools, and dashboard settings so the native and web surfaces continue to operate on shared product concepts.'
        ]
      }
    ]
  },
  {
    kind: 'News',
    slug: 'local-identity-and-user-memory',
    title: 'Local identity and user-scoped memory arrive in Sloppy',
    summary:
      'Authentication now spans Core, dashboard, and clients while keeping local operation and per-user memory boundaries explicit.',
    date: 'July 7, 2026',
    readTime: '3 min read',
    tag: 'Security',
    sections: [
      {
        heading: 'Identity across every surface',
        paragraphs: [
          'The new identity work adds authentication APIs, challenge-based client hooks, refresh and recovery flows, and dashboard management for local users.',
          'The goal is a consistent security boundary whether an operator enters through the dashboard, a native client, or a connected mesh surface.'
        ]
      },
      {
        heading: 'Memory belongs to a user',
        paragraphs: [
          'Memory can now be scoped to authenticated users. That makes personalization and durable context safer in shared installations and gives future synchronization features a clear ownership model.'
        ]
      }
    ]
  },
  {
    kind: 'News',
    slug: 'sloppy-1-3-1',
    title: 'Sloppy 1.3.1 sharpens runtime visibility and channel handling',
    summary:
      'The release improves delegated completion payloads, runtime and dashboard integration, Coffee Mode, and Telegram workflows.',
    date: 'June 18, 2026',
    readTime: '2 min read',
    tag: 'Release',
    sections: [
      {
        heading: 'More reliable handoffs',
        paragraphs: [
          'Sloppy 1.3.1 preserves delegated worker completion payloads so conclusions and evidence survive the trip back through the runtime. Runtime and dashboard integration also received a focused refactor.'
        ]
      },
      {
        heading: 'Better channel workflows',
        paragraphs: [
          'Telegram handling now covers forwarded messages and voice attachments more reliably, alongside TUI fixes and broader stability work.'
        ]
      },
      {
        heading: 'Coffee Mode',
        paragraphs: [
          'The release adds Coffee Mode configuration and CLI overrides for operators who want the runtime to keep useful background work moving with explicit controls.'
        ]
      }
    ]
  }
]

export const allEditorial = [...blogPosts, ...newsPosts]

