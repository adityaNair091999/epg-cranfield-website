import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add one author per entry, in order.',
    }),
    defineField({ name: 'journal', title: 'Journal / Venue', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'doi', title: 'DOI URL', type: 'url' }),
    defineField({ name: 'abstract', title: 'Abstract', type: 'text', rows: 6 }),
    defineField({ name: 'bibtex', title: 'BibTeX', type: 'text', rows: 6 }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', year: 'year', journal: 'journal' },
    prepare: ({ title, year, journal }) => ({
      title,
      subtitle: [journal, year].filter(Boolean).join(' · '),
    }),
  },
});
