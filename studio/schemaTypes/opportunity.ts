import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'opportunity',
  title: 'Opportunity',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'PhD', value: 'PhD' },
          { title: 'Postdoc', value: 'Postdoc' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'radio',
      },
      initialValue: 'PhD',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'blockContent' }),
    defineField({ name: 'deadline', title: 'Deadline (optional)', type: 'date' }),
    defineField({ name: 'howToApply', title: 'How to Apply', type: 'text', rows: 4 }),
    defineField({
      name: 'open',
      title: 'Open?',
      type: 'boolean',
      description: 'Untick when the position is filled or closed.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
});
