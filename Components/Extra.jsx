import React from 'react'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Extra = () => {
    return (
        <>
            <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                //className={styles.vercelLogo}
                width={100}
                height={24}
                priority
            />
            <h2 className={inter.className}>
                Learn <span>-&gt;</span>
            </h2>
        </>
    )
}

export default Extra