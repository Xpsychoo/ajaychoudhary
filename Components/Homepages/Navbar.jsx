import React, { useState } from 'react';
import Link from 'next/link'
import Sun from '../Svg/Sun'
import Moon from '../Svg/Moon'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from 'react-redux'
import { nightMode, lightMode, gradient, gimage } from '../../store/themeSlice'
import MenuIcon from '../Svg/MenuIcon';
import BrushIcon from '../Svg/BrushIcon';
import ImageIcon from '../Svg/ImageIcon';
import CrossIcon from '../Svg/CrossIcon';

const Navbar = () => {

    const [themeToggler, setThemeToggler] = useState(false)
    const theme = useSelector((state) => state.themeMode.value)
    const dispatch = useDispatch()

    return (
        <nav className="navbar">
            <div className="container ">
                <Link href='/'>
                    <div className="main-icon">
                        <img src="/images/main-icon.png" alt="" />
                    </div>
                </Link>
                <ul className="navlinks m-auto">
                    <Link href='#home'> <li className="list-item"> Home </li></Link>
                    <Link href='#whatido'> <li className="list-item">  What i do  </li></Link>
                    <Link href='#skills'> <li className="list-item">  My Skills  </li></Link>
                    <Link href='#projects'> <li className="list-item">  My Projects  </li></Link>
                    <Link href='#contactme'> <li className="list-item">  Contact Me  </li></Link>
                </ul>
                <div className="theme-btns">
                    {!themeToggler ?
                        <span className="selecThemeBtn" onClick={() => setThemeToggler(!themeToggler)}>
                            <img src="/images/brush.png" alt="select Theme" />
                        </span> :
                        <div className="btnsbox">
                            <div className="closeThemeBtn" onClick={() => setThemeToggler(!themeToggler)}>
                                <CrossIcon />
                            </div>
                            {theme === 'light' || theme === 'gradient' || theme === 'gradient image' ? <span
                                onClick={() => dispatch(nightMode())}
                                title='Dark Mode'
                                className="icon">
                                <Moon />
                            </span> : null}

                            {theme === 'dark' || theme === 'gradient' || theme === 'gradient image' ? <span
                                className="icon"
                                title='Light Mode'
                                onClick={() => dispatch(lightMode())}>
                                <Sun />
                            </span> : null}
                            {theme === 'gradient' ? null : <span
                                className="icon brush"
                                title='Gradient Mode'
                                onClick={() => dispatch(gradient())}>
                                <BrushIcon />
                            </span>}
                            {theme === 'gradient image' ? null : <span
                                className="icon brush"
                                title='Gradient second'
                                onClick={() => dispatch(gimage())}>
                                <ImageIcon />
                            </span>}
                        </div>}
                </div>
                <div className="nav-toggler">
                    <span className="icon">
                        <DropdownButton variant="none" id="dropdown-basic-button" title={<MenuIcon />}>
                            <div className="MainMenu">
                                <ul className="listItem">
                                    <Link href='#home'> <li className="list-item">Home</li></Link>
                                    <Link href='#whatido'> <li className="list-item">  What i do  </li></Link>
                                    <Link href='#skills'> <li className="list-item">  My Skills  </li></Link>
                                    <Link href='#projects'> <li className="list-item">  MY Projects  </li></Link>
                                    <Link href='#contactme'> <li className="list-item">  Contact Me  </li></Link>

                                </ul>
                            </div>
                        </DropdownButton>
                    </span>
                </div>
                <div className="collapse-bar">

                </div>
            </div>
        </nav>
    )
}

export default Navbar