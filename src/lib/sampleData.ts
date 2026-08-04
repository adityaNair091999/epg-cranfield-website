// Built-in sample content — the offline fallback used when no Sanity project is
// connected OR when a live query returns nothing. It mirrors the seed content in
// ../../sanity-seed/generate.mjs so the site looks identical before and after
// the Sanity dataset is populated.

import type {
  Member,
  Publication,
  Project,
  NewsPost,
  Opportunity,
} from './types';

const p = (text: string) =>
  ({ _type: 'block' as const, style: 'normal' as const, children: [{ _type: 'span' as const, text, marks: [] }] });
const h2 = (text: string) =>
  ({ _type: 'block' as const, style: 'h2' as const, children: [{ _type: 'span' as const, text, marks: [] }] });
const bullet = (text: string) =>
  ({ _type: 'block' as const, style: 'normal' as const, listItem: 'bullet' as const, children: [{ _type: 'span' as const, text, marks: [] }] });

export const sampleMembers: Member[] = [
  {
    _id: 'member-1',
    name: 'Dr. Luofeng Huang',
    role: 'Supervisor · Group Leader',
    bio: 'Luofeng leads the Energy and Power Group at Cranfield University. His research advances offshore renewable energy through computational fluid dynamics, fluid–structure interaction and experimental testing — spanning floating photovoltaics, wave energy and marine structures.',
    photoUrl: '/samples/member-1.svg',
    email: 'luofeng.huang@cranfield.ac.uk',
    linkedin: 'https://www.linkedin.com/',
    googleScholar: 'https://scholar.google.com/',
    startYear: 2021,
    current: true,
  },
  {
    _id: 'member-2',
    name: 'Aditya Nair',
    role: 'PhD Researcher',
    bio: 'Aditya researches the CFD simulation of floating photovoltaic systems under wave loading, coupling OpenFOAM and CalculiX through preCICE to predict the motion and structural response of flexible floating solar platforms in realistic sea states.',
    photoUrl: '/samples/member-2.svg',
    email: 'aditya.nair.817@cranfield.ac.uk',
    linkedin: 'https://www.linkedin.com/',
    googleScholar: 'https://scholar.google.com/',
    startYear: 2023,
    current: true,
  },
  {
    _id: 'member-3',
    name: 'Dr. Sofia Marlowe',
    role: 'Postdoctoral Research Fellow',
    bio: 'Sofia works on wave–structure interaction and mooring dynamics for offshore renewable energy systems, combining high-fidelity numerical modelling with wave-tank testing to assess survivability in extreme sea states.',
    photoUrl: '/samples/member-3.svg',
    email: 'sofia.marlowe@cranfield.ac.uk',
    linkedin: 'https://www.linkedin.com/',
    googleScholar: 'https://scholar.google.com/',
    startYear: 2024,
    current: true,
  },
];

