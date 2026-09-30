import { useEffect, useState } from 'react'
import './Refresh.css'
import { Sloppie, type Shape } from './components/Sloppie'
import { CapabilitiesSection } from './components/CapabilitiesSection'
import {
  allEditorial,
  blogPosts,
  newsPosts,
  type EditorialEntry,
  type EditorialKind,
} from './editorial'

const docsUrl = 'https://docs.sloppy.team/'
const installUrl = 'https://docs.sloppy.team/install'
const githubUrl = 'https://github.com/TeamSloppy/Sloppy'

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
        <a href="/#sloppies">
          <span>New</span>
          Meet your new teammates. Sloppies are here.
          <Arrow />
        </a>
      </div>
      <header className="refresh-header">
        <div className="refresh-container refresh-header__inner">
          <a href="/" className="refresh-brand" aria-label="Sloppy home">
            <img src="/so_logo.svg" alt="" />
            <span>Sloppy</span>
          </a>

          <nav className="refresh-nav" aria-label="Main navigation">
            <a href="/#product">Product</a>
            <a href="/#sloppies">Sloppies</a>
            <a href="/blog">Blog</a>
            <a href="/news">News</a>
            <a href={docsUrl} target="_blank" rel="noreferrer">
              Docs
            </a>
          </nav>

          <a className="refresh-header__cta" href="/#download">
            Download
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
  copy,
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

