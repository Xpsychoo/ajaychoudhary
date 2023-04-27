import React, { useState } from 'react';
import Link from 'next/link'
import Sun from '../Svg/Sun'
import Moon from '../Svg/Moon'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from 'react-redux'
import { nightMode, lightMode, gradient } from '../../store/themeSlice'
import MenuIcon from '../Svg/MenuIcon';
import BrushIcon from '../Svg/BrushIcon';

const Navbar = () => {

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
                <div className="theme-btns">
                    {theme === 'light' || theme === 'gradient' ? <span
                        onClick={() => dispatch(nightMode())}
                        title='Dark Mode'
                        className="icon">
                        <Moon />
                    </span> : null}

                    {theme === 'dark' || theme === 'gradient' ? <span
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
                </div>
                <div className="nav-toggler">
                    <span className="icon">
                        
                        <DropdownButton variant="none" id="dropdown-basic-button" title={<MenuIcon />}>
                           <div className="MainMenu">
                                <ul className="listItem">
                                    <li className="list-item">Home</li>
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