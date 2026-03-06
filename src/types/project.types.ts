export interface Project {
  id: string
  firestoreId?: string
  slug: string
  client: string
  title: string
  name?: string
  description?: {
    short: string
    detailed: string
  }
  tagline?: string
  order?: number
  createdAt?: Date
  updatedAt?: Date
  expiresAt?: Date
  showInSelectedWork?: boolean
  year?: string
  category?: string
  status?: string
  process?: string
  impact?: string
  location?: string
  scope?: string
  metadata?: {
    duration: string
    team_size: number
    client_location: string
    project_type: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string
  }
  media?: {
    primary?: string
    gallery?: string[]
    gif?: string
    gifs?: string[]
    reels?: string[]
    video?: {
      url?: string
      type?: string
      title?: string
    }
  }
}
