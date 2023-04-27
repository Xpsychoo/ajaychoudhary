import React from 'react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counterSlice'
import HomeHead from './HomeHead'
import WhatIDo from './WhatIDo'
import MySkills from './MySkills'
import MyProjects from './MyProjects'

const HomeScreen = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <>
            <Navbar />
            <div className="header_sec">
                <HomeHead />
            </div>
            <div className="homeSecHead">
                <WhatIDo />
            </div>
            <div className="homeSecHead">
                <MySkills />
            </div>
            <div className="homeSecHead">
                <MyProjects />
            </div>
        </>
    )
}

export default HomeScreen