export const cloudinaryConfig = {
  cloud: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
}

export const getPublicIdFromUrl = (url: string): string => {
  // Extract public ID from Cloudinary URL
  // Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image_name.jpg
  // Returns: folder/image_name
  const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?\.[a-zA-Z]+)$/)
  return matches ? matches[1] : ''
}

export const uploadToCloudinary = async (file: File, folder: string = 'data') => {
  if (!cloudinaryConfig.cloud) {
    throw new Error('Cloudinary cloud name is not configured')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'aymoncrazy')
  formData.append('folder', folder)
  formData.append('resource_type', 'auto') // Auto-detect if it's image or video

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud}/auto/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw new Error(`Failed to upload file to Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const deleteFromCloudinary = async (publicId: string, resourceType: string = 'image') => {
  if (!cloudinaryConfig.cloud) {
    throw new Error('Cloudinary cloud name is not configured')
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud}/${resourceType}/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        resource_type: resourceType,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Cloudinary delete failed: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data.result === 'ok'
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw new Error(`Failed to delete file from Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
