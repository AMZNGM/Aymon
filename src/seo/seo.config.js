export const SEO = {
  '/': {
    title: 'Ahmed Ayman | Aymon | Creative Portfolio',
    description:
      'Ahmed Ayman, also known as Aymon, is a multidisciplinary visual artist based in Cairo, Egypt. He is known for his unique style and innovative approach to art, which has earned him recognition in the art world.',
    keywords: [
      'Ahmed Ayman',
      'Aymon',
      'visual artist',
      'Cairo',
      'Egypt',
      'multidisciplinary artist',
      'photography',
      'filmmaking',
      'graphic design',
      '3D design',
    ],
  },

  '/about': {
    title: 'About | Aymon',
    description:
      'Learn more about Ahmed Ayman (Aymon), a multidisciplinary visual artist from Cairo, Egypt. Discover his journey in visual arts, from photography and filmmaking to graphic design and 3D design.',
    keywords: ['Ahmed Ayman', 'Aymon', 'about', 'visual artist', 'Cairo', 'Egypt', 'biography', 'multidisciplinary artist'],
  },

  '/work': {
    title: 'Work | Aymon',
    description:
      'Browse all creative projects by Ahmed Ayman (Aymon). Explore motion graphics, visual art, and design projects showcasing innovative artistic work.',
    keywords: ['Ahmed Ayman work', 'Aymon projects', 'motion graphics portfolio', 'visual art projects', 'design portfolio Cairo'],
  },

  '/privacy': {
    title: 'Privacy Policy | Aymon',
    description: "Our policy on privacy at Ahmed Ayman's website. Learn how we protect your personal information and data.",
    keywords: ['Ahmed Ayman', 'privacy policy', 'data protection', 'personal information'],
  },

  '*': {
    title: 'Page Not Found | Aymon',
    description:
      "Sorry, the page you are looking for does not exist. Please check the URL and try again, or return to Ahmed Ayman's portfolio.",
    keywords: ['Ahmed Ayman', 'not found', 'page not found', 'error', '404'],
  },
}

export const generateWorkSEO = (work) => {
  const keywords = [
    work.name,
    work.tagline,
    'Ahmed Ayman',
    'Aymon',
    'project',
    'Ahmed Ayman work',
    'Aymon projects',
    'motion graphics portfolio',
    'visual art projects',
    'design portfolio Cairo',
    ...(work.location?.city ? [work.location.city] : []),
    ...(work.location?.country ? [work.location.country] : []),
  ]

  return {
    title: `${work.name} - ${work.tagline}`,
    description: work.description || `${work.name} Project by Ahmed Ayman (Aymon).`,
    keywords: keywords.filter(Boolean).join(', '),
  }
}
