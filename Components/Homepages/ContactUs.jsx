import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SendIcon from '../Svg/SendIcon';

const requiredFields = {
    subject: 'Please Enter Message Subject',
    name: 'Please Enter Your Name',
    email: 'Please Enter Your email',
    message: 'Please Enter Your Message',
};

export default function ContactUs() {
    const form = useRef();
    const [contactValue, setContactValue] = useState({});
    const [show, setShow] = useState(false);
    const [errordata, setErrordata] = useState({});
    const [captcha, setCaptcha] = useState('');
    const [captchaValue, setCaptchaValue] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = {};

        for (const [key, value] of Object.entries(requiredFields)) {
            if (!contactValue[key]) {
                errors[key] = value;
            }
        }

        if (contactValue.subject && contactValue.subject.length < 5) {
            errors.subject = 'Subject must contain at least 5 characters';
        }

        if (contactValue.name && contactValue.name.length < 5) {
            errors.name = 'Name must contain at least 5 characters';
        }

        if (contactValue.message && contactValue.message.length < 10) {
            errors.message = 'Message must contain at least 10 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (contactValue.email && !emailRegex.test(contactValue.email)) {
            errors.email = 'Please Enter a Valid Email';
        }

        if (contactValue.message && contactValue.message.length < 10) {
            errors.message = 'Message must contain at least 10 characters';
        }

        if (captchaValue !== `${captcha.number} ${captcha.alphabets}`) {
            errors.captcha = "Please enter the correct captcha value";
        }

        setErrordata(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const result = await emailjs.sendForm(
                    'service_bz1sjhs',
                    'template_5opo4b5',
                    form.current,
                    'SzW6c8-46F6f0Buff'
                );

                if (result.status === 200) {
                    toast.success('Mail sent Successfully');
                    handleShow();
                    setContactValue({});
                }
                console.log(result);
            } catch (error) {
                console.log(error.text);
            }
        }
    };

    const generateCaptcha = () => {
        const number = Math.floor(Math.random() * 10);
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomAlphabets = Array.from({ length: 4 }, () =>
            alphabets.charAt(Math.floor(Math.random() * alphabets.length))
        ).join("");
        return { number, alphabets: randomAlphabets };
    };

    const handleChange = (e, field) => {
        const value = e.target.value;
        setContactValue({ ...contactValue, [field]: value });
        setErrordata({ ...errordata, [field]: '' });
    };

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    return (
        <>
            <div className="container">
                <div className="main-head">
                    <h3 className="head text-center">
                        <span className="text-green"> - LET'S </span> CONNECT
                    </h3>
                    <h5 className="sub_head text-center">
                        Get<span className="text-green text-cursive"> in touch</span>
                    </h5>
                </div>
                <div className="ContactUs">
                    <div className="row">
                        <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                            <div className="getintouch">
                                <div className="head">
                                    I'm currently available to take on new projects, so feel free to send me a message about anything that
                                    you want to run past me. You can contact anytime at 24/7
                                </div>
                                <form className="contact-form" ref={form} onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                            {Object.entries(requiredFields).map(([key]) => (
                                                <div className={`form-box ${errordata[key] ? 'error' : ''}`} key={key}>
                                                    {key === 'message' ? (
                                                        <textarea
                                                            name={key}
                                                            value={contactValue[key] || ''}
                                                            id={key}
                                                            className={`form-control ${errordata[key] ? 'is-invalid' : ''}`}
                                                            onChange={(e) => handleChange(e, key)}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name={key}
                                                            value={contactValue[key] || ''}
                                                            id={key}
                                                            className={`form-control ${errordata[key] ? 'is-invalid' : ''}`}
                                                            onChange={(e) => handleChange(e, key)}
                                                        />
                                                    )}
                                                    <label htmlFor={key} className={`form-label ${contactValue[key] ? 'notEmpty' : ''}`}>
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </label>
                                                    <span className="errortext">{errordata[key] || ''}</span>
                                                </div>
                                            ))}
                                            <div className="row">
                                                <div className="col-xl-4 col-md-4 col-sm-6 col-6">
                                                    <div className="CaptchaBox">
                                                        {`${captcha.number} ${captcha.alphabets}`}
                                                    </div>
                                                </div>
                                                <div className="col-xl-8 col-md-8 col-sm-6 col-6">
                                                    <div className={`form-box ${errordata.captcha ? "error" : ""}`}>
                                                        <input
                                                            type="text"
                                                            name="captcha"
                                                            value={captchaValue}
                                                            id="captcha"
                                                            className={`form-control ${errordata.captcha ? 'is-invalid' : ''}`}
                                                            onChange={(e) =>{ 
                                                                setCaptchaValue(e.target.value)
                                                                setErrordata({ ...errordata, captcha: '' });
                                                            }}
                                                        />
                                                        <label htmlFor="captcha" className={`form-label ${captchaValue ? 'notEmpty' : ''}`}>
                                                            Enter Captcha
                                                        </label>
                                                        <span className="errortext">{errordata.captcha || ""}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-send-btn">
                                                <button type="submit" className="btn button">
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
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.50123665962!2d77.23701437997667!3d28.522102351088325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1682659568283!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={show} className="sendMailModal" onHide={handleClose}>
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

            <div className="foot-bottom"></div>
        </>
    );
}
