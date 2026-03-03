export interface SEOEntry {
  title: string
  description: string
  keywords: string[]
}

export interface WorkLocation {
  city?: string
  country?: string
}

export interface Work {
  name: string
  tagline: string
  description?: string
  location?: WorkLocation
}
