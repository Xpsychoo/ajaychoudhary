import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AtSign, Loader2, MailCheck, MapPin, MessageSquare, RefreshCw, Send, Sparkles, Type, User } from 'lucide-react';
import { emailJsConfig } from '@/data/site';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Form fields in display order, with their validation rules. */
const FIELDS = [
    { name: 'name', label: 'Your name', required: 'Please enter your name', minLength: 3, Icon: User, half: true },
    { name: 'email', label: 'Email address', required: 'Please enter your email', pattern: EMAIL_REGEX, Icon: AtSign, half: true },
    { name: 'subject', label: 'Subject', required: 'Please enter a subject', minLength: 5, Icon: Type },
    { name: 'message', label: 'Tell me about your project', required: 'Please enter your message', minLength: 10, multiline: true, Icon: MessageSquare },
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

    // placeholder=" " lets CSS float the label via :placeholder-shown
    const renderField = ({ name, label, multiline, Icon, half }) => {
        const InputTag = multiline ? 'textarea' : 'input';
        return (
            <div className={`field ${half ? 'half' : ''} ${errors[name] ? 'error' : ''}`} key={name}>
                <Icon className="fieldIcon" aria-hidden="true" />
                <InputTag
                    type={multiline ? undefined : name === 'email' ? 'email' : 'text'}
                    name={name}
                    id={name}
                    placeholder=" "
                    rows={multiline ? 5 : undefined}
                    value={values[name] || ''}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                    onChange={handleChange}
                />
                <label htmlFor={name}>{label}</label>
                <span className="errortext" id={`${name}-error`}>{errors[name]}</span>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="main-head" data-reveal="up">
                <h3 className="head text-center">
                    <span className="text-green"> - LET&apos;S </span> CONNECT
                </h3>
                <h5 className="sub_head text-center">
                    Get<span className="text-green text-cursive"> in touch</span>
                </h5>
            </div>

            <div className="contactGrid">
                <aside className="contactInfo" data-reveal="left">
                    <span className="availability">
                        <span className="pulse" aria-hidden="true" />
                        Open to new opportunities
                    </span>
                    <h4 className="pitch">
                        Have a project in mind? <span className="text-green">Let&apos;s build it together.</span>
                    </h4>
                    <p className="blurb">
                        I&apos;m open to new opportunities and freelance projects. Send me a message about
                        anything you&apos;d like to discuss and I&apos;ll get back to you soon.
                    </p>

                    <div className="mapCard">
                        <iframe
                            title="Noida, Uttar Pradesh on Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.50123665962!2d77.23701437997667!3d28.522102351088325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1682659568283!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <span className="mapBadge">
                            <MapPin aria-hidden="true" /> Based in Noida, India
                        </span>
                    </div>
                </aside>

                <div className="contactCard" data-reveal="right" style={{ '--reveal-delay': '150ms' }}>
                    <div className="cardTitle">
                        <Sparkles aria-hidden="true" /> Send me a message
                    </div>
                    <form className="contactForm" ref={form} onSubmit={handleSubmit} noValidate>
                        <div className="fields">
                            {FIELDS.map(renderField)}
                        </div>

                        <div className="captchaRow">
                            <div className="captchaCode">
                                <span aria-label={`Captcha code: ${captcha}`}>{captcha}</span>
                                <button
                                    type="button"
                                    className="refresh"
                                    onClick={() => setCaptcha(generateCaptcha())}
                                    aria-label="Get a new captcha code"
                                    title="New code"
                                >
                                    <RefreshCw aria-hidden="true" />
                                </button>
                            </div>
                            <div className={`field ${errors.captcha ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    name="captcha"
                                    id="captcha"
                                    placeholder=" "
                                    autoComplete="off"
                                    value={values.captcha || ''}
                                    aria-invalid={!!errors.captcha}
                                    onChange={handleChange}
                                />
                                <label htmlFor="captcha">Type the code</label>
                                <span className="errortext">{errors.captcha}</span>
                            </div>
                        </div>

                        <button type="submit" className="sendBtn" disabled={sending}>
                            {sending ? 'Sending' : 'Send message'}
                            {sending ? <Loader2 className="spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
                        </button>
                    </form>
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
    );
}
