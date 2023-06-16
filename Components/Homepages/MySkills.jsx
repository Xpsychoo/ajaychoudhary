import { useState, useEffect } from 'react';
import { BaseUrl } from '@/utils/constants';
import axios from 'axios'
import React from 'react'
import Slider from 'react-slick';
import Form from 'react-bootstrap/Form';
import DotsShape from '../Svg/DotsShape';

export default function MySkills() {
    const [skillsdata, setSkillsdata] = useState([]);

    async function getSkillsdata() {
        try {
            const response = await axios.get(BaseUrl + '/api/skills')
            setSkillsdata(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows : false,
                }
            }
        ]
    };


    useEffect(() => {
        getSkillsdata();
    }, [])


    return (
        <div className="container">
            <div className="main-head">
                <h3 className="head text-center">  <span className="text-green">Professional</span> Expertise</h3>
                <h5 className="sub_head text-center"> My <span className="text-green text-cursive">Skills</span> </h5>
            </div>
            <div className="SkillsSec">
                <Slider {...settings}>
                    {skillsdata?.map(({ head, description, percentage }, i) => {
                        return <div key={i} className="skillsCard">
                            <div className="header">
                                <div className="name">
                                    {head}
                                </div>
                                <div className="perCentage">
                                    {percentage}
                                </div>
                            </div>
                            <div className="percentRange">
                                <div className="percentageBar"></div>
                                <span className="activebar" style={{ width: percentage }}></span>
                                <span className="activeDot"></span>
                            </div>
                            <div className="description">
                                {description.substring(0, 360) + '...'}
                            </div>
                            <div className="card-footer">
                                <div className="addMoreBtn">View More</div>
                                <div className="bgWalls">
                                    <DotsShape />
                                </div>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
        </div>
    )
}