function EditorialCard({
  entry,
  large = false,
}: {
  entry: EditorialEntry
  large?: boolean
}) {
  const href = `/${entry.kind.toLowerCase()}/${entry.slug}`
  return (
    <a
      className={`editorial-card${large ? ' editorial-card--large' : ''}`}
      href={href}
    >
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

const downloads = [
  {
    title: 'macOS app',
    detail: 'macOS 26+ · Apple silicon & Intel',
    version: 'v2.1.0',
    label: 'Download for macOS',
    file: 'SloppyClient-macos-2.1.0.zip',
    tag: 'v2.1.0',
    icon: 'desktop',
  },
  {
    title: 'macOS CLI',
    detail: 'Core, dashboard & terminal · arm64',
    version: 'v1.3.2',
    label: 'Download CLI',
    file: 'Sloppy-macos-arm64.tar.gz',
    tag: 'v1.3.2',
    icon: 'terminal',
  },
  {
    title: 'Linux',
    detail: 'Core, dashboard & terminal · x86_64',
    version: 'v1.3.2',
    label: 'Download for Linux',
    file: 'Sloppy-linux-x86_64.tar.gz',
    tag: 'v1.3.2',
    icon: 'terminal',
  },
]

function DownloadIcon({ terminal = false }: { terminal?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      {terminal ? (
        <>
          <path d="m7 8 3 3-3 3" />
          <path d="M13 14h4" />
        </>
      ) : (
        <>
          <path d="M12 17v4M8 21h8" />
          <path d="M12 7v7m-3-3 3 3 3-3" />
        </>
      )}
    </svg>
  )
}

function HomePage() {
  const [screen, setScreen] = useState<'dashboard' | 'macos'>('dashboard')
  const [copyStatus, setCopyStatus] = useState('Copy command')
  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(
        'curl -fsSL https://sloppy.team/install.sh | bash',
      )
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Select the command to copy')
    }
  }
  return (
    <main id="main-content">
      <section className="refresh-hero">
        <div className="refresh-container hero-layout">
          <div className="hero-copy">
            <span className="refresh-eyebrow">
              <span className="status-dot" /> Your open source agent workspace
            </span>
            <h1>
              Serious work.
              <br />
              <span>A little Sloppy.</span>
            </h1>
            <p>
              Bring your projects, tools, and AI teammates together. Build,
              research, and review with a team you can see — and work you can
              control.
            </p>
            <div className="refresh-hero__actions">
              <a
                className="refresh-button refresh-button--primary"
                href={`${githubUrl}/releases/download/v2.1.0/SloppyClient-macos-2.1.0.zip`}
              >
                <DownloadIcon /> Download for macOS
              </a>
              <a className="text-link" href="#download">
                CLI & Linux <Arrow />
              </a>
            </div>
            <div className="hero-note">
              Local first. Open source. Yours to run.
            </div>
          </div>
          <div
            className="hero-team"
            aria-label="Meet the four geometric Sloppies"
          >
            {(['circle', 'triangle', 'diamond', 'square'] as Shape[]).map(
              (shape, i) => (
                <div className={`hero-bot hero-bot--${shape}`} key={shape}>
                  <Sloppie shape={shape} />
                  <span>{['Think', 'Build', 'Review', 'Explore'][i]}</span>
                </div>
              ),
            )}
            <div className="team-caption">
              <span className="status-dot" /> Small team. Big possibilities.
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="product-showcase refresh-container">
        <div className="showcase-head">
          <span>One workspace. Your whole team.</span>
          <div
            className="screenshot-tabs"
            role="group"
            aria-label="Product screenshots"
          >
            <button
              aria-pressed={screen === 'dashboard'}
              onClick={() => setScreen('dashboard')}
            >
              Dashboard
            </button>
            <button
              aria-pressed={screen === 'macos'}
              onClick={() => setScreen('macos')}
            >
              macOS app
            </button>
          </div>
        </div>
        <figure className="product-frame">
          <div className="window-bar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>
              Sloppy /{' '}
              {screen === 'dashboard' ? 'Your agent team' : 'Atlas Studio'}
            </span>
            <span className="demo-label">Demo workspace</span>
          </div>
          <a
            href={`/promo/${screen === 'dashboard' ? 'dashboard.jpg' : 'macos.jpg'}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size ${screen} screenshot`}
          >
            <img
              src={`/promo/${screen === 'dashboard' ? 'dashboard.jpg' : 'macos.jpg'}`}
              width={screen === 'dashboard' ? 1440 : 1360}
              height={screen === 'dashboard' ? 980 : 880}
              alt={
                screen === 'dashboard'
                  ? 'Real Sloppy dashboard showing a Sloppie, agent activity and run history with fictional demo data.'
                  : 'Real native Sloppy macOS app showing the fictional Atlas Studio launch conversation.'
              }
              fetchPriority="high"
            />
          </a>
          <figcaption>
            Actual product screenshots. Fictional projects, conversations, and
            activity.
          </figcaption>
        </figure>
      </section>

      <section className="refresh-section refresh-container">
        <SectionHeading
          eyebrow="A place for the whole process"
          title="Less juggling. More doing."
          copy="From the first idea to the final review, keep the people, agents, and context together."
        />
        <div className="benefit-grid">
          {[
            [
              '01',
              'A home for your projects',
              'Keep chats, files, tasks, and artifacts close to the work they belong to. Pick up where your team left off.',
            ],
            [
              '02',
              'Teammates with a purpose',
              'Give each agent its own models, tools, skills, and memory. Let focused teammates work together.',
            ],
            [
              '03',
              'You stay in the loop',
              'Follow tool calls and progress, inspect changes, and review the result before taking the next step.',
            ],
          ].map(([n, title, copy]) => (
            <article key={n}>
              <span className="refresh-eyebrow">{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="product-facts">
          <span>Multiple model providers</span>
          <span>Skills & MCP tools</span>
          <span>Telegram & Discord</span>
          <span>Native app & browser</span>
        </div>
      </section>

      <CapabilitiesSection />

      <section id="sloppies" className="refresh-section sloppies-section">
        <div className="refresh-container">
          <SectionHeading
            eyebrow="Meet the Sloppies"
            title="A familiar face for every agent."
            copy="A little personality in your workspace. Every agent gets a geometric companion, with its own shape, color, and expressions."
          />
          <div className="sloppies-lineup">
            {(['circle', 'triangle', 'diamond', 'square'] as Shape[]).map(
              (shape, i) => (
                <article key={shape}>
                  <Sloppie shape={shape} />
                  <span className="refresh-eyebrow">
                    0{i + 1} / {shape}
                  </span>
                  <h3>
                    {
                      [
                        'A fresh perspective.',
                        'Ready to build.',
                        'An eye for detail.',
                        'Room for ideas.',
                      ][i]
                    }
                  </h3>
                </article>
              ),
            )}
          </div>
          <p className="sloppies-footnote">
            Same companions. Across the app, dashboard, and desktop.
          </p>
        </div>
      </section>

      <section
        id="download"
        className="refresh-section refresh-container download-section"
      >
        <SectionHeading
          eyebrow="Make yourself at home"
          title="Your next teammate is one download away."
          copy="Choose the native macOS app, or run the core and dashboard from your terminal."
        />
        <div className="download-grid">
          {downloads.map((item) => (
            <article key={item.title}>
              <div className="download-top">
                <DownloadIcon terminal={item.icon === 'terminal'} />
                <span>{item.version}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <a
                className="refresh-button"
                href={`${githubUrl}/releases/download/${item.tag}/${item.file}`}
              >
                {item.label}
                <Arrow />
              </a>
              <a
                className="checksum-link"
                href={`${githubUrl}/releases/download/${item.tag}/SHA256SUMS.txt`}
              >
                Verify checksum <Arrow external />
              </a>
            </article>
          ))}
        </div>
        <div className="install-command">
          <div>
            <strong>Prefer the terminal?</strong>
            <span>Install from source on macOS or Linux.</span>
          </div>
          <code>curl -fsSL https://sloppy.team/install.sh | bash</code>
          <button onClick={copyCommand}>{copyStatus}</button>
          <span role="status" className="sr-only">
            {copyStatus === 'Copied'
              ? 'Install command copied to clipboard'
              : ''}
          </span>
        </div>
        <p className="download-note">
          CLI packages include the web dashboard.{' '}
          <a href={installUrl} target="_blank" rel="noreferrer">
            Installation guide <Arrow external />
          </a>
        </p>
      </section>

      <section className="refresh-section refresh-editorial">
        <div className="refresh-container">
          <div className="refresh-editorial__head">
            <div>
              <span className="refresh-eyebrow">From the team</span>
              <h2>Notes from the workshop.</h2>
            </div>
            <a className="text-link" href="/news">
              All updates <Arrow />
            </a>
          </div>
          <div className="refresh-editorial__grid">
            <EditorialCard entry={blogPosts[0]} large />
            <EditorialCard entry={newsPosts[0]} />
            <EditorialCard entry={blogPosts[1]} />
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialIndex({
  kind,
  entries,
}: {
  kind: EditorialKind
  entries: EditorialEntry[]
}) {
  const isBlog = kind === 'Blog'
  return (
    <main id="main-content" className="editorial-index">
      <section className="editorial-index__hero">
        <div className="refresh-container" data-reveal>
          <span className="refresh-eyebrow">Sloppy {kind}</span>
          <h1>
            {isBlog
              ? 'Thinking out loud about agent operations.'
              : 'What is new in Sloppy.'}
          </h1>
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
                <EditorialCard
                  key={`${candidate.kind}-${candidate.slug}`}
                  entry={candidate}
                />
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
        <p>
          The page may have moved, or the link points to a task that does not
          exist.
        </p>
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
            <img src="/so_logo.svg" alt="" />
            <span>Sloppy</span>
          </a>
          <p>Observable control plane for agent teams.</p>
          <span>Built in Swift. Operated by humans.</span>
        </div>

        <div>
          <strong>Product</strong>
          <a href="/#product">Overview</a>
          <a href="/#capabilities">Memory, JEV & Mesh</a>
          <a href="/#sloppies">Sloppies</a>
          <a href="/#download">Install</a>
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
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => {
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  let page
  let title = 'Sloppy | Your open source agent workspace'

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
      (candidate) =>
        path === `/${candidate.kind.toLowerCase()}/${candidate.slug}`,
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
