import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function getAboutContent() {
  if (!db) {
    console.warn('Firebase not initialized, returning default about content')
    return {
      title: 'About',
      firstName: 'Ahmed',
      lastName: 'Ayman',
      nickName: 'Aymon',
      position: 'Multidisciplinary Visual Artist',
      slogan: 'I Shut My eyes to See',
      bio: "Ahmed Ayman, Known As Aymon, Was Born In Cairo In 2003 And Has Dedicated His Life To It Ever Since. From The Age Of Nine, He Has Been Deeply Involved In Visual Arts, Exploring Various Forms Including Photography And Filmmaking Over The Years, He Expanded His Craft Into Graphic Design And 3D Design Gaining Experience Across Different Creative Fields. Aymon Has Collaborated With Many Prominent Figures In Egypt's Music Industry As Well As With Advertising Companies, Leaving His Mark Through Powerful Visuals And Creative Storytelling.",
      location: 'Cairo, Egypt',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/aymonin/',
        instagram: 'https://www.instagram.com/aymo.n/',
        behance: 'https://www.behance.net/AYMONN',
      },
    }
  }

  try {
    const docRef = doc(db, 'content', 'about')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return {
        title: 'About',
        firstName: 'Ahmed',
        lastName: 'Ayman',
        nickName: 'Aymon',
        position: 'Multidisciplinary Visual Artist',
        slogan: 'I Shut My eyes to See',
        bio: "Ahmed Ayman, Known As Aymon, Was Born In Cairo In 2003 And Has Dedicated His Life To It Ever Since. From The Age Of Nine, He Has Been Deeply Involved In Visual Arts, Exploring Various Forms Including Photography And Filmmaking Over The Years, He Expanded His Craft Into Graphic Design And 3D Design Gaining Experience Across Different Creative Fields. Aymon Has Collaborated With Many Prominent Figures In Egypt's Music Industry As Well As With Advertising Companies, Leaving His Mark Through Powerful Visuals And Creative Storytelling.",
        location: 'Cairo, Egypt',
        socialLinks: {
          linkedin: 'https://www.linkedin.com/in/aymonin/',
          instagram: 'https://www.instagram.com/aymo.n/',
          behance: 'https://www.behance.net/AYMONN',
        },
      }
    }
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

export async function updateAboutContent(content) {
  if (!db) {
    console.warn('Firebase not initialized, cannot update about content')
    return false
  }

  try {
    const docRef = doc(db, 'content', 'about')
    await updateDoc(docRef, content)
    return true
  } catch (error) {
    console.error('Error updating about content:', error)
    return false
  }
}

export async function setAboutContent(content) {
  try {
    const docRef = doc(db, 'content', 'about')
    await setDoc(docRef, content)
    return true
  } catch (error) {
    console.error('Error setting about content:', error)
    return false
  }
}

/////////

export async function getContactContent() {
  try {
    const docRef = doc(db, 'content', 'contact')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // default
      return {
        title: 'Get in Touch',
        email: 'info@aymon.work',
        mobile: '+20 111 367 9717',
        socialLinks: {
          linkedin: 'https://www.linkedin.com/in/aymonin/',
          instagram: 'https://www.instagram.com/aymo.n/',
          behance: 'https://www.behance.net/AYMONN',
        },
      }
    }
  } catch (error) {
    console.error('Error fetching contact content:', error)
    return null
  }
}

export async function updateContactContent(content) {
  try {
    const docRef = doc(db, 'content', 'contact')
    await updateDoc(docRef, content)
    return true
  } catch (error) {
    console.error('Error updating contact content:', error)
    return false
  }
}

export async function setContactContent(content) {
  try {
    const docRef = doc(db, 'content', 'contact')
    await setDoc(docRef, content)
    return true
  } catch (error) {
    console.error('Error setting contact content:', error)
    return false
  }
}
