import { db } from './firebase'
import { collection, getDocs, query, orderBy, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore'

export interface Logo {
  firestoreId: string
  name?: string
  imageUrl?: string
  order?: number
  [key: string]: unknown
}

export const getLogos = async (): Promise<Logo[]> => {
  if (!db) return []

  try {
    const logosQuery = query(collection(db, 'logos'), orderBy('order', 'asc'))

    const querySnapshot = await getDocs(logosQuery)

    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({
          firestoreId: doc.id,
          ...doc.data(),
        }) as Logo
    )
  } catch (error) {
    console.error('Error fetching logos:', error)
    return []
  }
}
