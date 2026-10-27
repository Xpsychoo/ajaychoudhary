import { createSlice } from '@reduxjs/toolkit';

/** Values double as CSS class names on `.main-wrapper`. */
export const THEMES = {
    light: 'light',
    dark: 'dark',
    gradient: 'gradient',
    gradientImage: 'gradient image',
};

export const themeSlice = createSlice({
    name: 'themeMode',
    initialState: { value: THEMES.gradient },
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
    },
});

export const { nightMode, lightMode, gradient, gimage } = themeSlice.actions;

export default themeSlice.reducer;
