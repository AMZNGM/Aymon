import { collection, getDocs, type FirestoreDataConverter } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Project } from '@/types/project.types'

const projectConverter: FirestoreDataConverter<Project> = {
  toFirestore: (project) => project,
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      firestoreId: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
      expiresAt: data.expiresAt?.toDate ? data.expiresAt.toDate() : data.expiresAt,
    } as Project
  },
}

export async function getProjects(): Promise<Project[]> {
  if (!db) return []

  const snapshot = await getDocs(collection(db, 'projects').withConverter(projectConverter))

  const projects = snapshot.docs.map((doc) => doc.data())

  return projects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }

    const aTime = a.createdAt?.getTime() ?? 0
    const bTime = b.createdAt?.getTime() ?? 0

    return bTime - aTime
  })
}
