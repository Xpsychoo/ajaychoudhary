import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon, Paintbrush, Image as ImageIcon, Check } from 'lucide-react';
import { nightMode, lightMode, gradient, gimage, THEMES } from '@/store/themeSlice';

const themeOptions = [
    { theme: THEMES.light, action: lightMode, title: 'Light', hint: 'Sunny & clean', Icon: Sun, swatch: 'light' },
    { theme: THEMES.dark, action: nightMode, title: 'Night', hint: 'Starry sky', Icon: Moon, swatch: 'dark' },
    { theme: THEMES.gradient, action: gradient, title: 'Gradient', hint: 'Living colours', Icon: Paintbrush, swatch: 'gradient' },
    { theme: THEMES.gradientImage, action: gimage, title: 'Ocean', hint: 'Floating bubbles', Icon: ImageIcon, swatch: 'image' },
];

/**
 * Switches theme with a circle that grows out of the clicked tile, using the
 * View Transitions API where the browser has it (plain switch otherwise).
 */
const switchTheme = (apply, x, y) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
        apply();
        return;
    }

    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready.then(() => {
        document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        );
    });
};

const ThemePicker = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const theme = useSelector((state) => state.themeMode.value);
    const dispatch = useDispatch();
    const current = themeOptions.find((option) => option.theme === theme) || themeOptions[0];

    // close on outside click / Escape
    useEffect(() => {
        if (!open) return undefined;
        const onPointer = (e) => !ref.current.contains(e.target) && setOpen(false);
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const choose = (option, e) => {
        setOpen(false);
        if (option.theme === theme) return;
        const rect = e.currentTarget.getBoundingClientRect();
        switchTheme(() => dispatch(option.action()), rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    return (
        <div className="themePicker" ref={ref}>
            <button
                type="button"
                className={`themeTrigger ${open ? 'open' : ''}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={`Theme: ${current.title}. Change theme`}
                aria-expanded={open}
                aria-haspopup="true"
                title="Change theme"
            >
                {/* key re-mounts the icon so it spins in on every theme change */}
                <current.Icon key={current.theme} aria-hidden="true" />
            </button>

            <div className={`themePanel ${open ? 'open' : ''}`} role="menu" aria-hidden={!open}>
                <div className="panelHead">Appearance</div>
                <div className="themeGrid">
                    {themeOptions.map((option, i) => {
                        const active = option.theme === theme;
                        return (
                            <button
                                type="button"
                                role="menuitemradio"
                                aria-checked={active}
                                tabIndex={open ? 0 : -1}
                                key={option.theme}
                                className={`themeTile ${active ? 'active' : ''}`}
                                style={{ '--i': i }}
                                onClick={(e) => choose(option, e)}
                            >
                                <span className={`swatch ${option.swatch}`}>
                                    <option.Icon aria-hidden="true" />
                                    {active && <span className="check"><Check aria-hidden="true" /></span>}
                                </span>
                                <span className="tileTitle">{option.title}</span>
                                <span className="tileHint">{option.hint}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemePicker;
