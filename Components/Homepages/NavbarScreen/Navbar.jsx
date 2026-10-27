import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { SunIcon, MoonIcon, BrushIcon, ImageIcon, CrossIcon } from '@/Components/Svg/AllIcons';
import MenuIcon from '@/Components/Svg/MenuIcon';
import { nightMode, lightMode, gradient, gimage, THEMES } from '@/store/themeSlice';
import { navLinks } from '@/data/site';

const themeOptions = [
    { theme: THEMES.dark, action: nightMode, title: 'Dark Mode', Icon: MoonIcon },
    { theme: THEMES.light, action: lightMode, title: 'Light Mode', Icon: SunIcon },
    { theme: THEMES.gradient, action: gradient, title: 'Gradient Mode', Icon: BrushIcon, className: 'brush' },
    { theme: THEMES.gradientImage, action: gimage, title: 'Gradient Image Mode', Icon: ImageIcon, className: 'brush' },
];

const NavLinks = ({ className }) => (
    <ul className={className}>
        {navLinks.map(({ href, label }) => (
            <li key={href} className="list-item text-capitalize">
                <Link href={href}>{label}</Link>
            </li>
        ))}
    </ul>
);

const Navbar = () => {
    const [showThemes, setShowThemes] = useState(false);
    const theme = useSelector((state) => state.themeMode.value);
    const dispatch = useDispatch();

    return (
        <nav className="navbar">
            <div className="container">
                <Link href="/" aria-label="Home">
                    <div className="main-icon">
                        <Image src="/images/main-icon.webp" width={30} height={30} title="Ajay Choudhary" alt="Ajay Choudhary" />
                    </div>
                </Link>

                <NavLinks className="navlinks m-auto" />

                <div className="theme-btns">
                    {!showThemes ? (
                        <button type="button" className="selecThemeBtn" onClick={() => setShowThemes(true)} aria-label="Select theme">
                            <Image src="/images/brush.png" width={30} height={30} title="Select Theme" alt="" />
                        </button>
                    ) : (
                        <div className="btnsbox">
                            <button type="button" className="closeThemeBtn" onClick={() => setShowThemes(false)} aria-label="Close theme picker">
                                <CrossIcon />
                            </button>
                            {themeOptions
                                .filter((option) => option.theme !== theme)
                                .map(({ theme: key, action, title, Icon, className = '' }) => (
                                    <button
                                        type="button"
                                        key={key}
                                        className={`icon ${className}`}
                                        onClick={() => dispatch(action())}
                                        title={title}
                                        aria-label={title}
                                    >
                                        <Icon />
                                    </button>
                                ))}
                        </div>
                    )}
                </div>

                <div className="nav-toggler">
                    <span className="icon">
                        <DropdownButton variant="none" id="dropdown-basic-button" title={<MenuIcon />}>
                            <div className="MainMenu">
                                <NavLinks className="listItem" />
                            </div>
                        </DropdownButton>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
