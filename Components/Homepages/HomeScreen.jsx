import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import HomeHead from './HomeHead'
import WhatIDo from './WhatIDo'
import MySkills from './MySkills'
import MyProjects from './MyProjects'
import ContactUs from './ContactUs'
import { useInView } from 'react-intersection-observer';

const HomeScreen = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    /*  const sections = document.querySelectorAll('.homeSecHead');
     window.addEventListener('scroll', fadeIn); */

    function animationFunc() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            if (sectionTop < window.innerHeight && sectionBottom > 0) {
                section.style.opacity = 1;
            }
        });
    }

    useEffect(() => {
    }, [])

    const [ref, inView] = useInView({
        threshold: 0.1, 
        triggerOnce: true 
    });

    return (
        <>
            <Navbar />
            <div className="header_sec" id='home'>
                <HomeHead />
            </div>
            <div className={`homeSecHead ${inView ? 'inView' : ''}`} ref={ref} id='whatido'>
                <WhatIDo />
            </div>
            <div className={`homeSecHead`} id='skills'>
                <MySkills />
            </div>
            <div className={`homeSecHead`} id='projects'>
                <MyProjects />
            </div>
            <div className={`homeSecHead`} style={{paddingBottom: '0px'}} id='contactme'>
                <ContactUs />
            </div>
        </>
    )
}

export default HomeScreen