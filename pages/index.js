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
        <meta name="keywords" content="Ajay Choudhary, portfolio, React.js, Next.js, JavaScript, web designer" />
        <meta name="author" content="Ajay Choudhary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <div className={`${theme} main-wrapper`} style={{ backgroundImage: theme === 'gradient image' && `url('/images/bg-img-blur.png')` }}>
        <HomeScreen />
        <Footer />
      </div>
    </>
  )
}
