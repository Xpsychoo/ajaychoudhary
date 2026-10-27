import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { socialLinks } from '@/data/site';

const Footer = () => (
    <footer className="footer">
        <div className="social-links">
            {socialLinks.map(({ name, href, icon }) => (
                <div key={name} className="social-icon" title={name}>
                    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                        <Image src={icon} alt={name} width={20} height={20} />
                    </Link>
                </div>
            ))}
        </div>
    </footer>
);

export default Footer;
