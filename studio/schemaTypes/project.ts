import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Research Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (page URL)',
      type: 'slug',
      description: 'Click "Generate" to create the project page address from the title.',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'description', title: 'Short description', type: 'text', rows: 3, description: 'One or two sentences — shown on the cards and card grid.' }),
    defineField({ name: 'image', title: 'Card image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Detailed description',
      type: 'blockContent',
      description: 'The full write-up shown on the project’s own page.',
    }),
    defineField({
      name: 'gallery',
      title: 'Photos & videos',
      type: 'array',
      description: 'Add photos (upload) and videos (paste a YouTube/Vimeo link). Shown on the project page.',
      of: [
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', title: 'Caption', type: 'string' }] },
        { type: 'videoEmbed' },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'relatedPublications',
      title: 'Related Publications',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'publication' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'image' },
  },
});
