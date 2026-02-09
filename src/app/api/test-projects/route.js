import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/getProjects'

export async function GET() {
  try {
    console.log('Testing projects API endpoint...')
    const projects = await getProjects()
    console.log('Projects found:', projects.length)
    
    return NextResponse.json({
      success: true,
      count: projects.length,
      projects: projects.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        client: p.client,
        hasMedia: !!p.media,
        hasPrimaryImage: !!p.media?.primary
      }))
    })
  } catch (error) {
    console.error('Error in test-projects API:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
