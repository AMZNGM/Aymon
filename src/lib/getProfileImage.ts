import { db } from './firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import type { ProfileImage } from '@/types/admin.types'

let cachedProfileImage: ProfileImage | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const getProfileImage = async (bypassCache: boolean = false): Promise<ProfileImage | null> => {
  if (!db) return null

  if (!bypassCache && cachedProfileImage && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedProfileImage
  }

  try {
    // Get the most recent profile image (limit to 1)
    const profileImageQuery = query(collection(db, 'profileImages'), orderBy('updatedAt', 'desc'), limit(1))

    const querySnapshot = await getDocs(profileImageQuery)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    const profileImage = {
      firestoreId: doc.id,
      ...doc.data(),
    } as ProfileImage

    cachedProfileImage = profileImage
    cacheTimestamp = Date.now()

    return profileImage
  } catch (error) {
    console.error('Error fetching profile image:', error)
    return cachedProfileImage
  }
}
