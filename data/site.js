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
    { name: 'GitHub', href: 'https://github.com/Xpsychoo', icon: '/images/github.webp' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/theajaychoudhary', icon: '/images/linkedin.webp' },
    { name: 'Twitter', href: 'https://twitter.com/x3ajaychoudhary', icon: '/images/twitter.webp' },
    { name: 'Facebook', href: 'https://www.facebook.com/theajaychoudhary7', icon: '/images/facebook.webp' },
    { name: 'Instagram', href: 'https://www.instagram.com/_ajxy_27', icon: '/images/instagram.webp' },
];

/** EmailJS public credentials. Override via NEXT_PUBLIC_* env vars if you rotate them. */
export const emailJsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_bz1sjhs',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_5opo4b5',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'SzW6c8-46F6f0Buff',
};
