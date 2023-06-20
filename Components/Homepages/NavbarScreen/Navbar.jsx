import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { SunIcon, MoonIcon, BrushIcon, ImageIcon, CrossIcon } from '@/Components/Svg/AllIcons';
import { nightMode, lightMode, gradient, gimage, } from '../../../store/themeSlice';
import MenuIcon from '@/Components/Svg/MenuIcon';
import Image from 'next/image';

const Navbar = () => {
    const [themeToggler, setThemeToggler] = useState(false);
    const theme = useSelector((state) => state.themeMode.value);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        setThemeToggler(!themeToggler);
    };

    const toggleLightMode = () => {
        dispatch(lightMode());
    };

    const toggleDarkMode = () => {
        dispatch(nightMode());
    };

    const toggleGradientMode = () => {
        dispatch(gradient());
    };

    const toggleGradientImageMode = () => {
        dispatch(gimage());
    };

    return (
        <nav className="navbar">
            <div className="container ">
                <Link href="/">
                    <div className="main-icon">
                        <Image
                            src="/images/main-icon.webp"
                            width={30}
                            height={30}
                            title='Ajay Choudhary'
                            alt="Ajay Choudhary"
                        />
                    </div>
                </Link>
                <ul className="navlinks m-auto">
                    {["#home", "#whatido", "#skills", "#projects", "#contact"].map((link, index) => (
                        <Link key={index} href={link}>
                            <li className="list-item text-capitalize">{link.replace("#", "")}</li>
                        </Link>
                    ))}
                </ul>
                <div className="theme-btns">
                    {!themeToggler ? (
                        <span className="selecThemeBtn" onClick={toggleTheme}>
                            <Image
                                src="/images/brush.png"
                                width={30}
                                height={30}
                                title='select Theme'
                                alt="select Theme"
                            />
                        </span>
                    ) : (
                        <div className="btnsbox">
                            <div className="closeThemeBtn" onClick={toggleTheme}>
                                <CrossIcon />
                            </div>
                            {(theme === "light" ||
                                theme === "gradient" ||
                                theme === "gradient image") && (
                                    <span className="icon" onClick={toggleDarkMode} title="Dark Mode">
                                        <MoonIcon />
                                    </span>
                                )}
                            {(theme === "dark" ||
                                theme === "gradient" ||
                                theme === "gradient image") && (
                                    <span className="icon" onClick={toggleLightMode} title="Light Mode">
                                        <SunIcon />
                                    </span>
                                )}
                            {theme !== "gradient" && (
                                <span className="icon brush" onClick={toggleGradientMode} title="Gradient Mode">
                                    <BrushIcon />
                                </span>
                            )}
                            {theme !== "gradient image" && (
                                <span className="icon brush" onClick={toggleGradientImageMode} title="Gradient Second">
                                    <ImageIcon />
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="nav-toggler">
                    <span className="icon">
                        <DropdownButton variant="none" id="dropdown-basic-button" title={<MenuIcon />}>
                            <div className="MainMenu">
                                <ul className="listItem">
                                    {["#home", "#whatido", "#skills", "#projects", "#contact"].map((link, index) => (
                                        <Link key={index} href={link}>
                                            <li className="list-item text-capitalize">{link.replace("#", "")}</li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </DropdownButton>
                    </span>
                </div>
                <div className="collapse-bar"></div>
            </div>
        </nav>

    );
};

export default Navbar;