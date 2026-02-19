import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function getConceptArt() {
  if (!db) {
    console.warn('Firebase not initialized, returning empty concept art array')
    return []
  }

  try {
    const q = query(collection(db, 'conceptArt'), orderBy('order', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      firestoreId: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching concept art:', error)
    return []
  }
}
