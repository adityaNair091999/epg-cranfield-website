import { defineType, defineField } from 'sanity';

// A video embed = a YouTube or Vimeo link (the video is hosted there, not
// uploaded here — keeps it free and fast). Editors just paste the link.
export default defineType({
  name: 'videoEmbed',
  title: 'Video (YouTube / Vimeo)',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube or Vimeo link',
      type: 'url',
      description: 'Paste the normal link, e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'url' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Video', subtitle }),
  },
});