export const samplePublications: Publication[] = [
  {
    _id: 'pub-1',
    title: 'Numerical simulation of floating photovoltaic systems under regular and irregular wave loading',
    authors: ['A. Nair', 'L. Huang'],
    journal: 'Marine Structures',
    year: 2025,
    doi: 'https://doi.org/10.1016/j.marstruc.2025.103601',
    abstract:
      'A high-fidelity CFD framework is developed to simulate the response of flexible floating photovoltaic platforms under regular and irregular wave loading. Response amplitude operators and structural stresses are quantified across a range of wave conditions, providing design guidance for open-water solar deployment.',
    bibtex:
      '@article{pub1,\n  title={Numerical simulation of floating photovoltaic systems under regular and irregular wave loading},\n  author={Nair, A. and Huang, L.},\n  journal={Marine Structures},\n  year={2025}\n}',
    featured: true,
  },
  {
    _id: 'pub-2',
    title: 'A coupled CFD–FEA framework for wave–structure interaction of compliant offshore platforms',
    authors: ['L. Huang', 'S. Marlowe', 'A. Nair'],
    journal: 'Ocean Engineering',
    year: 2024,
    doi: 'https://doi.org/10.1016/j.oceaneng.2024.118422',
    abstract:
      'This paper presents and validates a partitioned CFD–FEA framework for the two-way interaction between ocean waves and compliant offshore platforms, benchmarked against wave-tank measurements and applied to floating solar structures.',
    bibtex:
      '@article{pub2,\n  title={A coupled CFD--FEA framework for wave--structure interaction of compliant offshore platforms},\n  author={Huang, L. and Marlowe, S. and Nair, A.},\n  journal={Ocean Engineering},\n  year={2024}\n}',
    featured: true,
  },
  {
    _id: 'pub-3',
    title: 'Hydrodynamic performance of large-scale floating solar arrays in open water',
    authors: ['S. Marlowe', 'L. Huang'],
    journal: 'Renewable Energy',
    year: 2024,
    doi: 'https://doi.org/10.1016/j.renene.2024.120915',
    abstract:
      'The hydrodynamic performance of large-scale floating solar arrays is investigated using potential-flow and CFD methods, examining array-level shielding, motion response and load distribution for open-water installations.',
    bibtex:
      '@article{pub3,\n  title={Hydrodynamic performance of large-scale floating solar arrays in open water},\n  author={Marlowe, S. and Huang, L.},\n  journal={Renewable Energy},\n  year={2024}\n}',
    featured: true,
  },
  {
    _id: 'pub-4',
    title: 'Multi-body hydrodynamic interactions in floating photovoltaic arrays',
    authors: ['A. Nair', 'L. Huang'],
    journal: 'Applied Ocean Research',
    year: 2023,
    doi: 'https://doi.org/10.1016/j.apor.2023.103712',
    abstract:
      'Multi-body hydrodynamic interactions between closely spaced floating photovoltaic modules are analysed, quantifying how inter-module coupling and connector stiffness govern the collective motion of the array.',
    bibtex:
      '@article{pub4,\n  title={Multi-body hydrodynamic interactions in floating photovoltaic arrays},\n  author={Nair, A. and Huang, L.},\n  journal={Applied Ocean Research},\n  year={2023}\n}',
    featured: false,
  },
  {
    _id: 'pub-5',
    title: 'Mooring load analysis of floating photovoltaic platforms under combined wind and wave loading',
    authors: ['S. Marlowe', 'A. Nair', 'L. Huang'],
    journal: 'Journal of Marine Science and Engineering',
    year: 2023,
    doi: 'https://doi.org/10.3390/jmse11081533',
    abstract:
      'A coupled analysis of mooring loads for floating photovoltaic platforms under combined wind and wave loading, identifying survivability-driving load cases and informing mooring layout and line-sizing decisions.',
    bibtex:
      '@article{pub5,\n  title={Mooring load analysis of floating photovoltaic platforms under combined wind and wave loading},\n  author={Marlowe, S. and Nair, A. and Huang, L.},\n  journal={Journal of Marine Science and Engineering},\n  year={2023}\n}',
    featured: false,
  },
];

export const sampleProjects: Project[] = [
  {
    _id: 'project-1',
    title: 'Floating Photovoltaics under Wave Loading',
    description:
      'High-fidelity CFD and fluid–structure interaction modelling of flexible floating photovoltaic platforms subjected to wave loading, predicting motions, structural stresses and energy-relevant response for open-water solar deployment.',
    imageUrl: '/samples/project-1.svg',
    status: 'ongoing',
    relatedPublications: [
      { _id: 'pub-1', title: samplePublications[0].title, year: 2025, doi: samplePublications[0].doi },
      { _id: 'pub-2', title: samplePublications[1].title, year: 2024, doi: samplePublications[1].doi },
    ],
    featured: true,
  },
  {
    _id: 'project-2',
    title: 'Multi-body Hydrodynamics of FPV Arrays',
    description:
      'Investigating the multi-body hydrodynamic interactions between connected floating photovoltaic modules, from inter-module coupling and connector stiffness to array-scale shielding and collective motion response.',
    imageUrl: '/samples/project-2.svg',
    status: 'ongoing',
    relatedPublications: [
      { _id: 'pub-3', title: samplePublications[2].title, year: 2024, doi: samplePublications[2].doi },
      { _id: 'pub-4', title: samplePublications[3].title, year: 2023, doi: samplePublications[3].doi },
    ],
    featured: true,
  },
  {
    _id: 'project-3',
    title: 'Mooring Dynamics and Structural Analysis',
    description:
      'Coupled mooring-dynamics and structural-analysis of floating renewable energy platforms under combined wind and wave loading, identifying survivability-driving load cases and informing mooring layout and structural design.',
    imageUrl: '/samples/project-3.svg',
    status: 'ongoing',
    relatedPublications: [
      { _id: 'pub-5', title: samplePublications[4].title, year: 2023, doi: samplePublications[4].doi },
    ],
    featured: true,
  },
];

