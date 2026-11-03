import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/data/site';
import ThemePicker from './ThemePicker';

const sectionId = (href) => href.split('#')[1];

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * scrolled: page has left the very top (navbar tightens into a pill)
 * hidden:   user is scrolling down (navbar slides away, comes back on scroll up)
 * activeId: id of the section currently on screen
 */
const useNavScroll = () => {
    const [state, setState] = useState({ scrolled: false, hidden: false, activeId: null });

    useEffect(() => {
        let lastY = window.scrollY;
        let frame = 0;

        const update = () => {
            frame = 0;
            const y = window.scrollY;
            const sections = [...document.querySelectorAll('main section[id]')];
            const current = sections.filter((s) => s.getBoundingClientRect().top <= window.innerHeight * 0.4).pop();
            const next = {
                scrolled: y > 40,
                hidden: y > 300 && y > lastY + 4,
                activeId: current ? current.id : null,
            };
            if (Math.abs(y - lastY) > 4) lastY = y;
            setState((prev) => (
                prev.scrolled === next.scrolled && prev.hidden === next.hidden && prev.activeId === next.activeId ? prev : next
            ));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return state;
};

/** Desktop links with a pill that slides to the hovered link, or back to the active one. */
const DesktopLinks = ({ activeId }) => {
    const listRef = useRef(null);
    const [hoverId, setHoverId] = useState(null);
    const [pill, setPill] = useState(null);
    const targetId = hoverId || activeId;

    const measure = useCallback(() => {
        const li = targetId && listRef.current?.querySelector(`[data-id="${targetId}"]`);
        setPill(li ? { left: li.offsetLeft, width: li.offsetWidth } : null);
    }, [targetId]);

    useIsoLayoutEffect(measure, [measure]);
    useEffect(() => {
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    return (
        <div className="navlinksWrap m-auto" ref={listRef} onMouseLeave={() => setHoverId(null)}>
            <span
                className={`navPill ${pill ? 'show' : ''}`}
                aria-hidden="true"
                style={pill ? { transform: `translateX(${pill.left}px)`, width: pill.width } : undefined}
            />
            <ul className="navlinks">
                {navLinks.map(({ href, label }) => {
                    const id = sectionId(href);
                    return (
                        <li
                            key={href}
                            data-id={id}
                            className={`list-item text-capitalize ${id === targetId ? 'active' : ''}`}
                            onMouseEnter={() => setHoverId(id)}
                        >
                            <Link href={href} aria-current={id === activeId ? 'location' : undefined}>{label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

/** Full-screen overlay menu for small screens. */
const MobileMenu = ({ open, onClose, activeId }) => {
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <div className={`mobileMenu ${open ? 'open' : ''}`} id="mobile-menu" aria-hidden={!open} onClick={onClose}>
            <ul className="mobileLinks">
                {navLinks.map(({ href, label }, i) => (
                    <li key={href} style={{ '--i': i }} className={sectionId(href) === activeId ? 'active' : ''}>
                        <Link href={href} onClick={onClose} tabIndex={open ? 0 : -1}>
                            <span className="num">{String(i + 1).padStart(2, '0')}</span>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrolled, hidden, activeId } = useNavScroll();
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const navClass = ['navbar', scrolled && 'scrolled', hidden && !menuOpen && 'navHidden', menuOpen && 'menuOpen']
        .filter(Boolean)
        .join(' ');

    return (
        <nav className={navClass}>
            <div className="container">
                <Link href="/" aria-label="Home">
                    <div className="main-icon">
                        <Image src="/images/main-icon.webp" width={30} height={30} title="Ajay Choudhary" alt="Ajay Choudhary" />
                    </div>
                </Link>

                <DesktopLinks activeId={activeId} />

                <div className="theme-btns">
                    <ThemePicker />
                </div>

                <div className="nav-toggler">
                    <button
                        type="button"
                        className={`menuToggle ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* outside .container: its transform would make this fixed overlay position relative to the bar */}
            <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
        </nav>
    );
};

export default Navbar;
