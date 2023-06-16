import React, { useEffect, useState } from 'react';
import DotsShape from '../Svg/DotsShape'
import Link from 'next/link'
const HomeHead = () => {
    
    const words = ['Web Developer', 'Web Designer', 'Software Developer'];
    const [part, setPart] = useState('');
    const [i, setI] = useState(0);
    const [offset, setOffset] = useState(0);
    const [forwards, setForwards] = useState(true);
    const speed = 130;
    
    useEffect(() => {
      const interval = setInterval(() => {
        if (forwards) {
          if (offset >= words[i].length) {
            setForwards(false);
            setI((i + 1) % words.length);
            setOffset(0);
          }
        } else {
          if (offset === 0) {
            setForwards(true);
            setI((i + 1) % words.length);
          }
        }
        const newPart = words[i].substr(0, offset);
        setOffset((offset + (forwards ? 1 : -1)) % (words[i].length + 1));
        setPart(newPart);
      }, speed);
    
      return () => clearInterval(interval);
    }, [forwards, i, offset, words]);
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
                            <div className="word"> i am <span className="text-green">{part}</span> </div>
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
                                <Link href='#contactme'><button className="common-btn">Connect Now</button></Link>
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