import React from 'react'
import DotsShape from '../Svg/DotsShape'
import { toast } from 'react-hot-toast'

const HomeHead = () => {
    function downLoadCv() {
        toast('For networking opportunities, feel free to connect with me on LinkedIn. You can find the link at the bottom-left of the page!', {
            icon: '😊',
        });
    }
    return (
        <>
            <div className="container" id='home'>

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
                                Experienced  <span className="text-green">  Web Developer </span> and <span className="text-green">Web Designer </span>
                                adept at building
                                scalable software systems for diverse user bases.
                                Committed to solving problems and delivering optimal, cost-effective solutions for clients.
                            </p>
                        </div>

                        <div className="btn-sec">
                            <div className="cv-btn ">
                                <button onClick={() => downLoadCv()} className="common-btn">Connect Now</button>
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