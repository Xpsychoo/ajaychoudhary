import { monthsBetween } from '@/utils/experience';

/** The month the career started. All "years of experience" figures are derived from this. */
export const CAREER_START = '2021-11';

/** Most recent first. Dates are 'YYYY-MM'; omit `end` for the current role. */
export const experience = [
    {
        company: 'TELUS Digital',
        role: 'App Developer',
        type: 'Full-time',
        location: 'Noida, Uttar Pradesh, India · Remote',
        start: '2025-01',
        skills: ['React.js', 'JavaScript', 'TypeScript', 'Redux', 'REST APIs'],
        highlights: [
            'Build and maintain production web application features in React.js for a global digital customer-experience company.',
            'Turn product requirements and designs into reusable, accessible and well-tested UI components.',
            'Integrate REST APIs and manage application state for data-heavy, high-traffic screens.',
            'Collaborate with distributed teams through code reviews, sprint planning and release cycles.',
        ],
    },
    {
        company: 'Sirovate Technologies Limited',
        role: 'Frontend Developer',
        type: 'Full-time',
        location: 'Remote',
        start: '2023-08',
        end: '2024-10',
        skills: ['JavaScript', 'React.js', 'Next.js', 'Front-End Development', 'MUI'],
        highlights: [
            'Developed responsive, component-driven interfaces with React.js and Next.js.',
            'Implemented UI with Material UI and custom styling, keeping layouts consistent across devices.',
            'Connected frontend modules to backend services and improved page performance and load times.',
        ],
    },
    {
        company: 'Cyber Matrix Solutions Pvt. Ltd.',
        role: 'Frontend Developer',
        type: 'Full-time',
        location: 'Noida, Uttar Pradesh, India',
        start: '2021-11',
        end: '2023-08',
        skills: ['React.js', 'Next.js', 'JavaScript', 'Bootstrap', 'SCSS'],
        highlights: [
            'Delivered the frontend of CureKind (healthcare management), Leadshyne (CRM) and Hillberg (B2B ordering).',
            'Built role-based dashboards, data tables, forms and reports on top of REST APIs.',
            'Converted Figma / Adobe XD designs into pixel-perfect, responsive pages.',
        ],
    },
];

/** Total months since the first day of the career (inclusive of the current month). */
export const careerMonths = (now) => monthsBetween(CAREER_START, undefined, now);

/** Whole years of experience, e.g. 4 for "4+ years". */
export const careerYears = (now) => Math.floor(careerMonths(now) / 12);
