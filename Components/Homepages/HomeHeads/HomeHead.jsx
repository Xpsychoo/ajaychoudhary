import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DotsShape from '../../Svg/DotsShape';
import { careerMonths, experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { useNow } from '@/utils/experience';
import { CountUp } from '@/utils/scrollEffects';

const WORDS = ['Frontend Developer', 'App Developer', 'React.js Developer', 'Web Designer'];
const TYPING_SPEED = 130;

/** Types each word out, then deletes it, then moves on to the next one. */
const useTypewriter = (words, speed) => {
    const [state, setState] = useState({ index: 0, length: 0, deleting: false });

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(({ index, length, deleting }) => {
                const word = words[index];
                if (!deleting && length === word.length) return { index, length, deleting: true };
                if (deleting && length === 0) return { index: (index + 1) % words.length, length: 0, deleting: false };
                return { index, length: length + (deleting ? -1 : 1), deleting };
            });
        }, speed);
        return () => clearTimeout(timer);
    }, [state, words, speed]);

    return words[state.index].slice(0, state.length);
};

const HomeHead = () => {
    const typed = useTypewriter(WORDS, TYPING_SPEED);
    const months = useNow(careerMonths);
    const years = Math.floor(months / 12);

    return (
        <div className="container">
            <span className="dots-shapes top">
                <DotsShape />
            </span>

            <div className="row">
                <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                    <div className="name-box">
                        <div className="hello-text" data-reveal="up">
                            <h5 className="hello">Hello My Name is</h5>
                        </div>
                        <div className="big-text" data-reveal="up" style={{ '--reveal-delay': '120ms' }}>
                            <h1 className="name text-green">Ajay Kumar</h1>
                        </div>
                        <div className="info-text" data-reveal="up" style={{ '--reveal-delay': '240ms' }}>
                            <div className="word">I am a <span className="text-green">{typed}_</span></div>
                        </div>
                    </div>
                    <div className="intro-text" data-reveal="up" style={{ '--reveal-delay': '360ms' }}>
                        <div className="intro">
                            Based in <span className="text-green">NOIDA</span>, India. <br />
                            <h2 className="text-green headTag">Frontend &amp; App Developer</h2>
                            with <strong className="text-green">{years}+ years</strong> of experience building
                            scalable, high-performance web applications with React.js, Next.js and JavaScript.
                            Currently an App Developer at <strong>TELUS Digital</strong>, focused on clean code,
                            great user experience and cost-effective solutions.
                        </div>
                    </div>

                    <div className="hero-stats" data-reveal="up" style={{ '--reveal-delay': '480ms' }}>
                        <div className="stat">
                            <span className="value text-green"><CountUp value={years} />+</span>
                            <span className="label">Years Experience</span>
                        </div>
                        <div className="stat">
                            <span className="value text-green"><CountUp value={experience.length} /></span>
                            <span className="label">Companies</span>
                        </div>
                        <div className="stat">
                            <span className="value text-green"><CountUp value={projects.length} />+</span>
                            <span className="label">Projects</span>
                        </div>
                    </div>

                    <div className="btn-sec" data-reveal="up" style={{ '--reveal-delay': '600ms' }}>
                        <div className="cv-btn">
                            <Link href="#contact" className="common-btn">Connect Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                    <div className="img-sec" data-reveal="zoom" style={{ '--reveal-delay': '200ms' }}>
                        <div className="img-wrapper">
                            <span className="img-glow" aria-hidden="true" />
                            <Image src="/images/portfolio-portrait.webp" alt="Ajay Choudhary" title="Ajay Choudhary" width={600} height={600} priority />
                        </div>
                    </div>
                </div>
            </div>

            <span className="dots-shapes bottom">
                <DotsShape />
            </span>
        </div>
    );
};

export default HomeHead;
