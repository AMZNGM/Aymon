import { db } from './firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const getLogos = async () => {
  try {
    const logosQuery = query(collection(db, 'logos'), orderBy('order', 'asc'))
    const querySnapshot = await getDocs(logosQuery)
    return querySnapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching logos:', error)
    return []
  }
}
