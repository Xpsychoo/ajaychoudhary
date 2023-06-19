export default function handler(req, res) {
    res.status(200).json([
        {
            topHead: 'Web Development',
            secHead: 'Web & Software Development',
            desc: 'As a software developer with 1.6 years of experience, I have honed my skills in technologies such as ReactJS, NextJS, and JavaScript. I am a detail-oriented and driven individual who is passionate about creating high-quality software solutions.',
        },
        {
            topHead: 'Web Design',
            secHead: 'Web Designing',
            desc: 'With my expertise, I have successfully designed and developed websites that not only look great but also function seamlessly on different devices and platforms. I am adept at using software such as Adobe Photoshop, Adobe XD, and Figma, and am always up-to-date with the latest design trends and technologies.',
        },
        {
            topHead: 'Mobile Apps',
            secHead: 'Mobile App Development',
            desc: 'As a self-motivated individual with a passion for mobile app development, I have taken it upon myself to learn the necessary skills to create cutting-edge mobile applications. If given the opportunity, I am eager to apply my skills and knowledge to develop innovative mobile applications.',
        },
    ])
}