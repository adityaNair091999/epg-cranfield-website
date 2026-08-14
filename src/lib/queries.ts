// GROQ queries. Each query projects image references down to plain URLs
// (`asset->url`) so pages and components receive a simple string either way.

export const membersQuery = `*[_type == "member"] | order(current desc, startYear asc){
  _id, name, role, bio, email, linkedin, googleScholar, startYear, current,
  "photoUrl": photo.asset->url
}`;

export const partnersQuery = `*[_type == "partner"] | order(order asc, name asc){
  _id, name, website, "logoUrl": logo.asset->url
}`;

export const publicationsQuery = `*[_type == "publication"] | order(year desc, title asc){
  _id, title, authors, journal, year, doi, abstract, bibtex, featured
}`;

export const featuredPublicationsQuery = `*[_type == "publication" && featured == true] | order(year desc)[0...3]{
  _id, title, authors, journal, year, doi, abstract, bibtex, featured
}`;

const projectFields = `
  _id, title, "slug": slug.current, description, status, featured, body,
  "imageUrl": image.asset->url,
  "gallery": gallery[]{ _type, _key, caption, url, "imageUrl": asset->url },
  "relatedPublications": relatedPublications[]->{ _id, title, year, doi }
`;

export const projectsQuery = `*[_type == "project"] | order(featured desc, title asc){${projectFields}}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(title asc)[0...3]{${projectFields}}`;

export const newsQuery = `*[_type == "newsPost"] | order(date desc){
  _id, title, date, "slug": slug.current, body,
  "imageUrl": image.asset->url
}`;

export const recentNewsQuery = `*[_type == "newsPost"] | order(date desc)[0...3]{
  _id, title, date, "slug": slug.current, body,
  "imageUrl": image.asset->url
}`;

export const newsPostQuery = `*[_type == "newsPost" && slug.current == $slug][0]{
  _id, title, date, "slug": slug.current, body,
  "imageUrl": image.asset->url
}`;

export const opportunitiesQuery = `*[_type == "opportunity"] | order(open desc, deadline asc){
  _id, title, type, description, deadline, howToApply, open
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  groupName, groupShortName, university, navCtaLabel, navCtaLink,
  addressLines, email, phone, groupLeadName, groupLeadRole, charityLine, mapEmbedUrl,
  showResearch, showPublications, showMembers, showNews, showOpportunities, showContact
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroEyebrow, heroHeading, heroTagline,
  heroPrimaryLabel, heroPrimaryLink, heroSecondaryLabel, heroSecondaryLink,
  heroCaption,
  "heroImageUrl": heroImage.asset->url,
  "heroVideoUrl": heroVideo.asset->url,
  videosEyebrow, videosTitle,
  "videos": videos[]{ _key, url, title, description, projectLink, papers[]{ _key, label, url }, caption },
  researchEyebrow, researchTitle, newsEyebrow, newsTitle,
  publicationsEyebrow, publicationsTitle, teamEyebrow, teamTitle,
  partnersEyebrow, partnersTitle
}`;

export const pageBannersQuery = `*[_type == "pageBanners"][0]`;
