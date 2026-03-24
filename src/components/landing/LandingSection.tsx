import type { LandingSectionSpec } from './types'
import { LandingScene } from './LandingScenes'

interface LandingSectionProps {
  section: LandingSectionSpec
  align: 'left' | 'right'
  index: number
}

export function LandingSection({ section, align, index }: LandingSectionProps) {
  return (
    <section id={section.id} className="landing-section">
      <div className={`container landing-section__grid landing-section__grid--${align}`}>
        <div className="landing-section__copy" data-reveal>
          <span className="brutal-section-label">{String(index + 1).padStart(2, '0')}</span>
          <div className="eyebrow">{section.eyebrow}</div>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <ul className="landing-section__bullets">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="landing-section__visual" data-reveal>
          <LandingScene variant={section.scene} />
          <p className="scene-caption">{section.caption}</p>
        </div>
      </div>
    </section>
  )
}
