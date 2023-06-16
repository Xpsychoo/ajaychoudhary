import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = {
    value: 'gradient',
}

export const themeSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        nightMode: (state) => {
            state.value = 'dark'
        },
        lightMode: (state) => {
            state.value = 'light'
        },
        gradient: (state) => {
            state.value = 'gradient'
        },
        gimage: (state) => {
            state.value = 'gradient image'
        },
    },
})

export const { nightMode, lightMode, gradient, gimage} = themeSlice.actions

export default themeSlice.reducer