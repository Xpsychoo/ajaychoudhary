# Ajay Choudhary — Portfolio

Personal portfolio built with **Next.js 13**, **React 18**, **Redux Toolkit**, **React-Bootstrap** and **SCSS**.
Live: https://ajaychoudhary.netlify.app

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Project structure

```
data/          All site content — edit these files to update the portfolio
  experience.js  Work history + CAREER_START (years of experience are derived from it)
  projects.js    Project cards
  skills.js      Skill cards
  services.js    "What I do" cards
  site.js        Nav links, social links, EmailJS config
Components/    UI components (Homepages/* are the page sections)
pages/         Next.js pages; pages/api/* expose the same data as JSON
store/         Redux store (theme switcher)
styles/        Styles.scss (compiled by Next via the `sass` package)
utils/         Date/experience helpers
```

## Updating content

- **New job:** add an entry at the top of `experience` in `data/experience.js` (dates as `'YYYY-MM'`, omit `end` for the current role).
- **Experience counter:** calculated live in the browser from `CAREER_START` (`2021-11`), so "X+ years" and per-role durations stay current without redeploying.
- **Contact form:** uses EmailJS. To rotate keys, set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in `.env.local` / Netlify.
