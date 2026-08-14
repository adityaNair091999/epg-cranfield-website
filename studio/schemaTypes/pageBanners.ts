import { defineType, defineField } from 'sanity';

// The banner (eyebrow + title + intro) at the top of each interior page. One doc.
const page = (
  key: string, label: string, eyebrow: string, title: string, intro: string
) => [
  defineField({ name: `${key}Eyebrow`, title: `${label} — small line`, type: 'string', group: key, initialValue: eyebrow }),
  defineField({ name: `${key}Title`, title: `${label} — title`, type: 'string', group: key, initialValue: title }),
  defineField({ name: `${key}Intro`, title: `${label} — intro`, type: 'text', rows: 3, group: key, initialValue: intro }),
];

export default defineType({
  name: 'pageBanners',
  title: 'Page Banners',
  type: 'document',
  groups: [
    { name: 'research', title: 'Research', default: true },
    { name: 'publications', title: 'Publications' },
    { name: 'members', title: 'Members' },
    { name: 'partners', title: 'Partners' },
    { name: 'news', title: 'News' },
    { name: 'opportunities', title: 'Opportunities' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    ...page('research', 'Research', 'Research', 'Research Projects', 'Our work spans floating photovoltaics, wave–structure interaction and computational fluid dynamics — combining high-fidelity simulation with experimental validation.'),
    ...page('publications', 'Publications', 'Publications', 'Publications', 'Peer-reviewed journal papers and conference contributions from the group. Filter by year or search by title, author or journal.'),
    ...page('members', 'Members', 'People', 'Members', 'The researchers, students and staff driving our offshore renewable energy work.'),
    ...page('partners', 'Partners', 'Who We Work With', 'Partners & Collaborators', 'The organisations, institutions and industry partners we collaborate with across our offshore renewable energy research.'),
    ...page('news', 'News', 'News', 'News & Updates', 'Announcements, publications, events and milestones from the Energy and Power Group.'),
    ...page('opportunities', 'Opportunities', 'Join Us', 'Opportunities', 'Open PhD studentships, postdoctoral positions and other opportunities to join the Energy and Power Group.'),
    ...page('contact', 'Contact', 'Get in Touch', 'Contact', 'Questions about our research, collaboration or joining the group? Reach out — we are based at Cranfield University.'),
  ],
  preview: { prepare: () => ({ title: 'Page Banners' }) },
});
