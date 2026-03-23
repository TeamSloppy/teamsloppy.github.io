import { useEffect } from 'react'
import './App.css'
import { NotFoundPage } from './components/NotFoundPage'
import { LandingSection } from './components/landing/LandingSection'
import { landingSections } from './components/landing/landingContent'
import { HeroDashboardPreview } from './components/HeroDashboardPreview'

const soLogo = '/so_logo.svg'

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
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => {
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html'
  if (!isHome) {
    return <NotFoundPage />
  }

  return (
    <div className="app-shell">
      <div className="landing-noise" />
      <div className="landing-radial landing-radial--top" />
      <div className="landing-radial landing-radial--bottom" />

      <nav className="site-nav">
        <div className="container site-nav__inner">
          <a href="#top" className="site-nav__brand" aria-label="Sloppy homepage">
            <img src={soLogo} alt="" className="site-nav__logo" />
            <span>Sloppy</span>
          </a>

          <div className="site-nav__links">
            <a href="#runtime">Product</a>
            <a href="#review">Review</a>
            <a href="https://docs.sloppy.team/" target="_blank" rel="noreferrer">
              Docs
            </a>
            <a href="https://github.com/TeamSloppy/Sloppy" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <a
            href="https://docs.sloppy.team/install"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >
            Initialize
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy" data-reveal>
              <div className="eyebrow">Operator-visible AI work</div>
              <h1>
                The control plane for
                <span> observable agent operations.</span>
              </h1>
              <p className="hero__lede">
                Sloppy combines runtime orchestration, project workflows, code review, channel
                routing, and configurable agents into one inspectable system. Operators can see
                what happened, why it happened, and what ships next.
              </p>

              <div className="hero__proofs">
                <div className="hero-proof">
                  <strong>Channel → Branch → Worker</strong>
                  <span>Deterministic routing instead of an opaque prompt loop.</span>
                </div>
                <div className="hero-proof">
                  <strong>Dashboard-first visibility</strong>
                  <span>Channels, workers, bulletins, review state, and runtime traces.</span>
                </div>
                <div className="hero-proof">
                  <strong>React-driven product demos</strong>
                  <span>Every section below maps to a real workflow already present in Sloppy.</span>
                </div>
              </div>

              <div className="hero__actions">
                <a
                  href="https://docs.sloppy.team/install"
                  target="_blank"
                  rel="noreferrer"
                  className="button button--primary button--large"
                >
                  Get started
                </a>
                <a
                  href="https://docs.sloppy.team/"
                  target="_blank"
                  rel="noreferrer"
                  className="button button--ghost button--large"
                >
                  Read docs
                </a>
              </div>

              <div className="hero__meta">
                <span>Swift runtime</span>
                <span>React dashboard</span>
                <span>Projects + review</span>
                <span>Telegram / Discord</span>
              </div>
            </div>

            <div className="hero__scene" data-reveal>
              <HeroDashboardPreview />
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-strip__inner" data-reveal>
            <p>
              A guided walkthrough of the six workflows that make Sloppy feel like a real control
              plane instead of a chat wrapper.
            </p>
            <div className="intro-strip__metrics">
              <span>6 product sections</span>
              <span>Dashboard-derived UI</span>
              <span>Mock data + purposeful motion</span>
            </div>
          </div>
        </section>

        {landingSections.map((section, index) => (
          <LandingSection
            key={section.id}
            section={section}
            align={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}

        <section className="infra-section">
          <div className="container infra-section__inner" data-reveal>
            <div className="infra-section__copy">
              <div className="eyebrow">Swift-first runtime</div>
              <h2>Built in Swift, for operator-visible systems that need to hold up.</h2>
              <p>
                Sloppy is not a browser toy wrapped around prompts. The orchestration layer,
                persistence, transport, and runtime actors live in a Swift-first core designed for
                long-running workflows, predictable behavior, and local-first operation.
              </p>
              <p>
                When channels spawn branches, workers emit artifacts, and operators need a stable
                control plane, infrastructure matters. Swift gives Sloppy strong typing, explicit
                concurrency, one cohesive runtime, and a path to serious systems work without
                turning the product into a pile of services.
              </p>

              <div className="infra-section__chips">
                {[
                  ['SW', 'Swift 6'],
                  ['SC', 'Swift Concurrency'],
                  ['NI', 'SwiftNIO'],
                  ['SQ', 'SQLite'],
                  ['AL', 'AnyLanguageModel'],
                  ['UI', 'React + Vite'],
                  ['SP', 'SwiftPM'],
                  ['DK', 'Docker']
                ].map(([short, label]) => (
                  <div key={label} className="infra-chip">
                    <span>{short}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="infra-section__visual" aria-hidden="true">
              <div className="infra-orb">
                <div className="infra-orb__core">
                  <img src="/swift.svg" alt="Swift" className="infra-orb__icon" />
                </div>
                <div className="infra-orb__ring infra-orb__ring--1" />
                <div className="infra-orb__ring infra-orb__ring--2" />
                <div className="infra-orb__ring infra-orb__ring--3" />
              </div>
            </div>
          </div>
        </section>

        <section className="cta-panel">
          <div className="container cta-panel__inner" data-reveal>
            <div>
              <div className="eyebrow">Runtime, workflow, visibility</div>
              <h2>Run agents in a system your team can actually operate.</h2>
              <p>
                Start with the local runtime, wire up a model provider, and use the dashboard to
                move from experiments to repeatable operator-visible workflows.
              </p>
            </div>

            <div className="cta-panel__actions">
              <a
                href="https://docs.sloppy.team/install"
                target="_blank"
                rel="noreferrer"
                className="button button--primary button--large"
              >
                Install Sloppy
              </a>
              <a
                href="https://github.com/TeamSloppy/Sloppy"
                target="_blank"
                rel="noreferrer"
                className="button button--ghost button--large"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <img src={soLogo} alt="" className="site-nav__logo" />
            <div>
              <strong>Sloppy</strong>
              <p>Observable control plane for operator-visible AI work.</p>
            </div>
          </div>

          <div className="site-footer__links">
            <a href="#runtime">Product</a>
            <a href="#review">Review</a>
            <a href="https://docs.sloppy.team/" target="_blank" rel="noreferrer">
              Docs
            </a>
            <a href="https://github.com/TeamSloppy/Sloppy" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
