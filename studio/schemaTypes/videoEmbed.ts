import { defineType, defineField } from 'sanity';

// A video embed = a YouTube or Vimeo link (the video is hosted there, not
// uploaded here — keeps it free and fast). Editors paste the link and can add a
// title and a description of what the video shows.
export default defineType({
  name: 'videoEmbed',
  title: 'Video (YouTube / Vimeo)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'A short heading shown next to the video.' }),
    defineField({
      name: 'url',
      title: 'YouTube or Vimeo link',
      type: 'url',
      description: 'Paste the normal link, e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'What the video shows (a sentence or a short paragraph).',
    }),
    defineField({
      name: 'projectLink',
      title: 'Link to project (optional)',
      type: 'url',
      description: 'A page on this site or elsewhere, e.g. /research/floating-pv',
      validation: (r) => r.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'papersLink',
      title: 'Link to paper(s) (optional)',
      type: 'url',
      description: 'A DOI, journal page, or the Publications page, e.g. /publications',
      validation: (r) => r.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
    defineField({ name: 'caption', title: 'Caption (optional, used in project galleries)', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'url', desc: 'description' },
    prepare: ({ title, subtitle, desc }) => ({ title: title || desc?.slice(0, 40) || 'Video', subtitle }),
  },
});
