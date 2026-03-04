import { db } from './firebase'
import { collection, getDocs, query, orderBy, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore'

export interface Logo {
  firestoreId: string
  name?: string
  imageUrl?: string
  order?: number
  [key: string]: unknown
}

let cachedLogos: Logo[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const getLogos = async (): Promise<Logo[]> => {
  if (!db) return []

  if (cachedLogos && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedLogos
  }

  try {
    const logosQuery = query(collection(db, 'logos'), orderBy('order', 'asc'))

    const querySnapshot = await getDocs(logosQuery)

    const logos = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({
          firestoreId: doc.id,
          ...doc.data(),
        }) as Logo
    )

    cachedLogos = logos
    cacheTimestamp = Date.now()

    return logos
  } catch (error) {
    console.error('Error fetching logos:', error)
    return cachedLogos || []
  }
}
