export default {
  name: 'work',
  title: 'Selected Work Section',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
    },
    {
      name: 'scope',
      title: 'Scope',
      type: 'string',
    },
    {
      name: 'descriptionShort',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'descriptionDetailed',
      title: 'Detailed Description',
      type: 'text',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'mediaPrimary',
      title: 'Primary Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'mediaGallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'videoTitle',
      title: 'Video Title',
      type: 'string',
    },
    {
      name: 'metadata',
      title: 'Project Metadata',
      type: 'object',
      fields: [
        { name: 'duration', title: 'Duration', type: 'string' },
        { name: 'teamSize', title: 'Team Size', type: 'number' },
        { name: 'clientLocation', title: 'Client Location', type: 'string' },
        { name: 'projectType', title: 'Project Type', type: 'string' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Data',
      type: 'object',
      fields: [
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'description', title: 'Description', type: 'string' },
      ],
    },
  ],
}
