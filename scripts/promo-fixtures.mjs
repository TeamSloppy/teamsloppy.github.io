// Synthetic, public-only data shared by dashboard and native promotional captures.
import http from 'node:http'
export const date = '2026-09-30T10:30:00Z'
const stats = { wisdom: 82, debugging: 91, patience: 76, snark: 32, chaos: 24 }
export const agents = [
  ['sloppy', 'Sloppy', 'Your everyday teammate', 'mint'],
  ['builder', 'Builder', 'Turns plans into working code', 'violet'],
  ['reviewer', 'Reviewer', 'Reviews changes and catches edge cases', 'lime'],
  ['researcher', 'Researcher', 'Connects ideas with useful evidence', 'amber'],
].map(([id, displayName, role, paletteId]) => ({
  id,
  displayName,
  role,
  isSystem: false,
  pet: {
    petId: `demo-${id}`,
    genomeHex: '0123456789abcdef',
    rarity: 'common',
    currentStats: stats,
    baseStats: stats,
    visual: { paletteId, currentStage: 3, stageCount: 3 },
    evolution: { totalXp: 2024, isMaxStage: true },
  },
}))
export const projects = [
  {
    id: 'atlas',
    name: 'Atlas Studio',
    description: 'A fictional workspace for a better launch.',
    kind: 'project',
    directoryPaths: [],
    isFavorite: true,
    isArchived: false,
    tasks: [],
    channels: [],
    actors: [],
    teams: [],
  },
]
export const sessions = [
  {
    id: 'launch-demo',
    agentId: 'sloppy',
    title: 'A calmer launch day',
    messageCount: 2,
    kind: 'chat',
    projectId: 'atlas',
    updatedAt: date,
    createdAt: date,
  },
]
export const messages = [
  {
    id: 'demo-user',
    role: 'user',
    createdAt: date,
    segments: [
      {
        kind: 'text',
        text: 'Help us prepare Atlas Studio for launch. Review the onboarding flow and make a checklist.',
      },
    ],
  },
  {
    id: 'demo-assistant',
    role: 'assistant',
    createdAt: date,
    segments: [
      {
        kind: 'text',
        text: '## A calmer launch day\n\nI reviewed the onboarding flow and put together a focused launch checklist.\n\n### Ready for review\n- Simplified the welcome screen\n- Checked keyboard navigation and empty states\n- Added a small first-project walkthrough\n\n### Next steps\n1. Review the onboarding changes\n2. Run the final smoke check\n3. Publish when your team is ready\n\nThe changes are ready for your review.',
      },
    ],
  },
]
export function fixture(path) {
  if (path === '/health') return { status: 'ok' }
  if (path === '/v1/auth/challenge')
    return { mode: 'none', authRequired: false, bootstrapRequired: false }
  if (path === '/v1/config')
    return {
      onboarding: { completed: true },
      models: [],
      agents: agents.map((a) => ({ ...a, model: 'demo-model' })),
      ui: { dashboardAuth: { enabled: false } },
      channels: [],
      providers: [],
    }
  if (path === '/v1/agents') return agents
  if (path === '/v1/projects') return projects
  if (path === '/v1/projects/atlas') return projects[0]
  if (/\/agents\/[^/]+$/.test(path))
    return agents.find((a) => a.id === path.split('/').at(-1)) ?? agents[0]
  if (path.endsWith('/sessions/launch-demo'))
    return { ...sessions[0], summary: sessions[0], messages, events: [] }
  if (path.endsWith('/sessions')) return sessions
  if (path.endsWith('/usage'))
    return {
      totalTokens: 12480,
      inputTokens: 9320,
      outputTokens: 3160,
      totalCost: 0.12,
    }
  if (path.endsWith('/chat-slash-commands')) return { commands: [] }
  if (path.endsWith('/models')) return { models: [] }
  if (path.endsWith('/state')) return { channelId: 'general', messages: [] }
  if (path.endsWith('/events')) return { items: [] }
  if (path.endsWith('/topology')) return { nodes: [], edges: [] }
  return []
}
if (process.argv.includes('--serve')) {
  http
    .createServer((req, res) => {
      const path = new URL(req.url, 'http://localhost').pathname
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
      res.end(JSON.stringify(fixture(path)))
    })
    .listen(5181, '127.0.0.1', () =>
      console.log('Synthetic promo API: 127.0.0.1:5181'),
    )
}
