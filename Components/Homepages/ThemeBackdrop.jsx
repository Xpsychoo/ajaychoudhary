import React, { useEffect, useRef } from 'react';
import { THEMES } from '@/store/themeSlice';
import StarryNight from './StarryNight';

// Deterministic "random" so server and client render the same particles.
const seeded = (i, salt) => {
    const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
};

const particles = (count, { size: [minSize, maxSize], duration: [minDur, maxDur] }) =>
    Array.from({ length: count }, (_, i) => ({
        '--x': `${(seeded(i, 1) * 100).toFixed(2)}%`,
        '--size': `${(minSize + seeded(i, 2) * (maxSize - minSize)).toFixed(1)}px`,
        '--dur': `${(minDur + seeded(i, 3) * (maxDur - minDur)).toFixed(1)}s`,
        '--delay': `${(-seeded(i, 4) * maxDur).toFixed(1)}s`, // negative: already mid-flight on load
        '--sway': `${((seeded(i, 5) - 0.5) * 120).toFixed(0)}px`,
    }));

const MOTES = particles(22, { size: [3, 9], duration: [14, 28] });
const BUBBLES = particles(18, { size: [10, 46], duration: [12, 24] });

/** Light: warm sun glow with slowly turning rays, a faint dot grid and floating dust motes. */
const Daylight = () => (
    <div className="themeScene daylight" aria-hidden="true">
        <div className="dotGrid" />
        <div className="sun"><span className="rays" /></div>
        {MOTES.map((style, i) => <span key={i} className="mote" style={style} />)}
    </div>
);

/** Gradient: a slowly moving colour mesh, one blob trailing the cursor, plus film grain. */
const Mesh = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (!window.matchMedia('(hover: hover)').matches) return undefined;
        const onMove = (e) => {
            ref.current?.style.setProperty('--px', `${e.clientX}px`);
            ref.current?.style.setProperty('--py', `${e.clientY}px`);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    return (
        <div className="themeScene mesh" ref={ref} aria-hidden="true">
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="blob b3" />
            <span className="blob b4" />
            <span className="blob b5" />
            <span className="blob follow" />
            <div className="grain" />
        </div>
    );
};

/** Gradient image: glass bubbles rising over the liquid-blob photo, with two morphing blobs. */
const Ocean = () => (
    <div className="themeScene ocean" aria-hidden="true">
        <span className="liquid l1" />
        <span className="liquid l2" />
        {BUBBLES.map((style, i) => <span key={i} className="bubble" style={style} />)}
    </div>
);

const SCENES = {
    [THEMES.dark]: StarryNight,
    [THEMES.light]: Daylight,
    [THEMES.gradient]: Mesh,
    [THEMES.gradientImage]: Ocean,
};

/** The animated background behind the page for the current theme. */
const ThemeBackdrop = ({ theme }) => {
    const Scene = SCENES[theme];
    return Scene ? <Scene /> : null;
};

export default ThemeBackdrop;
