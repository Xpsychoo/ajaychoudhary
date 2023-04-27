import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className="footer">
            <div className="social-links">
                <div className="social-icon" title='Github'>
                    <Link target='_blank' href='https://github.com/Xpsychoo'>
                        <img src="/images/github.png" alt="git" />
                    </Link>
                </div>
                <div className="social-icon" title='Twitter'>
                    <Link target='_blank'href='https://twitter.com/x3ajaychoudhary'>
                    <img src="/images/twitter.png" alt="twitter" />
                    </Link>
                </div>
                <div className="social-icon" title='Linkedin'>
                    <Link target='_blank' href='https://www.linkedin.com/in/theajaychoudhary'>
                    <img src="/images/linkedin.png" alt="git" />
                    </Link>
                </div>
                <div className="social-icon" title='Instagram'>
                    <Link target='_blank' href='https://www.instagram.com/___xpsycho'>
                    <img src="/images/instagram.png" alt="git" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer