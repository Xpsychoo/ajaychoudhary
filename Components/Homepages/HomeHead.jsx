import React from 'react'
import DotsShape from '../Svg/DotsShape'

const HomeHead = () => {
    return (
        <>
            <div className="container">

                <span className="dots-shapes top">
                    <DotsShape />
                </span>

                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                        <div className="name-box">
                            <div className="hello-text">
                                <h5 className="hello">Hello My Name is</h5>
                            </div>
                            <div className="big-text">
                                <h1 className="name"><span className="text-green">Ajay Kumar</span> </h1>
                            </div>

                            <div className="info-text">
                                <h4 className="info">i am <span className="big">Web <span className="text-green"> & </span> Software <span className="text-green"> DEVELOPER</span> </span></h4>
                            </div>
                        </div>
                        <div className="intro-text">
                            <p className="intro">
                                Currently Living in <span className="text-green"> NOIDA</span>, India. <br />
                                I have rich experience in <span className="text-green"> Web Design</span>  & Development...
                            </p>
                        </div>

                        <div className="btn-sec">
                            <div className="cv-btn ">
                                <button className="common-btn">Download CV</button>
                            </div>
                        </div>



                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                        <div className="img-sec">
                            <div className="img-wrapper">
                                <img src="/images/profile.jpg" alt="Logo img" />
                            </div>
                        </div>
                    </div>
                </div>

                <span className="dots-shapes bottom">
                    <DotsShape />
                </span>
            </div>
        </>
    )
}

export default HomeHead