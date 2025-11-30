export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ahmedayman.com/sitemap.xml', // Replace with actual domain if known, or remove sitemap line for now
  }
}
