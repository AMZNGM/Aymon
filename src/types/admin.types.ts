export interface Media {
  primary?: string
  gallery?: string[]
  video?: {
    url: string
    type: string
    title: string
  }
}

export interface Project {
  firestoreId?: string
  id?: string
  slug?: string
  title?: string
  client?: string
  category?: string
  year?: string
  status?: string
  featured?: boolean
  showInSelectedWork?: boolean
  scope?: string
  process?: string
  impact?: string
  description?: {
    short: string
    detailed: string
  }
  seo?: {
    keywords: string[]
    description: string
  }
  metadata?: {
    duration: string
    team_size: number
    client_location: string
    project_type: string
  }
  media?: Media
  order?: number
  createdAt?: Date | { toDate(): Date; toMillis(): number }
}

export interface Logo {
  firestoreId?: string
  src?: string
  link?: string
  order?: number
}

export interface SocialLinks {
  linkedin: string
  instagram: string
  behance: string
  [key: string]: string
}

export interface AboutContent {
  title: string
  firstName: string
  lastName: string
  nickName: string
  position: string
  slogan: string
  bio: string
  location: string
  socialLinks: SocialLinks
}

export interface ContactContent {
  title: string
  email: string
  mobile: string
  socialLinks: SocialLinks
}
