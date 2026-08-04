import { defineType, defineField } from 'sanity';

// A single "Site Settings" document (singleton) that controls which tabs show
// in the website's top menu. Turning a toggle off hides that tab site-wide.
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'menuHeading',
      title: 'Menu visibility',
      type: 'string',
      readOnly: true,
      initialValue: 'Turn a switch OFF to hide that tab from the website menu.',
      description: 'These switches control the top navigation menu on the website.',
    }),
    defineField({ name: 'showResearch', title: 'Show “Research” tab', type: 'boolean', initialValue: true }),
    defineField({ name: 'showPublications', title: 'Show “Publications” tab', type: 'boolean', initialValue: true }),
    defineField({ name: 'showMembers', title: 'Show “Members” tab', type: 'boolean', initialValue: true }),
    defineField({ name: 'showNews', title: 'Show “News” tab', type: 'boolean', initialValue: true }),
    defineField({ name: 'showOpportunities', title: 'Show “Opportunities” tab', type: 'boolean', initialValue: true }),
    defineField({ name: 'showContact', title: 'Show “Contact” tab', type: 'boolean', initialValue: true }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
