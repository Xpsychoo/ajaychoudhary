import { BaseUrl } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WhatIDo = () => {

    const [servicesList, setServicesList] = useState([])

    async function getServicesList() {
        try {
            const response = await axios.get(BaseUrl + '/api/services')
            setServicesList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getServicesList();
    }, [])


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
                <div className="row">
                    {servicesList?.map((service, index) => (
                        <div key={index} className="col-xl-4 col-md-4 col-sm-12 col-12">
                            <div className="serviceCard">
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
