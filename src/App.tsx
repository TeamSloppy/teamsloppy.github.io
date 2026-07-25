import { useEffect } from 'react'
import './App.css'
import './Refresh.css'
import { HeroDashboardPreview } from './components/HeroDashboardPreview'
import { LandingScene } from './components/landing/LandingScenes'
import {
  allEditorial,
  blogPosts,
  newsPosts,
  type EditorialEntry,
  type EditorialKind
} from './editorial'

const soLogo = '/so_logo.svg'
const docsUrl = 'https://docs.sloppy.team/'
const installUrl = 'https://docs.sloppy.team/install'
const githubUrl = 'https://github.com/TeamSloppy/Sloppy'

const capabilities = [
  {
    number: '01',
    title: 'Route work with intent',
    description:
      'Move requests through channels, branches, actors, and workers with declared policy instead of an opaque prompt loop.',
    label: 'Runtime graph'
  },
  {
    number: '02',
    title: 'Keep projects operational',
    description:
      'Connect tasks, files, working agents, review state, and emitted artifacts around the project they belong to.',
    label: 'Project control'
  },
  {
    number: '03',
    title: 'Review before it ships',
    description:
      'Inspect diffs, leave line comments, resolve context in chat, and record approve or reject decisions in one flow.',
    label: 'Human authority'
  },
  {
    number: '04',
    title: 'See the whole system',
    description:
      'Follow worker state, channel traffic, bulletins, tool calls, and durable evidence from an operator-first dashboard.',
    label: 'Live visibility'
  }
]

const compactFeatures = [
  ['Configurable agents', 'Compose models, tools, skills, memory, and scheduled routines.'],
  ['Omnichannel entry', 'Bring Telegram, Discord, API, CLI, and dashboard work into one runtime.'],
  ['Local-first core', 'Keep work close to projects with SQLite persistence and a Swift runtime.'],
  ['Typed lifecycle', 'Drive routing, completion, and review from explicit state—not model prose.'],
  ['Durable artifacts', 'Preserve useful outputs and completion evidence beyond a single transcript.'],
  ['Multi-provider', 'Choose the right model per role without binding the operating layer to one vendor.']
]

function Arrow({ external = false }: { external?: boolean }) {
  return (
    <span className="refresh-arrow" aria-hidden="true">
      {external ? '↗' : '→'}
    </span>
  )
}

function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="refresh-announcement">
        <a href="/news/native-clients-and-project-workflows">
          <span>New</span>
          Native clients, Live Activities, and richer project workflows
          <Arrow />
        </a>
      </div>
      <header className="refresh-header">
        <div className="refresh-container refresh-header__inner">
          <a href="/" className="refresh-brand" aria-label="Sloppy home">
            <img src={soLogo} alt="" />
            <span>Sloppy</span>
          </a>

          <nav className="refresh-nav" aria-label="Main navigation">
            <a href="/#product">Product</a>
            <a href="/#workflows">Workflows</a>
            <a href="/blog">Blog</a>
            <a href="/news">News</a>
            <a href={docsUrl} target="_blank" rel="noreferrer">
              Docs
            </a>
          </nav>

          <a className="refresh-header__cta" href={installUrl} target="_blank" rel="noreferrer">
            Get Sloppy
            <Arrow external />
          </a>
        </div>
      </header>
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="refresh-section-heading" data-reveal>
      <span className="refresh-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function EditorialCard({ entry, large = false }: { entry: EditorialEntry; large?: boolean }) {
  const href = `/${entry.kind.toLowerCase()}/${entry.slug}`
  return (
    <a className={`editorial-card${large ? ' editorial-card--large' : ''}`} href={href}>
      <div className="editorial-card__meta">
        <span>{entry.tag}</span>
        <time>{entry.date}</time>
      </div>
      <div>
        <h3>{entry.title}</h3>
        <p>{entry.summary}</p>
      </div>
      <div className="editorial-card__foot">
        <span>{entry.readTime}</span>
        <span>
          Read {entry.kind.toLowerCase()} <Arrow />
        </span>
      </div>
    </a>
  )
}

