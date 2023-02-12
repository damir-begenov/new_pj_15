import { Component } from "react";
import { Link } from 'react-router-dom'
import React from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from 'react-router-dom';
import './NavBar.css'

import authService from "../../services/auth.service";

const Navbar = () => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()    

    const logoutHandler = () => {

        authService.logout();

        navigate('/login', { replace: true });
    }

    return (
        <div className="nav-back">
            <nav className="NavbarItems">
                <h1 className="logo"><Link to='/'>NEXUS</Link></h1>
                <ul className="nav-menu">
                    {userSession ? 
                        <>
                            <li><a className={"nav-links"} href={""}><span>{userSession.username}</span>:<span className="userRole">{userSession.roles[0].substring(5)}</span></a></li>
                            <li><a className={"nav-links"} href={""} onClick={logoutHandler}>LOG OUT</a></li>
                        </> 
                        :
                        <>
                            <li><a className={"nav-links"} href={"http://localhost:3000/login"}>LOG IN</a></li>
                            <li><a className={"nav-links"} href={"http://localhost:3000/registration"}>SIGN UP</a></li>
                        </>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar