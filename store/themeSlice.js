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
            toast.success('Dark Mode Enabled')
        },
        lightMode: (state) => {
            state.value = 'light'
            toast.success('Light Mode Enabled')
        },
        gradient: (state) => {
            state.value = 'gradient'
            toast.success('Gradient Mode Enabled')
        },
        gimage: (state) => {
            state.value = 'gradient image'
            toast.success('Gradient image Mode Enabled')
        },
    },
})

export const { nightMode, lightMode, gradient, gimage} = themeSlice.actions

export default themeSlice.reducer