import Head from 'next/head';
import { useSelector } from 'react-redux';
import Footer from '@/Components/Homepages/Footer';
import HomeScreen from '@/Components/Homepages/HomeScreen';
import { SITE_URL } from '@/data/site';
import { careerYears } from '@/data/experience';

const TITLE = 'Ajay Choudhary | Frontend & App Developer (React.js, Next.js)';

export default function Home({ years }) {
  const theme = useSelector((state) => state.themeMode.value);
  const description =
    `Ajay Choudhary — Frontend & App Developer at TELUS Digital with ${years}+ years of experience ` +
    'building scalable web applications with React.js, Next.js and JavaScript.';

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Ajay Choudhary, Ajay Kumar, portfolio, Frontend Developer, App Developer, React.js, Next.js, JavaScript, TypeScript, Web Developer, Noida" />
        <meta name="author" content="Ajay Choudhary" />
        <meta name="google-site-verification" content="s-g-2pU56xr45RqpSy6msdSeayiUuG3EAs_sb8Et4Yg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/images/profile.jpg`} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${theme} main-wrapper`}>
        <HomeScreen />
        <Footer />
      </div>
    </>
  );
}

// The client recomputes years after mount; this keeps the pre-rendered HTML
// (what search engines see) close to correct between deploys.
export function getStaticProps() {
  return { props: { years: careerYears(new Date()) } };
}
