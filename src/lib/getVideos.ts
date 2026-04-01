import { db } from './firebase'
import { collection, getDocs, query, orderBy, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore'
import type { Video } from '@/types/admin.types'

let cachedVideos: Video[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const getVideos = async (bypassCache: boolean = false): Promise<Video[]> => {
  if (!db) return []

  if (!bypassCache && cachedVideos && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedVideos
  }

  try {
    // Simplified query - order by order field only, then sort by createdAt in JavaScript
    const videosQuery = query(collection(db, 'videos'), orderBy('order', 'asc'))

    const querySnapshot = await getDocs(videosQuery)

    const videos = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({
          firestoreId: doc.id,
          ...doc.data(),
        }) as Video
    )

    // Sort by createdAt for videos with same order (newer first)
    const sortedVideos = videos.sort((a, b) => {
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0)
      }
      // If orders are the same, sort by createdAt (newer first)
      const getTime = (timestamp: Date | { toDate(): Date; toMillis(): number } | undefined) => {
        if (!timestamp) return 0
        if (timestamp instanceof Date) return timestamp.getTime()
        return timestamp.toDate().getTime()
      }
      const aTime = getTime(a.createdAt)
      const bTime = getTime(b.createdAt)
      return bTime - aTime
    })

    cachedVideos = sortedVideos
    cacheTimestamp = Date.now()

    return sortedVideos
  } catch (error) {
    console.error('Error fetching videos:', error)
    return cachedVideos || []
  }
}
