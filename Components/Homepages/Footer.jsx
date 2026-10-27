import React from 'react';
import Link from 'next/link';
import { socialLinks } from '@/data/site';

const Footer = () => (
    <footer className="footer">
        <div className="social-links">
            {socialLinks.map(({ name, href, Icon }) => (
                <div key={name} className="social-icon" title={name}>
                    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                        <Icon />
                    </Link>
                </div>
            ))}
        </div>
    </footer>
);

export default Footer;
