import { useEffect, useRef, useState } from 'react';

const TILT_SELECTOR = '.serviceCard, .experienceCard, .skillsCard';
const MAX_TILT = 6; // degrees

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `is-visible` to every `[data-reveal]` element the first time it scrolls into view. */
const observeReveals = () => {
    const items = document.querySelectorAll('[data-reveal]');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (!isIntersecting) return;
            target.classList.add('is-visible');
            observer.unobserve(target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
};

/**
 * Drives everything tied to scroll position through CSS variables:
 * the top progress bar, hero parallax and the experience timeline "drawing" itself.
 * (Highlighting the current section's nav link lives in Navbar.)
 */
const trackScroll = () => {
    const root = document.documentElement;
    const timeline = document.querySelector('.ExperienceTimeline');
    let frame = 0;

    const update = () => {
        frame = 0;
        const { scrollY, innerHeight } = window;
        const scrollable = root.scrollHeight - innerHeight;
        root.style.setProperty('--scroll-progress', scrollable > 0 ? (scrollY / scrollable).toFixed(4) : 0);
        root.style.setProperty('--scroll-y', Math.min(scrollY, innerHeight * 1.5).toFixed(0));

        if (timeline) {
            const rect = timeline.getBoundingClientRect();
            const progress = (innerHeight * 0.7 - rect.top) / rect.height;
            timeline.style.setProperty('--line-progress', Math.min(1, Math.max(0, progress)).toFixed(4));
        }
    };

    const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
    };
};

/**
 * 3D tilt + a spotlight that follows the cursor on cards. Delegated from the document,
 * so it also covers the slides react-slick clones after mount.
 */
const tiltCards = () => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return () => {};

    const onMove = (e) => {
        const card = e.target.closest?.(TILT_SELECTOR);
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        card.style.setProperty('--ry', `${((x - 0.5) * MAX_TILT * 2).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${((0.5 - y) * MAX_TILT * 2).toFixed(2)}deg`);
    };

    const onOut = (e) => {
        const card = e.target.closest?.(TILT_SELECTOR);
        if (!card || card.contains(e.relatedTarget)) return;
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut);
    return () => {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerout', onOut);
    };
};

/** Wires up all homepage scroll / pointer effects. Call once, after the sections render. */
export const useScrollEffects = () => {
    useEffect(() => {
        const cleanups = [observeReveals(), trackScroll(), tiltCards()];
        return () => cleanups.forEach((cleanup) => cleanup());
    }, []);
};

/** Counts from 0 up to `value` (eased) the first time the number scrolls into view. */
export const CountUp = ({ value, duration = 1400 }) => {
    const ref = useRef(null);
    // Server render shows the real value, so search engines and no-JS visitors see it.
    const [shown, setShown] = useState(value);

    useEffect(() => {
        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            setShown(value);
            return undefined;
        }

        let frame = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min(1, (now - start) / duration);
                setShown(Math.round(value * (1 - (1 - p) ** 3)));
                if (p < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        });
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value, duration]);

    return <span ref={ref}>{shown}</span>;
};
