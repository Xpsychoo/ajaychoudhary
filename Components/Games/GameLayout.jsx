import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/Components/Homepages/NavbarScreen/Navbar';
import Footer from '@/Components/Homepages/Footer';

/** Shared shell for /games pages: same navbar, theme and footer as the portfolio. */
const GameLayout = ({ title, description, back = { href: '/', label: 'Back to portfolio' }, children }) => {
    const theme = useSelector((state) => state.themeMode.value);

    return (
        <>
            <Head>
                <title>{`${title} | Ajay Choudhary`}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${theme} main-wrapper`}>
                <Navbar />
                <main className="container gamesMain">
                    <Link href={back.href} className="backLink">
                        <ArrowLeft aria-hidden="true" /> {back.label}
                    </Link>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default GameLayout;
