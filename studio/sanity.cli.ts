import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // The permanent address for the deployed Studio: <studioHost>.sanity.studio
  studioHost: 'energy-power-cranfield',
});
