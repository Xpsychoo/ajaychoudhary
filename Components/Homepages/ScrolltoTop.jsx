import { useEffect, useState } from 'react';
import ChevroletLeftIcon from '../Svg/ChevroletLeftIcon'
import Link from 'next/link'

export default function ScrolltoTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 600) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!showButton) {
        return null;
    }

    return (
        <div className="scrolltotopbtn">
            <Link href='/'>
                <div className="iconsHolder" title='Back to Top'>
                    <div className="icon firstIcon">
                        <ChevroletLeftIcon />
                    </div>
                    <div className="icon secondIcon">
                        <ChevroletLeftIcon />
                    </div>
                </div>
            </Link>
        </div>
    );
}
