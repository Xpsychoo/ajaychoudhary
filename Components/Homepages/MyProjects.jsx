import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { BaseUrl } from '@/utils/constants';
import Link from 'next/link';

const MyProjects = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    const getSkillsData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/projects`);
        setSkillsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSkillsData();
  }, []);

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
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
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
        <Slider {...settings}>
          {skillsData.map(({ name, description, link }, i) => (
            <div key={i} className="skillsCard">
              <div className="header">
                <div className="name">{name}</div>
              </div>
              <div className="percentRange">
                <div className="percentageBar" />
                <span className="activeDot" />
              </div>
              <div className="description">{`${description.substring(0, 500)}...`}</div>
              <div className="card-footer">
                <Link target="_blank" href={link}>
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MyProjects;
