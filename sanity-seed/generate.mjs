// Generates seed.ndjson for `sanity dataset import`.
// Same content is mirrored in src/lib/sampleData.ts (the offline fallback).
// Images are omitted (upload those in the Studio); the site shows initials /
// placeholders until real photos are added.
import { writeFileSync } from 'node:fs';

let k = 0;
const key = () => `k${(k++).toString(36)}`;
const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks });
const block = (text, style = 'normal', listItem) => {
  const b = { _type: 'block', _key: key(), style, markDefs: [], children: [span(text)] };
  if (listItem) b.listItem = listItem;
  return b;
};
const ref = (id) => ({ _type: 'reference', _key: key(), _ref: id });

const docs = [];

// -------------------------------------------------------------- Members
docs.push(
  {
    _id: 'member-1', _type: 'member',
    name: 'Dr. Luofeng Huang',
    role: 'Supervisor · Group Leader',
    bio: 'Luofeng leads the Energy and Power Group at Cranfield University. His research advances offshore renewable energy through computational fluid dynamics, fluid–structure interaction and experimental testing — spanning floating photovoltaics, wave energy and marine structures.',
    email: 'luofeng.huang@cranfield.ac.uk',
    linkedin: 'https://www.linkedin.com/', googleScholar: 'https://scholar.google.com/',
    startYear: 2021, current: true,
  },
  {
    _id: 'member-2', _type: 'member',
    name: 'Aditya Nair',
    role: 'PhD Researcher',
    bio: 'Aditya researches the CFD simulation of floating photovoltaic systems under wave loading, coupling OpenFOAM and CalculiX through preCICE to predict the motion and structural response of flexible floating solar platforms in realistic sea states.',
    email: 'aditya.nair.817@cranfield.ac.uk',
    linkedin: 'https://www.linkedin.com/', googleScholar: 'https://scholar.google.com/',
    startYear: 2023, current: true,
  },
  {
    _id: 'member-3', _type: 'member',
    name: 'Dr. Sofia Marlowe',
    role: 'Postdoctoral Research Fellow',
    bio: 'Sofia works on wave–structure interaction and mooring dynamics for offshore renewable energy systems, combining high-fidelity numerical modelling with wave-tank testing to assess survivability in extreme sea states.',
    email: 'sofia.marlowe@cranfield.ac.uk',
    linkedin: 'https://www.linkedin.com/', googleScholar: 'https://scholar.google.com/',
    startYear: 2024, current: true,
  }
);

// --------------------------------------------------------- Publications
const pubs = [
  ['pub-1', 'Numerical simulation of floating photovoltaic systems under regular and irregular wave loading',
    ['A. Nair', 'L. Huang'], 'Marine Structures', 2025, 'https://doi.org/10.1016/j.marstruc.2025.103601',
    'A high-fidelity CFD framework is developed to simulate the response of flexible floating photovoltaic platforms under regular and irregular wave loading. Response amplitude operators and structural stresses are quantified across a range of wave conditions, providing design guidance for open-water solar deployment.', true],
  ['pub-2', 'A coupled CFD–FEA framework for wave–structure interaction of compliant offshore platforms',
    ['L. Huang', 'S. Marlowe', 'A. Nair'], 'Ocean Engineering', 2024, 'https://doi.org/10.1016/j.oceaneng.2024.118422',
    'This paper presents and validates a partitioned CFD–FEA framework for the two-way interaction between ocean waves and compliant offshore platforms, benchmarked against wave-tank measurements and applied to floating solar structures.', true],
  ['pub-3', 'Hydrodynamic performance of large-scale floating solar arrays in open water',
    ['S. Marlowe', 'L. Huang'], 'Renewable Energy', 2024, 'https://doi.org/10.1016/j.renene.2024.120915',
    'The hydrodynamic performance of large-scale floating solar arrays is investigated using potential-flow and CFD methods, examining array-level shielding, motion response and load distribution for open-water installations.', true],
  ['pub-4', 'Multi-body hydrodynamic interactions in floating photovoltaic arrays',
    ['A. Nair', 'L. Huang'], 'Applied Ocean Research', 2023, 'https://doi.org/10.1016/j.apor.2023.103712',
    'Multi-body hydrodynamic interactions between closely spaced floating photovoltaic modules are analysed, quantifying how inter-module coupling and connector stiffness govern the collective motion of the array.', false],
  ['pub-5', 'Mooring load analysis of floating photovoltaic platforms under combined wind and wave loading',
    ['S. Marlowe', 'A. Nair', 'L. Huang'], 'Journal of Marine Science and Engineering', 2023, 'https://doi.org/10.3390/jmse11081533',
    'A coupled analysis of mooring loads for floating photovoltaic platforms under combined wind and wave loading, identifying survivability-driving load cases and informing mooring layout and line-sizing decisions.', false],
];
for (const [id, title, authors, journal, year, doi, abstract, featured] of pubs) {
  docs.push({
    _id: id, _type: 'publication', title, authors, journal, year, doi, abstract, featured,
    bibtex: `@article{${id.replace('-', '')},\n  title={${title}},\n  author={${authors.join(' and ')}},\n  journal={${journal}},\n  year={${year}}\n}`,
  });
}

