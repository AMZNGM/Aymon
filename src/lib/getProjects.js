import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function getProjects() {
  const snapshot = await getDocs(collection(db, 'projects'))
  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    firestoreId: doc.id,
    ...doc.data(),
  }))

  // sort client-side by order field if it exists, otherwise by createdAt
  const sortedProjects = projects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0
    const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0
    return bTime - aTime
  })

  return sortedProjects
}
