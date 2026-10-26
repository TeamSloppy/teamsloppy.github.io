import { useEffect, useState } from 'react'
import './Refresh.css'
import { Sloppie, type Shape } from './components/Sloppie'
import { CapabilitiesSection } from './components/CapabilitiesSection'
import { ConnectedWorkSection } from './components/ConnectedWorkSection'
import { InstallCommand } from './components/InstallCommand'
import { iosAppStoreUrl, macDownloadUrl, releaseUrl } from './downloads'
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
            <span>sloppy<span className="wordmark-period">.</span></span>
          </a>

          <nav className="refresh-nav" aria-label="Main navigation">
            <a href="/#install">Install</a>
            <a href="/#product">Product</a>
            <a href="/#console">Console</a>
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

function DownloadIcon({ mobile = false }: { mobile?: boolean }) {
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
      {mobile ? (
        <>
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M11 18h2" />
        </>
      ) : (
        <>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M12 17v4M8 21h8" />
          <path d="M12 7v7m-3-3 3 3 3-3" />
        </>
      )}
    </svg>
  )
}

function HomePage() {
  const [screen, setScreen] = useState<'dashboard' | 'macos'>('dashboard')
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
            <InstallCommand />
            <div className="refresh-hero__actions">
              <a
                className="refresh-button refresh-button--primary"
                href={macDownloadUrl}
              >
                <DownloadIcon /> Download for macOS
              </a>
              <a className="refresh-button" href={iosAppStoreUrl}>
                <DownloadIcon mobile /> Download for iOS <Arrow external />
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
              {screen === 'dashboard' ? 'Your agent team' : 'macOS app'}
            </span>
            <span className="demo-label">Demo workspace</span>
          </div>
          <a
            href={`/promo/${screen === 'dashboard' ? 'dashboard.jpg' : 'macos.png'}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size ${screen} screenshot`}
          >
            <img
              src={`/promo/${screen === 'dashboard' ? 'dashboard.jpg' : 'macos.png'}`}
              width={screen === 'dashboard' ? 1440 : 2400}
              height={screen === 'dashboard' ? 980 : 1560}
              alt={
                screen === 'dashboard'
                  ? 'Real Sloppy dashboard showing a Sloppie, agent activity and run history with fictional demo data.'
                  : 'Sloppy macOS client showing project chats, a new chat screen, workspace context, and the message composer.'
              }
              fetchPriority="high"
            />
          </a>
          <figcaption>
            {screen === 'dashboard'
              ? 'Actual product screenshot. Fictional projects, conversations, and activity.'
              : 'Actual Sloppy macOS client.'}
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

      <ConnectedWorkSection />

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
          eyebrow="Prefer an app?"
          title="Your workspace. On your devices."
          copy="Download Sloppy for your Mac, or take your workspace with you on iPhone and iPad."
        />
        <div className="download-grid">
          <article>
            <div className="download-top">
              <DownloadIcon />
              <span>v2.5.0</span>
            </div>
            <h3>Sloppy for macOS</h3>
            <p>macOS 26+ · Apple silicon & Intel · Signed & notarized DMG</p>
            <a
              className="refresh-button"
              href={macDownloadUrl}
            >
              Download for macOS
              <Arrow />
            </a>
            <a
              className="checksum-link"
              href={`${releaseUrl}/download/v2.5.1/SHA256SUMS.txt`}
            >
              Verify checksum <Arrow external />
            </a>
          </article>
          <article>
            <div className="download-top"><DownloadIcon mobile /><span>iPhone & iPad</span></div>
            <h3>Sloppy for iOS</h3>
            <p>Your agents, projects, and conversations on the go.</p>
            <a className="refresh-button" href={iosAppStoreUrl}>
              Download on the App Store <Arrow external />
            </a>
          </article>
        </div>
        <p className="download-note">
          <a href="#install">Install the CLI</a> on macOS, Windows, or Linux.{' '}
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
            <span>sloppy<span className="wordmark-period">.</span></span>
          </a>
          <p>Observable control plane for agent teams.</p>
          <span>Built in Swift. Operated by humans.</span>
        </div>

        <div>
          <strong>Product</strong>
          <a href="/#product">Overview</a>
          <a href="/#capabilities">Memory, JEV & Mesh</a>
          <a href="/#long-chats">Long Chats</a>
          <a href="/#console">Console</a>
          <a href="/#sloppies">Sloppies</a>
          <a href="/#install">Install</a>
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
