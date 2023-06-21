import React, { useEffect, useState } from 'react'
import Navbar from './NavbarScreen/Navbar'
import HomeHead from './HomeHeads/HomeHead'
import WhatIDo from './WhatIDo'
import MySkills from './MySkills'
import MyProjects from './MyProjects'
import ContactUs from './ContactUs'
import ScrolltoTop from './ScrolltoTop'

const HomeScreen = () => {

    return (
        <>
            <Navbar />
            <div className="header_sec jumpMenu" id='home'>
                <HomeHead />
            </div>
            <div className="homeSecHead jumpMenu" id='whatido'>
                <WhatIDo />
            </div>
            <div className="homeSecHead jumpMenu" id='skills'>
                <MySkills />
            </div>
            <div className="homeSecHead jumpMenu" id='projects'>
                <MyProjects />
            </div>
            <div className="homeSecHead jumpMenu pb-0" id='contact'>
                <ContactUs />
            </div>
           <ScrolltoTop />
        </>
    )
}

export default HomeScreen