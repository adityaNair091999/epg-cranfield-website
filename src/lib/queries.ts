// GROQ queries. Each query projects image references down to plain URLs
// (`asset->url`) so pages and components receive a simple string either way.

export const membersQuery = `*[_type == "member"] | order(current desc, startYear asc){
  _id, name, role, bio, email, linkedin, googleScholar, startYear, current,
  "photoUrl": photo.asset->url
}`;

export const publicationsQuery = `*[_type == "publication"] | order(year desc, title asc){
  _id, title, authors, journal, year, doi, abstract, bibtex, featured
}`;

export const featuredPublicationsQuery = `*[_type == "publication" && featured == true] | order(year desc)[0...3]{
  _id, title, authors, journal, year, doi, abstract, bibtex, featured
}`;

export const projectsQuery = `*[_type == "project"] | order(featured desc, title asc){
  _id, title, description, status, featured,
  "imageUrl": image.asset->url,
  "relatedPublications": relatedPublications[]->{ _id, title, year, doi }
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(title asc)[0...3]{
  _id, title, description, status, featured,
  "imageUrl": image.asset->url,
  "relatedPublications": relatedPublications[]->{ _id, title, year, doi }
}`;

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
