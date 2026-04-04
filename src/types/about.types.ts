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
  nickname: string
  position: string
  slogan: string
  bio: string
  bio1: string
  bio2: string
  bio3: string
  location: string
  socialLinks: SocialLinks
}
