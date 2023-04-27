import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/counterSlice'
import themeReducer from '../store/themeSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        themeMode: themeReducer,
    },
    
})