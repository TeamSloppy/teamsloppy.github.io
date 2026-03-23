export type SceneVariant =
  | 'hero'
  | 'runtime'
  | 'dashboard'
  | 'projects'
  | 'review'
  | 'channels'
  | 'agents'

export interface LandingSectionSpec {
  id: string
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  caption: string
  scene: SceneVariant
}
