import { NextResponse } from 'next/server'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    console.log('Test-admin: Starting admin-style fetch...')
    
    if (!db) {
      console.log('Test-admin: Firebase not initialized')
      return NextResponse.json({ success: false, error: 'Firebase not initialized' }, { status: 500 })
    }

    const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(projectsQuery)
    console.log('Test-admin: Snapshot received, docs count:', querySnapshot.docs.length)
    
    const projects = querySnapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }))
    
    console.log('Test-admin: Projects mapped:', projects.length)

    const sortedProjects = projects.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0
      const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0
      return bTime - aTime
    })

    console.log('Test-admin: Projects sorted, returning:', sortedProjects.length)
    
    return NextResponse.json({
      success: true,
      count: sortedProjects.length,
      projects: sortedProjects.map(p => ({
        id: p.id,
        firestoreId: p.firestoreId,
        title: p.title,
        client: p.client,
        slug: p.slug,
        hasMedia: !!p.media,
        hasPrimaryImage: !!p.media?.primary,
        order: p.order,
        createdAt: p.createdAt
      }))
    })
  } catch (error) {
    console.error('Test-admin: Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
