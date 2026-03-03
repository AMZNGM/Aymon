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
  nickName: string
  position: string
  slogan: string
  bio: string
  location: string
  socialLinks: SocialLinks
}

const defaultAboutContent: AboutContent = {
  title: 'About',
  firstName: 'Ahmed',
  lastName: 'Ayman',
  nickName: 'Aymon',
  position: 'Multidisciplinary Visual Artist',
  slogan: 'I Shut My eyes to See',
  bio: `Ahmed Ayman, Known As Aymon...`,
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

export async function getAboutContent(): Promise<AboutContent | null> {
  if (!db) {
    console.warn('Firebase not initialized')
    return defaultAboutContent
  }

  try {
    const docRef = doc(db, 'content', 'about')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as AboutContent
    }

    return defaultAboutContent
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

export async function updateAboutContent(content: Partial<AboutContent>): Promise<boolean> {
  if (!db) return false

  try {
    const docRef = doc(db, 'content', 'about')
    await updateDoc(docRef, content)
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
    return true
  } catch (error) {
    console.error('Error setting about content:', error)
    return false
  }
}

////////

export async function getContactContent(): Promise<ContactContent | null> {
  if (!db) return defaultContactContent

  try {
    const docRef = doc(db, 'content', 'contact')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as ContactContent
    }

    return defaultContactContent
  } catch (error) {
    console.error('Error fetching contact content:', error)
    return null
  }
}

export async function updateContactContent(content: Partial<ContactContent>): Promise<boolean> {
  if (!db) return false

  try {
    const docRef = doc(db, 'content', 'contact')
    await updateDoc(docRef, content)
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
    return true
  } catch (error) {
    console.error('Error setting contact content:', error)
    return false
  }
}
