import Footer from '@/Components/Homepages/Footer'
import HomeScreen from '@/Components/Homepages/HomeScreen'
import Head from 'next/head'
import { useSelector } from 'react-redux'

export default function Home() {

  const theme = useSelector((state) => state.themeMode.value)
  
  return (
    <>
      <Head>
        <title>Ajay Choudhary</title>
        <meta name="description" content="Welcome to Ajay Choudhary's portfolio showcasing his work and skills." />
        <meta name="keywords" content="Ajay Choudhary, portfolio, React.js, Next.js, JavaScript developer, javascript, developer, Software Developer, Web Developer, web designer" />
        <meta name="author" content="Ajay Choudhary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://ajaychoudhary.netlify.app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${theme} main-wrapper`} >
        <HomeScreen />
        <Footer />
      </div>
    </>
  )
}
