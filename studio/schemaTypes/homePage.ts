import { defineType, defineField } from 'sanity';

// Home page content: the hero banner and the section headings. One document.
export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero banner', default: true },
    { name: 'videos', title: 'Gallery' },
    { name: 'sections', title: 'Section headings' },
  ],
  fields: [
    // ---- Hero ----
    defineField({ name: 'heroEyebrow', title: 'Small line above heading', type: 'string', group: 'hero', initialValue: 'Faculty of Engineering and Applied Sciences' }),
    defineField({ name: 'heroHeading', title: 'Main heading', type: 'string', group: 'hero', initialValue: 'Marine and AI systems' }),
    defineField({ name: 'heroTagline', title: 'Tagline', type: 'text', rows: 2, group: 'hero', initialValue: 'Engineering the offshore energy systems of the next century.' }),
    defineField({ name: 'heroPrimaryLabel', title: 'Primary button — label', type: 'string', group: 'hero', initialValue: 'Explore Our Research' }),
    defineField({ name: 'heroPrimaryLink', title: 'Primary button — link', type: 'string', group: 'hero', initialValue: '/research' }),
    defineField({ name: 'heroSecondaryLabel', title: 'Secondary button — label', type: 'string', group: 'hero', initialValue: 'View Publications' }),
    defineField({ name: 'heroSecondaryLink', title: 'Secondary button — link', type: 'string', group: 'hero', initialValue: '/publications' }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true }, group: 'hero', description: 'Shown in the banner. Ignored if a hero video is uploaded.' }),
    defineField({ name: 'heroVideo', title: 'Hero video (e.g. installed FPV footage)', type: 'file', options: { accept: 'video/*' }, group: 'hero', description: 'If set, plays in the banner instead of the image.' }),
    defineField({ name: 'heroCaption', title: 'Image/video caption', type: 'string', group: 'hero', initialValue: 'Installed FPV platform · field footage' }),

    // ---- Home videos ----
    defineField({ name: 'videosEyebrow', title: 'Gallery — small line', type: 'string', group: 'videos', initialValue: 'Watch' }),
    defineField({ name: 'videosTitle', title: 'Gallery — heading', type: 'string', group: 'videos', initialValue: 'Gallery' }),
    defineField({
      name: 'videos',
      title: 'Gallery videos (shown on the home page, 3 per row)',
      type: 'array',
      group: 'videos',
      description: 'Add videos by pasting a YouTube/Vimeo link. This list is separate from project videos.',
      of: [{ type: 'videoEmbed' }],
    }),

    // ---- Section headings ----
    defineField({ name: 'researchEyebrow', title: 'Research — small line', type: 'string', group: 'sections', initialValue: 'What We Do' }),
    defineField({ name: 'researchTitle', title: 'Research — heading', type: 'string', group: 'sections', initialValue: 'Research Highlights' }),
    defineField({ name: 'newsEyebrow', title: 'News — small line', type: 'string', group: 'sections', initialValue: 'News' }),
    defineField({ name: 'newsTitle', title: 'News — heading', type: 'string', group: 'sections', initialValue: 'Latest News' }),
    defineField({ name: 'publicationsEyebrow', title: 'Publications — small line', type: 'string', group: 'sections', initialValue: 'Publications' }),
    defineField({ name: 'publicationsTitle', title: 'Publications — heading', type: 'string', group: 'sections', initialValue: 'Featured Publications' }),
    defineField({ name: 'teamEyebrow', title: 'Team — small line', type: 'string', group: 'sections', initialValue: 'People' }),
    defineField({ name: 'teamTitle', title: 'Team — heading', type: 'string', group: 'sections', initialValue: 'Meet the Team' }),
    defineField({ name: 'partnersEyebrow', title: 'Partners — small line', type: 'string', group: 'sections', initialValue: 'Who We Work With' }),
    defineField({ name: 'partnersTitle', title: 'Partners — heading', type: 'string', group: 'sections', initialValue: 'Partners & Collaborators' }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
});
