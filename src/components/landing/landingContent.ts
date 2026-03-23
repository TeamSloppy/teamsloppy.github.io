import type { LandingSectionSpec } from './types'

export const landingSections: LandingSectionSpec[] = [
  {
    id: 'runtime',
    eyebrow: 'Observable Multi-Agent Runtime',
    title: 'Inspect execution as messages fork into branches and workers.',
    description:
      'Sloppy makes routing legible. A message enters a channel, policy decides the next move, workers spin up with declared tools, and the system records the resulting path for operators.',
    bullets: [
      'Deterministic route decisions before autonomy expands.',
      'Branch and worker lifecycles stay visible instead of hidden inside a single transcript.',
      'Conclusions return to the channel with artifacts, memory refs, and status changes.'
    ],
    caption:
      'A routing board showing the exact path from operator request to branch work and final conclusion.',
    scene: 'runtime'
  },
  {
    id: 'dashboard',
    eyebrow: 'Operator Dashboard',
    title: 'See channels, workers, activity, and bulletins from one control plane.',
    description:
      'The dashboard is a product surface, not a debug afterthought. Runtime state is queryable, viewable, and framed for operators who need to understand what the system is doing now.',
    bullets: [
      'Live channel sessions with previews and recent traffic.',
      'Worker counts, waiting states, and runtime throughput in one overview.',
      'Bulletins and system summaries make long-running activity readable.'
    ],
    caption:
      'A high-signal overview scene modeled after the real Dashboard language, populated with live-feeling mock data.',
    scene: 'dashboard'
  },
  {
    id: 'projects',
    eyebrow: 'Projects, Tasks, and Channels',
    title: 'Organize work around projects instead of treating everything like chat.',
    description:
      'Sloppy ties execution back to project structure: tasks, channels, active workers, files, and status ownership. The result feels closer to operating software work than prompting a bot.',
    bullets: [
      'Projects connect channels, tasks, and working agents in one place.',
      'Task counts, worker state, and created artifacts stay visible together.',
      'Operators can navigate from project context into the underlying execution surface.'
    ],
    caption:
      'A project operations scene that combines kanban, channel linkage, active workers, and emitted artifacts.',
    scene: 'projects'
  },
  {
    id: 'review',
    eyebrow: 'AI-Native Code Review',
    title: 'Review generated work inside the control plane before it ships.',
    description:
      'Sloppy treats review as part of the workflow. Operators can inspect diffs, leave line comments, converse around the change, and drive approve or reject actions from the same surface.',
    bullets: [
      'Diff-first review layout with comment anchors and file selection.',
      'Review chat gives context to code changes without leaving the flow.',
      'Approve and reject actions close the loop from task execution to merge decision.'
    ],
    caption:
      'A code review frame that echoes the strongest visual pattern in this redesign: side-by-side proof, not generic screenshots.',
    scene: 'review'
  },
  {
    id: 'channels',
    eyebrow: 'Omnichannel Entry Points',
    title: 'Meet teams in existing channels while keeping the runtime coherent.',
    description:
      'Sloppy can bridge communication layers into the same control plane. Teams keep their familiar surfaces while routing, approvals, handoffs, and memory stay centralized.',
    bullets: [
      'Inbound conversations arrive as structured channel traffic.',
      'Agent replies, handoffs, and access checks remain visible to operators.',
      'The runtime keeps one coherent story even when entry points differ.'
    ],
    caption:
      'A multi-channel console showing routed messages, approvals, and operator-aware responses across familiar inbox surfaces.',
    scene: 'channels'
  },
  {
    id: 'agents',
    eyebrow: 'Configurable Agents',
    title: 'Compose agents from models, tools, skills, and cron-driven routines.',
    description:
      'Agents in Sloppy are configured for roles and workflows. Operators can select model providers, gate tool use, install skills, and automate recurring work without turning the product into a hardcoded bot shell.',
    bullets: [
      'Multi-provider model selection with explicit active state.',
      'Tool policy, skill installation, and session behavior live in one cockpit.',
      'Cron-backed routines let the same agents operate on a schedule.'
    ],
    caption:
      'An agent configuration workspace showing provider choice, tool controls, installed skills, and cron jobs as one coherent system.',
    scene: 'agents'
  }
]
