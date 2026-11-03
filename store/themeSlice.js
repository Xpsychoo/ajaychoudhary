import { createSlice } from '@reduxjs/toolkit';

/** Values double as CSS class names on `.main-wrapper`. */
export const THEMES = {
    light: 'light',
    dark: 'dark',
    gradient: 'gradient',
    gradientImage: 'gradient image',
};

export const DEFAULT_THEME = THEMES.dark;

/** localStorage key for the visitor's chosen theme (also read by the inline script in _document.js). */
export const THEME_STORAGE_KEY = 'theme';

export const isTheme = (value) => Object.values(THEMES).includes(value);

export const themeSlice = createSlice({
    name: 'themeMode',
    initialState: { value: DEFAULT_THEME },
    reducers: {
        nightMode: (state) => {
            state.value = THEMES.dark;
        },
        lightMode: (state) => {
            state.value = THEMES.light;
        },
        gradient: (state) => {
            state.value = THEMES.gradient;
        },
        gimage: (state) => {
            state.value = THEMES.gradientImage;
        },
        // used to restore a saved theme on load
        setTheme: (state, { payload }) => {
            if (isTheme(payload)) state.value = payload;
        },
    },
});

export const { nightMode, lightMode, gradient, gimage, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
