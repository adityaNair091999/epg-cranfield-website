import { defineType, defineField } from 'sanity';

// A partner or collaborating organisation, shown as a logo on the home page.
// Upload a logo, add the name, and (optionally) a website link.
export default defineType({
  name: 'partner',
  title: 'Partner / Collaborator',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', description: 'Organisation name (used as the logo alt text).', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'A logo on a transparent or white background works best (PNG or SVG).',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'website', title: 'Website (optional)', type: 'url', description: 'If set, the logo links here.' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first. Leave blank to sort by name.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'website', media: 'logo' },
  },
});