function HomePage() {
  return (
    <main id="main-content">
      <section className="refresh-hero">
        <div className="refresh-hero__grid" aria-hidden="true" />
        <div className="refresh-hero__glow" aria-hidden="true" />
        <div className="refresh-container refresh-hero__inner">
          <div className="refresh-hero__copy" data-reveal>
            <div className="refresh-hero__kicker">
              <span className="refresh-status-dot" />
              Open source · Swift runtime · Local first
            </div>
            <h1>
              Your agents can work.
              <span> Now make them observable.</span>
            </h1>
            <p>
              Sloppy is the control plane for agent teams: orchestrate work, inspect every handoff,
              review what changes, and keep humans in authority.
            </p>
            <div className="refresh-hero__actions">
              <a className="refresh-button refresh-button--primary" href={installUrl} target="_blank" rel="noreferrer">
                Install Sloppy
                <Arrow external />
              </a>
              <a className="refresh-button refresh-button--secondary" href={githubUrl} target="_blank" rel="noreferrer">
                View on GitHub
                <Arrow external />
              </a>
            </div>
            <div className="refresh-hero__proof">
              <span>Swift 6.2</span>
              <span>React dashboard</span>
              <span>Apple clients</span>
              <span>Telegram + Discord</span>
            </div>
          </div>

          <div className="refresh-hero__product" data-reveal>
            <div className="refresh-product-label">
              <span>Live operator view</span>
              <span>Channels · Workers · Review · Artifacts</span>
            </div>
            <HeroDashboardPreview />
          </div>
        </div>
      </section>

      <section className="refresh-sequence" aria-label="How Sloppy turns requests into results">
        <div className="refresh-container refresh-sequence__grid">
          {[
            ['01', 'Request enters', 'Channel context is preserved'],
            ['02', 'Work is routed', 'Actors and policy choose the path'],
            ['03', 'Agents execute', 'Tools, state, and artifacts stay visible'],
            ['04', 'Humans decide', 'Review and approvals close the loop']
          ].map(([number, title, description]) => (
            <div key={number} className="refresh-sequence__item" data-reveal>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="product" className="refresh-section refresh-section--product">
        <div className="refresh-container">
          <SectionHeading
            eyebrow="The operating layer"
            title="From one request to an auditable result."
            copy="Sloppy gives agent work a structure your team can understand while it is happening—not only after the final answer appears."
          />

          <div className="refresh-capability-grid">
            {capabilities.map((capability) => (
              <article key={capability.number} className="refresh-capability" data-reveal>
                <div className="refresh-capability__top">
                  <span>{capability.number}</span>
                  <span>{capability.label}</span>
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflows" className="refresh-section refresh-workflow">
        <div className="refresh-container">
          <div className="refresh-workflow__story">
            <div className="refresh-workflow__copy" data-reveal>
              <span className="refresh-eyebrow">01 / Route and delegate</span>
              <h2>Let work branch without losing the plot.</h2>
              <p>
                A channel can delegate to focused workers, keep their tool use and status visible,
                then bring structured conclusions and artifacts back to the operator.
              </p>
              <ul>
                <li>Declared actor and team relationships</li>
                <li>Inspectable worker lifecycle</li>
                <li>Typed completion evidence</li>
              </ul>
            </div>
            <div className="refresh-workflow__scene" data-reveal>
              <LandingScene variant="runtime" />
            </div>
          </div>

          <div className="refresh-workflow__story refresh-workflow__story--reverse">
            <div className="refresh-workflow__copy" data-reveal>
              <span className="refresh-eyebrow">02 / Review with context</span>
              <h2>Keep the human decision inside the workflow.</h2>
              <p>
                Review generated changes beside task context and conversation. Approvals become
                durable actions, not a vague sentence buried in chat history.
              </p>
              <ul>
                <li>Diff-first review</li>
                <li>Line comments and review chat</li>
                <li>Explicit approve and reject state</li>
              </ul>
            </div>
            <div className="refresh-workflow__scene" data-reveal>
              <LandingScene variant="review" />
            </div>
          </div>

          <div className="refresh-feature-grid">
            {compactFeatures.map(([title, description], index) => (
              <article key={title} data-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="refresh-section refresh-editorial">
        <div className="refresh-container">
          <div className="refresh-editorial__head" data-reveal>
            <div>
              <span className="refresh-eyebrow">From the Sloppy team</span>
              <h2>Ideas, releases, and what we are building.</h2>
            </div>
            <div className="refresh-editorial__links">
              <a href="/blog">
                All blog posts <Arrow />
              </a>
              <a href="/news">
                All news <Arrow />
              </a>
            </div>
          </div>

          <div className="refresh-editorial__grid" data-reveal>
            <EditorialCard entry={blogPosts[0]} large />
            <EditorialCard entry={newsPosts[0]} />
            <EditorialCard entry={blogPosts[1]} />
          </div>
        </div>
      </section>

      <section className="refresh-final">
        <div className="refresh-final__grid" aria-hidden="true" />
        <div className="refresh-container refresh-final__inner" data-reveal>
          <img src={soLogo} alt="" />
          <span className="refresh-eyebrow">Open source agent operations</span>
          <h2>Run agents in a system your team can actually operate.</h2>
          <p>Start local. Connect a provider. Give work a structure you can see and control.</p>
          <div className="refresh-hero__actions">
            <a className="refresh-button refresh-button--dark" href={installUrl} target="_blank" rel="noreferrer">
              Get started
              <Arrow external />
            </a>
            <a className="refresh-button refresh-button--light" href={docsUrl} target="_blank" rel="noreferrer">
              Read the docs
              <Arrow external />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialIndex({ kind, entries }: { kind: EditorialKind; entries: EditorialEntry[] }) {
  const isBlog = kind === 'Blog'
  return (
    <main id="main-content" className="editorial-index">
      <section className="editorial-index__hero">
        <div className="refresh-container" data-reveal>
          <span className="refresh-eyebrow">Sloppy {kind}</span>
          <h1>{isBlog ? 'Thinking out loud about agent operations.' : 'What is new in Sloppy.'}</h1>
          <p>
            {isBlog
              ? 'Architecture notes, engineering decisions, and practical lessons from building an observable agent runtime.'
              : 'Release notes, product milestones, and focused updates from the team building Sloppy.'}
          </p>
        </div>
      </section>

      <section className="editorial-index__list">
        <div className="refresh-container editorial-index__grid">
          {entries.map((entry, index) => (
            <EditorialCard key={entry.slug} entry={entry} large={index === 0} />
          ))}
        </div>
      </section>
    </main>
  )
}

function EditorialArticle({ entry }: { entry: EditorialEntry }) {
  return (
    <main id="main-content" className="article-page">
      <article>
        <header className="article-hero">
          <div className="article-container" data-reveal>
            <a className="article-back" href={`/${entry.kind.toLowerCase()}`}>
              <Arrow /> Back to {entry.kind.toLowerCase()}
            </a>
            <div className="article-hero__meta">
              <span>{entry.tag}</span>
              <time>{entry.date}</time>
              <span>{entry.readTime}</span>
            </div>
            <h1>{entry.title}</h1>
            <p>{entry.summary}</p>
          </div>
        </header>

        <div className="article-container article-body">
          {entry.sections.map((section) => (
            <section key={section.heading} data-reveal>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      <section className="article-next">
        <div className="article-container">
          <span className="refresh-eyebrow">Keep exploring</span>
          <h2>More from the Sloppy team</h2>
          <div className="article-next__grid">
            {allEditorial
              .filter((candidate) => candidate.slug !== entry.slug)
              .slice(0, 2)
              .map((candidate) => (
                <EditorialCard key={`${candidate.kind}-${candidate.slug}`} entry={candidate} />
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="refresh-not-found">
      <div className="refresh-container">
        <span className="refresh-eyebrow">404 / Route not found</span>
        <h1>This worker has no route.</h1>
        <p>The page may have moved, or the link points to a task that does not exist.</p>
        <a className="refresh-button refresh-button--primary" href="/">
          Return home <Arrow />
        </a>
      </div>
    </main>
  )
}

function SiteFooter() {
  return (
    <footer className="refresh-footer">
      <div className="refresh-container refresh-footer__grid">
        <div className="refresh-footer__brand">
          <a href="/" className="refresh-brand">
            <img src={soLogo} alt="" />
            <span>Sloppy</span>
          </a>
          <p>Observable control plane for agent teams.</p>
          <span>Built in Swift. Operated by humans.</span>
        </div>

        <div>
          <strong>Product</strong>
          <a href="/#product">Overview</a>
          <a href="/#workflows">Workflows</a>
          <a href={installUrl} target="_blank" rel="noreferrer">
            Install
          </a>
        </div>
        <div>
          <strong>Resources</strong>
          <a href="/blog">Blog</a>
          <a href="/news">News</a>
          <a href={docsUrl} target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div>
          <strong>Project</strong>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`${githubUrl}/releases`} target="_blank" rel="noreferrer">
            Releases
          </a>
          <a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer">
            Issues
          </a>
        </div>
      </div>
      <div className="refresh-container refresh-footer__bottom">
        <span>© 2026 Team Sloppy</span>
        <span>Open source · Local first · Operator visible</span>
      </div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => {
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  let page
  let title = 'Sloppy | Observable control plane for agent teams'

  if (path === '/' || path === '/index.html') {
    page = <HomePage />
  } else if (path === '/blog') {
    title = 'Blog | Sloppy'
    page = <EditorialIndex kind="Blog" entries={blogPosts} />
  } else if (path === '/news') {
    title = 'News | Sloppy'
    page = <EditorialIndex kind="News" entries={newsPosts} />
  } else {
    const entry = allEditorial.find(
      (candidate) => path === `/${candidate.kind.toLowerCase()}/${candidate.slug}`
    )
    if (entry) {
      title = `${entry.title} | Sloppy`
      page = <EditorialArticle entry={entry} />
    } else {
      title = 'Page not found | Sloppy'
      page = <NotFound />
    }
  }

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="refresh-shell">
      <SiteHeader />
      {page}
      <SiteFooter />
    </div>
  )
}

export default App
