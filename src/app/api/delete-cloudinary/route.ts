import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { publicId, resourceType = 'image' } = await request.json()

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 })
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary configuration missing' }, { status: 500 })
    }

    // Create basic auth header
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify({
          public_id: publicId,
          resource_type: resourceType,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Cloudinary delete error:', errorData)
      return NextResponse.json(
        { error: `Cloudinary delete failed: ${errorData.error?.message || 'Unknown error'}` },
        { status: 400 }
      )
    }

    const data = await response.json()
    return NextResponse.json({ success: data.result === 'ok', data })
  } catch (error) {
    console.error('Server error deleting from Cloudinary:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
