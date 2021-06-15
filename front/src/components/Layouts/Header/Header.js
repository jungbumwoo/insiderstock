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
            <ul className="login-status">
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
            <ul className="login-status">
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
                <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                <div>
                    <ul className="menu">
                        <li><a href="/onboard">담은목록</a></li>
                        <li><a href="/interest">관심종목</a></li>
                        <li><a href="/notinterest">노관심종목</a></li>
                        <li><a href="/ban">10일벤목록</a></li>
                    </ul>
                    { isToken ? renderLoggedinbar() : renderNonLoginbar()}
                </div>
            </div>
        </>
    )
};

export default Header;