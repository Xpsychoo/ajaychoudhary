import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className="footer">
            <div className="social-links">
                <div className="social-icon" title='Github'>
                    <Link target='_blank' href='https://github.com/Xpsychoo'>
                        <Image src="/images/github.webp" alt="Github" title="Github" width={20} height={20} />
                    </Link>
                </div>
                <div className="social-icon" title='Facebook'>
                    <Link target='_blank' href='https://www.facebook.com/theajaychoudhary7'>
                        <Image src="/images/facebook.webp" alt="Facebook" title="Facebook" width={20} height={20} />
                    </Link>
                </div>
                <div className="social-icon" title='Twitter'>
                    <Link target='_blank' href='https://twitter.com/x3ajaychoudhary'>
                        <Image src="/images/twitter.webp" alt="Twitter" title="Twitter" width={20} height={20} />
                    </Link>
                </div>
                <div className="social-icon" title='Linkedin'>
                    <Link target='_blank' href='https://www.linkedin.com/in/theajaychoudhary'>
                        <Image src="/images/linkedin.webp" alt="Linkedin" title="Linkedin" width={20} height={20} />
                    </Link>
                </div>
                <div className="social-icon" title='Instagram'>
                    <Link target='_blank' href='https://www.instagram.com/___xpsycho'>
                    <Image src="/images/instagram.webp" alt="Instagram" title="Instagram" width={20} height={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer