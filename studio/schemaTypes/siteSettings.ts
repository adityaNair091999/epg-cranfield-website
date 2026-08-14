import { defineType, defineField } from 'sanity';

// Global, site-wide content: brand/name, footer + contact details, and which
// menu tabs are shown. One document (singleton).
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand & name', default: true },
    { name: 'contact', title: 'Contact & footer' },
    { name: 'menu', title: 'Menu visibility' },
  ],
  fields: [
    // ---- Brand ----
    defineField({ name: 'groupName', title: 'Group name', type: 'string', group: 'brand', initialValue: 'Energy and Power Group' }),
    defineField({ name: 'groupShortName', title: 'Short name / logo text', type: 'string', group: 'brand', initialValue: 'EPG' }),
    defineField({ name: 'university', title: 'University / institution', type: 'string', group: 'brand', initialValue: 'Cranfield University' }),
    defineField({ name: 'navCtaLabel', title: 'Menu button label', type: 'string', group: 'brand', initialValue: 'Explore Our Research' }),
    defineField({ name: 'navCtaLink', title: 'Menu button link', type: 'string', group: 'brand', initialValue: '/research' }),

    // ---- Contact / footer ----
    defineField({
      name: 'addressLines', title: 'Address (one line per entry)', type: 'array', of: [{ type: 'string' }], group: 'contact',
      initialValue: ['Cranfield University', 'College Road, Cranfield', 'Bedford, MK43 0AL, United Kingdom'],
    }),
    defineField({ name: 'email', title: 'Contact email', type: 'string', group: 'contact', initialValue: 'luofeng.huang@cranfield.ac.uk' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact', initialValue: '+44 (0)1234 750111' }),
    defineField({ name: 'groupLeadName', title: 'Group lead — name', type: 'string', group: 'contact', initialValue: 'Dr. Luofeng Huang' }),
    defineField({ name: 'groupLeadRole', title: 'Group lead — role', type: 'string', group: 'contact', initialValue: 'Lecturer in Offshore Renewable Energy' }),
    defineField({ name: 'charityLine', title: 'Footer small print', type: 'string', group: 'contact', initialValue: 'Cranfield University is a registered charity' }),
    defineField({
      name: 'mapEmbedUrl', title: 'Map embed URL (OpenStreetMap)', type: 'url', group: 'contact',
      description: 'The src of the map iframe on the Contact page.',
      initialValue: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.6620%2C52.0560%2C-0.5960%2C52.0870&layer=mapnik&marker=52.0716%2C-0.6286',
    }),

    // ---- Menu toggles ----
    defineField({ name: 'showResearch', title: 'Show “Research” tab', type: 'boolean', group: 'menu', initialValue: true }),
    defineField({ name: 'showPublications', title: 'Show “Publications” tab', type: 'boolean', group: 'menu', initialValue: true }),
    defineField({ name: 'showMembers', title: 'Show “Members” tab', type: 'boolean', group: 'menu', initialValue: true }),
    defineField({ name: 'showPartners', title: 'Show “Partners” tab', type: 'boolean', group: 'menu', initialValue: true }),
    defineField({ name: 'showNews', title: 'Show “News” tab', type: 'boolean', group: 'menu', initialValue: true }),
    defineField({ name: 'showOpportunities', title: 'Show “Opportunities” tab', type: 'boolean', group: 'menu', initialValue: true }),
    defineField({ name: 'showContact', title: 'Show “Contact” tab', type: 'boolean', group: 'menu', initialValue: true }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
