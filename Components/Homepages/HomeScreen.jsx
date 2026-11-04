import React from 'react';
import Navbar from './NavbarScreen/Navbar';
import HomeHead from './HomeHeads/HomeHead';
import WhatIDo from './WhatIDo';
import Experience from './Experience';
import MySkills from './MySkills';
import MyProjects from './MyProjects';
import ContactUs from './ContactUs';
import { useScrollEffects } from '@/utils/scrollEffects';

const HomeScreen = () => {
    useScrollEffects();

    return (
        <>
            <div className="scrollProgress" aria-hidden="true" />
            <Navbar />
            <main>
                <section className="header_sec jumpMenu" id="home">
                    <HomeHead />
                </section>
                <section className="homeSecHead jumpMenu" id="whatido">
                    <WhatIDo />
                </section>
                <section className="homeSecHead jumpMenu" id="experience">
                    <Experience />
                </section>
                <section className="homeSecHead jumpMenu" id="skills">
                    <MySkills />
                </section>
                <section className="homeSecHead jumpMenu" id="projects">
                    <MyProjects />
                </section>
                <section className="homeSecHead jumpMenu" id="contact">
                    <ContactUs />
                </section>
            </main>
        </>
    );
};

export default HomeScreen;
