import React from 'react'

const WhatIDo = () => {
    return (
        <>
            <div className="container">
                <div className="main-head">
                    <h3 className="head text-center">  <span className="text-green">What</span> I do</h3>
                    <h5 className="sub_head text-center"> My <span className="text-green text-cursive">Services</span> </h5>
                </div>
                <div className="ServicesCards">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 col-sm-12 col-12">
                            <div className="serviceCard">
                                <div className="topHead">Web Development</div>
                                <div className="secHead">Web & software Development</div>
                                <div className="desc">
                                    As a software developer with 1.6 years of experience, I have honed my skills in technologies such as ReactJS,
                                    NextJS, and JavaScript. I am a detail-oriented and driven individual who is passionate about
                                    creating high-quality software solutions.
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-12 col-12">
                            <div className="serviceCard">
                                <div className="topHead">Web Design</div>
                                <div className="secHead">Web Designing</div>
                                <div className="desc">
                                    With my expertise, I have successfully designed and developed websites
                                    that not only look great but also function seamlessly on
                                    different devices and platforms  I am adept at using software such as
                                    Adobe photoshop, Adobe XD, and Figma, and am always
                                    up-to-date with the latest design trends and technologies
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-12 col-12">
                            <div className="serviceCard">
                                <div className="topHead">Mobile Apps</div>
                                <div className="secHead">Mobile App Development</div>
                                <div className="desc">
                                    As a self-motivated individual with a passion for mobile app development, I have taken it upon myself to
                                    learn the necessary skills to create cutting-edge mobile applications. If given the opportunity,
                                    I am eager to apply my skills and knowledge to develop
                                    innovative mobile applications.

                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhatIDo