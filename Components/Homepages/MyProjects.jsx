import { useState, useEffect } from 'react';
import { BaseUrl } from '@/utils/constants';
import axios from 'axios'
import React from 'react'
import Slider from 'react-slick';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';

export default function MyProjects() {
    const [skillsdata, setSkillsdata] = useState([])
    async function getSkillsdata() {
        try {
            const response = await axios.get(BaseUrl + '/api/projects')
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
        slidesToShow: 2,
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
                initialSlide: 2,
                dots: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
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
                <h3 className="head text-center">  <span className="text-green">MY</span> Projects</h3>
                <h5 className="sub_head text-center"> Projects <span className="text-green text-cursive">I&apos;ve Worked on</span> </h5>
            </div>
            <div className="SkillsSec">
                <Slider {...settings}>
                    {skillsdata?.map(({ name, description, link }, i) => {
                        return <div key={i} className="skillsCard">
                            <div className="header">
                                <div className="name">
                                    {name}
                                </div>

                            </div>
                            <div className="percentRange">
                                <div className="percentageBar"></div>
                                <span className="activeDot"></span>
                            </div>
                            <div className="description">
                                {description.substring(0, 500) + '...'}
                            </div>
                            <div className="card-footer">
                                <Link target='_blank' href={link}>View Project</Link>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
        </div>
    )
}
