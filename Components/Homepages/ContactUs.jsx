import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MailCheck } from 'lucide-react';
import SendIcon from '../Svg/SendIcon';
import { emailJsConfig } from '@/data/site';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Form fields in display order, with their validation rules. */
const FIELDS = [
    { name: 'subject', label: 'Subject', required: 'Please enter a subject', minLength: 5 },
    { name: 'name', label: 'Name', required: 'Please enter your name', minLength: 3 },
    { name: 'email', label: 'Email', required: 'Please enter your email', pattern: EMAIL_REGEX },
    { name: 'message', label: 'Message', required: 'Please enter your message', minLength: 10, multiline: true },
];

const validate = (values) => {
    const errors = {};
    FIELDS.forEach(({ name, label, required, minLength, pattern }) => {
        const value = (values[name] || '').trim();
        if (!value) errors[name] = required;
        else if (minLength && value.length < minLength) errors[name] = `${label} must contain at least ${minLength} characters`;
        else if (pattern && !pattern.test(value)) errors[name] = `Please enter a valid ${label.toLowerCase()}`;
    });
    return errors;
};

const generateCaptcha = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const number = Math.floor(Math.random() * 10);
    const chars = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    return `${number} ${chars}`;
};

export default function ContactUs() {
    const form = useRef(null);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [captcha, setCaptcha] = useState('');
    const [sending, setSending] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Generated on the client only, so server and client markup match.
    useEffect(() => setCaptcha(generateCaptcha()), []);

    const handleChange = ({ target: { name, value } }) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nextErrors = validate(values);
        if ((values.captcha || '').trim().toUpperCase() !== captcha) {
            nextErrors.captcha = 'Please enter the correct captcha value';
        }
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        setSending(true);
        try {
            await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, form.current, emailJsConfig.publicKey);
            toast.success('Mail sent successfully');
            setShowModal(true);
            setValues({});
            setCaptcha(generateCaptcha());
        } catch (error) {
            toast.error('Something went wrong. Please try again or reach me on LinkedIn.');
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    const fieldClass = (name) => `form-control ${errors[name] ? 'is-invalid' : ''}`;

    return (
        <>
            <div className="container">
                <div className="main-head">
                    <h3 className="head text-center">
                        <span className="text-green"> - LET&apos;S </span> CONNECT
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
                                    I&apos;m open to new opportunities and freelance projects. Send me a message about
                                    anything you&apos;d like to discuss and I&apos;ll get back to you soon.
                                </div>
                                <form className="contact-form" ref={form} onSubmit={handleSubmit} noValidate>
                                    {FIELDS.map(({ name, label, multiline }) => {
                                        const InputTag = multiline ? 'textarea' : 'input';
                                        return (
                                            <div className={`form-box ${errors[name] ? 'error' : ''}`} key={name}>
                                                <InputTag
                                                    type={multiline ? undefined : name === 'email' ? 'email' : 'text'}
                                                    name={name}
                                                    id={name}
                                                    value={values[name] || ''}
                                                    className={fieldClass(name)}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor={name} className={`form-label ${values[name] ? 'notEmpty' : ''}`}>
                                                    {label}
                                                </label>
                                                <span className="errortext">{errors[name]}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="row">
                                        <div className="col-xl-4 col-md-4 col-sm-6 col-6">
                                            <div className="CaptchaBox" aria-label="Captcha">{captcha}</div>
                                        </div>
                                        <div className="col-xl-8 col-md-8 col-sm-6 col-6">
                                            <div className={`form-box ${errors.captcha ? 'error' : ''}`}>
                                                <input
                                                    type="text"
                                                    name="captcha"
                                                    id="captcha"
                                                    autoComplete="off"
                                                    value={values.captcha || ''}
                                                    className={fieldClass('captcha')}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="captcha" className={`form-label ${values.captcha ? 'notEmpty' : ''}`}>
                                                    Enter Captcha
                                                </label>
                                                <span className="errortext">{errors.captcha}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-send-btn">
                                        <button type="submit" className="btn button" disabled={sending}>
                                            {sending ? 'Sending…' : 'Send'}
                                            <div className="svgIcon">
                                                <SendIcon />
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-12 col-12">
                            <div className="mapWrapper">
                                <iframe
                                    title="Noida, Uttar Pradesh on Google Maps"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.50123665962!2d77.23701437997667!3d28.522102351088325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1682659568283!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={showModal} className="sendMailModal" onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mail Sent Successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="image-sec">
                            <MailCheck aria-hidden="true" />
                        </div>
                        <div className="text-sec">
                            Thank you for reaching out. Your email has been sent successfully. <br /> I&apos;ll get back to you shortly.
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="foot-bottom" />
        </>
    );
}
