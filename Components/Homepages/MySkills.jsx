import React from 'react';
import Slider from 'react-slick';
import DotsShape from '../Svg/DotsShape';
import { skills } from '@/data/skills';

const sliderSettings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
};

export default function MySkills() {
    return (
        <div className="container">
            <div className="main-head">
                <h3 className="head text-center"><span className="text-green">Professional</span> Expertise</h3>
                <h5 className="sub_head text-center">My <span className="text-green text-cursive">Skills</span></h5>
            </div>
            <div className="SkillsSec">
                <Slider {...sliderSettings}>
                    {skills.map(({ head, description }) => (
                        <div key={head} className="skillsCard">
                            <div className="header">
                                <div className="name">{head}</div>
                            </div>
                            <div className="percentRange">
                                <div className="percentageBar" />
                                <span className="activeDot" />
                            </div>
                            <div className="description">{description}</div>
                            <div className="card-footer">
                                <div className="bgWalls">
                                    <DotsShape />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
