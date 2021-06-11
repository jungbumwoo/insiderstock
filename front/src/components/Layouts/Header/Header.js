import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
    const auth = useSelector(state => state.auth);
    const isToken = localStorage.getItem('token');
    // console.log("isToken at Header");
    console.log("auth / Header at front");
    console.log(auth);

    if (isToken) {
        let userInfo = [];
        userInfo.token = isToken;
    }
    
    const renderLoggedinbar = () => {
        return (
            <ul>
                <li className="nav-item">
                    <span>{auth.user.username ? auth.user.username : undefined }</span>
                </li>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
                <li>
                    <Link to="/signout">signout</Link>
                </li>
            </ul>
        )
    };

    const renderNonLoginbar = () => {
        return (
            <ul>
                <li>
                    <NavLink to="signin" className="nav-link">SignIn</NavLink>
                </li>
                <li>
                    <NavLink to="signup" className="nav-link">SignUp</NavLink>
                </li>
            </ul>
        )
    };

    return (
        <>
            <div className="header">
                <a href="/" class="logo">Insider</a>
                <input class="menu-btn" type="checkbox" id="menu-btn"/>
                <ul>
                    <li><a href="/onboard">Onboard</a></li>
                    <li><a href="/interest">Interest</a></li>
                    <li><a href="/ban">Banned</a></li>
                </ul>
                <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                { isToken ? renderLoggedinbar() : renderNonLoginbar()}
            </div>
        </>
    )
};

export default Header;