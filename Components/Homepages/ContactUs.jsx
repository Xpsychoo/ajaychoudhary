import React, { useState } from 'react'
import SendIcon from '../Svg/SendIcon'
import { toast } from 'react-hot-toast'

export default function ContactUs() {

    const [contactValue, setContactValue] = useState({})

    function submitHandler(e) {
        e.preventDefault();
        toast.error('Send Message is not available!')
    }

    return (
        <div className="container">
            <div className="main-head">
                <h3 className="head text-center">
                    <span className="text-green"> - LET'S </span> CONNECT
                </h3>
                <h5 className="sub_head text-center"> Get
                    <span className="text-green text-cursive"> in touch</span>
                </h5>
            </div>
            <div className="ContactUs">
                <div className="row">
                    <div className="row">
                        <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                            <div className="getintouch">
                                <div className="head">
                                    I'm currently avaliable to take on new projects, so feel free to send me a message about
                                    anything that you want to run past me. You can contact anytime at 24/7
                                </div>
                                <form className="contact-form" onSubmit={(e) => submitHandler(e)}>
                                    <div className="row">
                                        <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-box">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={contactValue.name ? contactValue.name : ''}
                                                    id="name" className="form-control"
                                                    onChange={(e) => setContactValue({ ...contactValue, name: e.target.value })}
                                                />
                                                <label htmlFor="name" className={`form-label ${contactValue.name ? 'notEmpty' : ''}`}>
                                                    Name
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-box">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={contactValue.email ? contactValue.email : ''}
                                                    id="email" className="form-control"
                                                    onChange={(e) => setContactValue({ ...contactValue, email: e.target.value })}
                                                />
                                                <label htmlFor="email" className={`form-label ${contactValue.email ? 'notEmpty' : ''}`}> Email  </label>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-box">
                                                <textarea
                                                    className='form-control'
                                                    name="message" id="message"
                                                    value={contactValue.message ? contactValue.message : ''}
                                                    onChange={(e) => setContactValue({ ...contactValue, message: e.target.value })}
                                                    rows="3">
                                                </textarea>
                                                <label htmlFor="email" className={`form-label ${contactValue.message ? 'notEmpty' : ''}`}> Message  </label>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-send-btn">
                                                <button type='submit' className=" btn button">
                                                    Send
                                                    <div className="svgIcon">
                                                        <SendIcon />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                            <div className="mapWrapper">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.50123665962!2d77.23701437997667!3d28.522102351088325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1682659568283!5m2!1sen!2sin"
                                    width='100%'
                                    height={300}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
