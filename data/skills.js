import { Atom, Braces, Database, Layers, Network, Paintbrush, Server, Shield, Wrench } from 'lucide-react';

export const skills = [
    {
        head: 'React.js / Next.js',
        Icon: Atom,
        description:
            'My primary stack. I build component-driven applications with hooks, context and Redux Toolkit, ' +
            'and use Next.js for routing, static generation, SEO and API routes. Comfortable with performance ' +
            'tuning, code-splitting and structuring large codebases for teams.',
    },
    {
        head: 'JavaScript / TypeScript',
        Icon: Braces,
        description:
            'Strong modern JavaScript (ES6+): async/await, modules, closures, array and object patterns, and ' +
            'DOM APIs. I use TypeScript to type components, API responses and shared models so bugs are caught ' +
            'before they reach production.',
    },
    {
        head: 'State & APIs',
        Icon: Network,
        description:
            'Redux Toolkit, React Query style data fetching, Axios and Fetch. I design API layers with error ' +
            'handling, loading states and caching, and integrate REST services into dashboards, forms and reports.',
    },
    {
        head: 'HTML & CSS / SCSS',
        Icon: Paintbrush,
        description:
            'Semantic, accessible HTML and well-organised CSS/SCSS. Flexbox, Grid, animations and responsive ' +
            'design that holds up from small phones to wide desktop screens.',
    },
    {
        head: 'UI Libraries',
        Icon: Layers,
        description:
            'Material UI, Bootstrap / React-Bootstrap and Tailwind CSS. I pick the right tool per project and ' +
            'keep the design system consistent through theming and reusable components.',
    },
    {
        head: 'Node.js & Express',
        Icon: Server,
        description:
            'Building REST APIs with Express, middleware, routing and authentication, so I can work across ' +
            'the stack and understand the services my frontends depend on.',
    },
    {
        head: 'MongoDB',
        Icon: Database,
        description:
            'Schema design with Mongoose, CRUD operations, querying, indexing and aggregation pipelines for ' +
            'the Node.js services I build.',
    },
    {
        head: 'Angular',
        Icon: Shield,
        description:
            'Components, services, dependency injection, pipes and routing — used to build personal projects ' +
            'and to work comfortably in Angular codebases when required.',
    },
    {
        head: 'Tools & Workflow',
        Icon: Wrench,
        description:
            'Git and GitHub, code reviews, Agile/Scrum, Figma and Adobe XD hand-off, browser DevTools, ESLint, ' +
            'and deployments on Netlify and Vercel.',
    },
];
