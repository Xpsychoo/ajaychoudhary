import React from 'react';
import { getServices } from '@/data/services';
import { careerYears } from '@/data/experience';
import { useNow } from '@/utils/experience';

const WhatIDo = () => {
    const services = useNow((now) => getServices(careerYears(now)));

    return (
        <div className="container">
            <div className="main-head">
                <h3 className="head text-center">
                    <span className="text-green">What</span> I do
                </h3>
                <h5 className="sub_head text-center">
                    My <span className="text-green text-cursive">Services</span>
                </h5>
            </div>
            <div className="ServicesCards">
                <div className="row g-4">
                    {services.map(({ Icon, ...service }) => (
                        <div key={service.topHead} className="col-xl-4 col-md-4 col-sm-12 col-12">
                            <div className="serviceCard">
                                <span className="cardIcon"><Icon aria-hidden="true" /></span>
                                <div className="topHead">{service.topHead}</div>
                                <div className="secHead">{service.secHead}</div>
                                <div className="desc">{service.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatIDo;
