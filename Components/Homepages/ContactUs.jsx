import React, { useRef, useState } from 'react'
import SendIcon from '../Svg/SendIcon'
import { toast } from 'react-hot-toast'
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ContactUs() {

    const form = useRef();
    const [contactValue, setContactValue] = useState({})
    const [show, setShow] = useState(false);
    const [errordata, setErrordata] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function submitHandler(e) {
        e.preventDefault();
        const errors = {};
        const requiredFields = {
            subject: 'Please Enter Message Subject',
            name: 'Please Enter Your Name',
            email: 'Please Enter Your email',
            message: 'Please Enter Your Message'
        };
        Object.entries(requiredFields).forEach(([key, value]) => {
            if (!contactValue[key]) {
                errors[key] = value;
            }
        });
        setErrordata({ ...errors });
        if (Object.keys(errors).length === 0) {
            emailjs.sendForm('service_bz1sjhs', 'template_5opo4b5', form.current, 'SzW6c8-46F6f0Buff')
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Mail sent Successfully');
                        handleShow();
                        setContactValue({});
                    }
                    console.log(result);
                }, (error) => {
                    console.log(error.text);
                });
        }

    }

    return (
        <>
            <div className="container" id='contactme'>
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
                                    <form className="contact-form" ref={form} onSubmit={(e) => submitHandler(e)}>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                                <div className={`form-box ${errordata.subject ? 'error' : ''}`}>
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        value={contactValue.subject ? contactValue.subject : ''}
                                                        id="name" className="form-control"
                                                        onChange={(e) => {
                                                            setContactValue({ ...contactValue, subject: e.target.value })
                                                            setErrordata({ ...errordata, subject: '' })
                                                        }}
                                                    />
                                                    <label htmlFor="name" className={`form-label ${contactValue.subject ? 'notEmpty' : ''}`}>
                                                        subject
                                                    </label>
                                                    <span className="errortext"> {errordata.subject ? errordata.subject : ''} </span>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                                                <div className={`form-box ${errordata.name ? 'error' : ''}`}>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={contactValue.name ? contactValue.name : ''}
                                                        id="name" className="form-control"
                                                        onChange={(e) =>{
                                                             setContactValue({ ...contactValue, name: e.target.value })
                                                             setErrordata({ ...errordata, name: '' })
                                                            }}
                                                    />
                                                    <label htmlFor="name" className={`form-label ${contactValue.name ? 'notEmpty' : ''}`}>
                                                        Name
                                                    </label>
                                                    <span className="errortext"> {errordata.name ? errordata.name : ''} </span>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                                                <div className={`form-box ${errordata.email ? 'error' : ''}`}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={contactValue.email ? contactValue.email : ''}
                                                        id="email" className="form-control"
                                                        onChange={(e) =>{ 
                                                            setContactValue({ ...contactValue, email: e.target.value })
                                                            setErrordata({ ...errordata, email: '' })
                                                        }}
                                                    />
                                                    <label htmlFor="email" className={`form-label ${contactValue.email ? 'notEmpty' : ''}`}> Email  </label>
                                                    <span className="errortext"> {errordata.email ? errordata.email : ''} </span>

                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                                <div className={`form-box ${errordata.message ? 'error' : ''}`}>
                                                    <textarea
                                                        className='form-control'
                                                        name="message" id="message"
                                                        value={contactValue.message ? contactValue.message : ''}
                                                        onChange={(e) => {
                                                            setContactValue({ ...contactValue, message: e.target.value })
                                                            setErrordata({ ...errordata, message: '' })
                                                        }}
                                                        rows="3">
                                                    </textarea>
                                                    <label htmlFor="message" className={`form-label ${contactValue.message ? 'notEmpty' : ''}`}> Message  </label>
                                                    <span className="errortext"> {errordata.message ? errordata.message : ''} </span>

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
                                        height='100%'
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

                <Modal show={show} className='sendMailModal' onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mail Sent Successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="image-sec">
                            <img src="/images/sent-mail.gif" alt="sendicon" />
                        </div>
                        <div className="text-sec">
                            Thank you for reaching out. Your email has been successfully sent. <br /> We will get back to you shortly.
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="foot-bottom">

            </div>
        </>
    )
}
