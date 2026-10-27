import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { projects } from '@/data/projects';

const sliderSettings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 700, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
};

const MyProjects = () => (
    <div className="container">
        <div className="main-head">
            <h3 className="head text-center">
                <span className="text-green">MY</span> Projects
            </h3>
            <h5 className="sub_head text-center">
                Projects <span className="text-green text-cursive">I&apos;ve Worked on</span>
            </h5>
        </div>
        <div className="SkillsSec">
            <Slider {...sliderSettings}>
                {projects.map(({ name, category, description, link, tech }) => (
                    <div key={name} className="skillsCard projectCard">
                        <div className="header">
                            <div className="name">{name}</div>
                        </div>
                        <div className="category">{category}</div>
                        <div className="percentRange">
                            <div className="percentageBar" />
                            <span className="activeDot" />
                        </div>
                        <div className="description">{description}</div>
                        <ul className="tags">
                            {tech.map((t) => (
                                <li key={t} className="tag">{t}</li>
                            ))}
                        </ul>
                        <div className="card-footer">
                            <Link href={link} target="_blank" rel="noopener noreferrer">
                                View Project
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
);

export default MyProjects;
