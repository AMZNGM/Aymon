import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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

const defaultAboutContent: AboutContent = {
  title: 'About',
  firstName: 'Ahmed',
  lastName: 'Ayman',
  nickname: 'Aymon',
  position: 'Multidisciplinary Visual Artist',
  slogan: 'I Shut My eyes to See',
  bio: `Ahmed Ayman has dedicated his life to it ever since From the age of nine, he has been deeply involved in visual arts, letting curiosity lead him through unexplored territory.`,
  bio1: `Ahmed Ayman has dedicated his life to it ever since From the age of nine, he has been deeply involved in visual arts, letting curiosity lead him through unexplored territory.`,
  bio2: `Over the years he explored photography and filmmaking — learning to capture not just what the eye sees, but what it feels. He later expanded his craft into graphic design and 3D design accumulating experience across creative fields that rarely speak the same language.`,
  bio3: `Aymon has collaborated with many prominent figures in music industry, as well as with advertising companies — leaving his mark through powerful visuals and creative storytelling that lingers long after the moment has passed.`,
  location: 'Cairo, Egypt',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/aymonin/',
    instagram: 'https://www.instagram.com/aymo.n/',
    behance: 'https://www.behance.net/AYMONN',
  },
}

export interface ContactContent {
  title: string
  email: string
  mobile: string
  socialLinks: SocialLinks
}

const defaultContactContent: ContactContent = {
  title: 'Get in Touch',
  email: 'info@aymon.work',
  mobile: '+20 111 367 9717',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/aymonin/',
    instagram: 'https://www.instagram.com/aymo.n/',
    behance: 'https://www.behance.net/AYMONN',
  },
}

/////////

let cachedAboutContent: AboutContent | null = null
let aboutCacheTimestamp = 0
const ABOUT_CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export async function getAboutContent(): Promise<AboutContent | null> {
  if (!db) {
    console.warn('Firebase not initialized')
    return defaultAboutContent
  }

  if (cachedAboutContent && Date.now() - aboutCacheTimestamp < ABOUT_CACHE_DURATION) {
    return cachedAboutContent
  }

  try {
    const docRef = doc(db, 'content', 'about')
    const docSnap = await getDoc(docRef)

    const content = docSnap.exists() ? (docSnap.data() as AboutContent) : defaultAboutContent

    cachedAboutContent = content
    aboutCacheTimestamp = Date.now()

    return content
  } catch (error) {
    console.error('Error fetching about content:', error)
    return cachedAboutContent || null
  }
}

export async function updateAboutContent(content: Partial<AboutContent>): Promise<boolean> {
  if (!db) return false

  try {
    const docRef = doc(db, 'content', 'about')
    await updateDoc(docRef, content)

    cachedAboutContent = null
    aboutCacheTimestamp = 0

    return true
  } catch (error) {
    console.error('Error updating about content:', error)
    return false
  }
}

export async function setAboutContent(content: AboutContent): Promise<boolean> {
  if (!db) return false

  try {
    const docRef = doc(db, 'content', 'about')
    await setDoc(docRef, content)

    cachedAboutContent = null
    aboutCacheTimestamp = 0

    return true
  } catch (error) {
    console.error('Error setting about content:', error)
    return false
  }
}

////////

let cachedContactContent: ContactContent | null = null
let contactCacheTimestamp = 0
const CONTACT_CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export async function getContactContent(): Promise<ContactContent | null> {
  if (!db) return defaultContactContent

  if (cachedContactContent && Date.now() - contactCacheTimestamp < CONTACT_CACHE_DURATION) {
    return cachedContactContent
  }

  try {
    const docRef = doc(db, 'content', 'contact')
    const docSnap = await getDoc(docRef)

    const content = docSnap.exists() ? (docSnap.data() as ContactContent) : defaultContactContent

    cachedContactContent = content
    contactCacheTimestamp = Date.now()

    return content
  } catch (error) {
    console.error('Error fetching contact content:', error)
    return cachedContactContent || null
  }
}

export async function updateContactContent(content: Partial<ContactContent>): Promise<boolean> {
  if (!db) return false

  try {
    const docRef = doc(db, 'content', 'contact')
    await updateDoc(docRef, content)

    cachedContactContent = null
    contactCacheTimestamp = 0

    return true
  } catch (error) {
    console.error('Error updating contact content:', error)
    return false
  }
}

export async function setContactContent(content: ContactContent): Promise<boolean> {
  if (!db) return false

  try {
    const docRef = doc(db, 'content', 'contact')
    await setDoc(docRef, content)

    cachedContactContent = null
    contactCacheTimestamp = 0

    return true
  } catch (error) {
    console.error('Error setting contact content:', error)
    return false
  }
}