export const sampleNews: NewsPost[] = [
  {
    _id: 'news-1',
    title: 'Paper accepted in Marine Structures',
    date: '2026-07-20',
    slug: 'paper-accepted-marine-structures',
    imageUrl: '/samples/news-1.svg',
    body: [
      p('We are delighted to announce that our paper on the numerical simulation of floating photovoltaic systems under regular and irregular wave loading has been accepted for publication in Marine Structures.'),
      p('The study develops a high-fidelity CFD framework and quantifies response amplitude operators and structural stresses across a wide range of wave conditions.'),
      h2('What this means'),
      p('The results give designers a validated tool to predict the motion and structural response of floating solar platforms before deployment in real sea states.'),
    ],
  },
  {
    _id: 'news-2',
    title: 'Group presents at the International Conference on Offshore Renewable Energy',
    date: '2026-06-10',
    slug: 'icore-2026-presentation',
    imageUrl: '/samples/news-2.svg',
    body: [
      p('Members of the Energy and Power Group presented recent work at the International Conference on Offshore Renewable Energy, covering floating photovoltaics, multi-body hydrodynamics and mooring survivability.'),
      p('The presentations prompted valuable discussion with industry and academic partners on scaling floating solar for open-water sites.'),
    ],
  },
  {
    _id: 'news-3',
    title: 'New PhD student joins the Energy and Power Group',
    date: '2026-05-05',
    slug: 'new-phd-student-2026',
    imageUrl: '/samples/news-3.svg',
    body: [
      p('We are pleased to welcome a new PhD student to the Energy and Power Group, joining our floating photovoltaics and wave–structure interaction research.'),
      p('Their work will strengthen the group’s programme on the hydrodynamics and structural response of offshore renewable energy platforms.'),
    ],
  },
];

export const sampleOpportunities: Opportunity[] = [
  {
    _id: 'opp-1',
    title: 'PhD Studentship: Offshore Renewable Energy CFD',
    type: 'PhD',
    description: [
      p('A fully funded PhD studentship is available in the CFD modelling of offshore renewable energy systems, with a focus on floating photovoltaics and wave–structure interaction.'),
      h2('You will'),
      bullet('Develop high-fidelity CFD and fluid–structure interaction models of floating renewable energy platforms.'),
      bullet('Validate simulations against wave-tank and, where available, field measurements.'),
      bullet('Work within an active group using OpenFOAM, CalculiX and preCICE on HPC resources.'),
    ],
    deadline: '2026-09-30',
    howToApply:
      'Send your CV, a one-page statement of interest and academic transcripts to luofeng.huang@cranfield.ac.uk with the subject line "PhD — Offshore Renewable Energy CFD". Informal enquiries are welcome.',
    open: true,
  },
  {
    _id: 'opp-2',
    title: 'Postdoctoral Position: Wave–Structure Interaction',
    type: 'Postdoc',
    description: [
      p('We are seeking a Postdoctoral Research Associate to lead numerical and experimental work on wave–structure interaction for offshore renewable energy platforms.'),
      p('The role suits a candidate with a strong background in CFD, hydrodynamics or ocean engineering and an interest in bridging simulation and physical testing.'),
    ],
    deadline: '2026-08-31',
    howToApply:
      'Apply through the Cranfield University jobs portal and email luofeng.huang@cranfield.ac.uk to register your interest.',
    open: true,
  },
];