// -------------------------------------------------------------- Projects
docs.push(
  {
    _id: 'project-1', _type: 'project',
    title: 'Floating Photovoltaics under Wave Loading',
    description: 'High-fidelity CFD and fluid–structure interaction modelling of flexible floating photovoltaic platforms subjected to wave loading, predicting motions, structural stresses and energy-relevant response for open-water solar deployment.',
    status: 'ongoing', featured: true,
    relatedPublications: [ref('pub-1'), ref('pub-2')],
  },
  {
    _id: 'project-2', _type: 'project',
    title: 'Multi-body Hydrodynamics of FPV Arrays',
    description: 'Investigating the multi-body hydrodynamic interactions between connected floating photovoltaic modules, from inter-module coupling and connector stiffness to array-scale shielding and collective motion response.',
    status: 'ongoing', featured: true,
    relatedPublications: [ref('pub-3'), ref('pub-4')],
  },
  {
    _id: 'project-3', _type: 'project',
    title: 'Mooring Dynamics and Structural Analysis',
    description: 'Coupled mooring-dynamics and structural-analysis of floating renewable energy platforms under combined wind and wave loading, identifying survivability-driving load cases and informing mooring layout and structural design.',
    status: 'ongoing', featured: true,
    relatedPublications: [ref('pub-5')],
  }
);

// ---------------------------------------------------------------- News
docs.push(
  {
    _id: 'news-1', _type: 'newsPost',
    title: 'Paper accepted in Marine Structures',
    date: '2026-07-20', slug: { _type: 'slug', current: 'paper-accepted-marine-structures' },
    body: [
      block('We are delighted to announce that our paper on the numerical simulation of floating photovoltaic systems under regular and irregular wave loading has been accepted for publication in Marine Structures.'),
      block('The study develops a high-fidelity CFD framework and quantifies response amplitude operators and structural stresses across a wide range of wave conditions.'),
      block('What this means', 'h2'),
      block('The results give designers a validated tool to predict the motion and structural response of floating solar platforms before deployment in real sea states.'),
    ],
  },
  {
    _id: 'news-2', _type: 'newsPost',
    title: 'Group presents at the International Conference on Offshore Renewable Energy',
    date: '2026-06-10', slug: { _type: 'slug', current: 'icore-2026-presentation' },
    body: [
      block('Members of the Energy and Power Group presented recent work at the International Conference on Offshore Renewable Energy, covering floating photovoltaics, multi-body hydrodynamics and mooring survivability.'),
      block('The presentations prompted valuable discussion with industry and academic partners on scaling floating solar for open-water sites.'),
    ],
  },
  {
    _id: 'news-3', _type: 'newsPost',
    title: 'New PhD student joins the Energy and Power Group',
    date: '2026-05-05', slug: { _type: 'slug', current: 'new-phd-student-2026' },
    body: [
      block('We are pleased to welcome a new PhD student to the Energy and Power Group, joining our floating photovoltaics and wave–structure interaction research.'),
      block('Their work will strengthen the group’s programme on the hydrodynamics and structural response of offshore renewable energy platforms.'),
    ],
  }
);

// -------------------------------------------------------- Opportunities
docs.push(
  {
    _id: 'opp-1', _type: 'opportunity',
    title: 'PhD Studentship: Offshore Renewable Energy CFD',
    type: 'PhD',
    description: [
      block('A fully funded PhD studentship is available in the CFD modelling of offshore renewable energy systems, with a focus on floating photovoltaics and wave–structure interaction.'),
      block('You will', 'h2'),
      block('Develop high-fidelity CFD and fluid–structure interaction models of floating renewable energy platforms.', 'normal', 'bullet'),
      block('Validate simulations against wave-tank and, where available, field measurements.', 'normal', 'bullet'),
      block('Work within an active group using OpenFOAM, CalculiX and preCICE on HPC resources.', 'normal', 'bullet'),
    ],
    deadline: '2026-09-30',
    howToApply: 'Send your CV, a one-page statement of interest and academic transcripts to luofeng.huang@cranfield.ac.uk with the subject line "PhD — Offshore Renewable Energy CFD". Informal enquiries are welcome.',
    open: true,
  },
  {
    _id: 'opp-2', _type: 'opportunity',
    title: 'Postdoctoral Position: Wave–Structure Interaction',
    type: 'Postdoc',
    description: [
      block('We are seeking a Postdoctoral Research Associate to lead numerical and experimental work on wave–structure interaction for offshore renewable energy platforms.'),
      block('The role suits a candidate with a strong background in CFD, hydrodynamics or ocean engineering and an interest in bridging simulation and physical testing.'),
    ],
    deadline: '2026-08-31',
    howToApply: 'Apply through the Cranfield University jobs portal and email luofeng.huang@cranfield.ac.uk to register your interest.',
    open: true,
  }
);

const ndjson = docs.map((d) => JSON.stringify(d)).join('\n') + '\n';
writeFileSync(new URL('./seed.ndjson', import.meta.url), ndjson);
console.log(`Wrote ${docs.length} documents to seed.ndjson`);
