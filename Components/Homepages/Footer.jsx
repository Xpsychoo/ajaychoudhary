import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className="footer">
            <div className="social-links">
                <div className="social-icon" title='Github'>
                    <Link target='_blank' href='https://github.com/Xpsychoo'>
                        <img src="/images/github.webp" alt="git" />
                    </Link>
                </div>
                <div className="social-icon" title='Facebook'>
                    <Link target='_blank' href='https://www.facebook.com/theajaychoudhary7'>
                        <img src="/images/facebook.webp" alt="git" />
                    </Link>
                </div>
                <div className="social-icon" title='Twitter'>
                    <Link target='_blank'href='https://twitter.com/x3ajaychoudhary'>
                    <img src="/images/twitter.webp" alt="twitter" />
                    </Link>
                </div>
                <div className="social-icon" title='Linkedin'>
                    <Link target='_blank' href='https://www.linkedin.com/in/theajaychoudhary'>
                    <img src="/images/linkedin.webp" alt="git" />
                    </Link>
                </div>
                <div className="social-icon" title='Instagram'>
                    <Link target='_blank' href='https://www.instagram.com/___xpsycho'>
                    <img src="/images/instagram.webp" alt="git" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer