import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// "Site Settings" is a singleton: exactly one document, not a list you add to.
const SINGLETON_TYPES = new Set(['siteSettings', 'homePage', 'pageBanners']);
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

// The project ID and dataset come from environment variables. See studio/.env.
export default defineConfig({
  name: 'default',
  title: 'Energy and Power Group',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons pinned at the top
            S.listItem().title('Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Home Page').id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem().title('Page Banners').id('pageBanners')
              .child(S.document().schemaType('pageBanners').documentId('pageBanners')),
            S.divider(),
            // Everything else as normal, minus the singletons
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON_TYPES.has(item.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Don't offer "create new" templates for the singleton.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // For the singleton, only allow publish/discard/restore (no delete/duplicate).
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
});
