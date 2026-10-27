import GitHubIcon from '@/Components/Svg/GitHubIcon';
import LinkedIn from '@/Components/Svg/LinkedIn';
import TwitterIcon from '@/Components/Svg/TwitterIcon';
import FacebookIcon from '@/Components/Svg/FacebookIcon';
import InstaGramIcon from '@/Components/Svg/InstaGramIcon';

export const SITE_URL = 'https://ajaychoudhary.netlify.app';

export const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#whatido', label: 'What I Do' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact Me' },
];

export const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Xpsychoo', Icon: GitHubIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/theajaychoudhary', Icon: LinkedIn },
    { name: 'Twitter', href: 'https://twitter.com/x3ajaychoudhary', Icon: TwitterIcon },
    { name: 'Facebook', href: 'https://www.facebook.com/theajaychoudhary7', Icon: FacebookIcon },
    { name: 'Instagram', href: 'https://www.instagram.com/_ajxy_27', Icon: InstaGramIcon },
];

/** EmailJS public credentials. Override via NEXT_PUBLIC_* env vars if you rotate them. */
export const emailJsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_bz1sjhs',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_5opo4b5',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'SzW6c8-46F6f0Buff',
};
