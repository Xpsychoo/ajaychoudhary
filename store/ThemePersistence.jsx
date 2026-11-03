import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, THEME_STORAGE_KEY } from './themeSlice';

/**
 * Restores the visitor's saved theme after hydration and saves every change.
 * (The server always renders the default theme; _document.js hides the page
 * for that first moment when a different theme is saved, so it doesn't flash.)
 */
const ThemePersistence = () => {
    const theme = useSelector((state) => state.themeMode.value);
    const dispatch = useDispatch();
    const [restored, setRestored] = useState(false);

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
            if (saved) dispatch(setTheme(saved));
        } catch {
            // storage blocked (private mode etc.): just keep the default
        }
        setRestored(true);
    }, [dispatch]);

    useEffect(() => {
        // skip the first render, or the default would overwrite the saved theme
        if (!restored) return;
        document.documentElement.classList.remove('theme-pending');
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            // ignore
        }
    }, [theme, restored]);

    return null;
};

export default ThemePersistence;
