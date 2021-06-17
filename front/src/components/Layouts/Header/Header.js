import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header3.css";

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

    // return (
    //     <>
    //         <div className="header">
    //             <a href="/" class="logo">Insider</a>
    //             <input class="menu-btn" type="checkbox" id="menu-btn"/>
    //             <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    //             <ul className="menu-ul">
    //                 <li><a href="/onboard">담은목록</a></li>
    //                 <li><a href="/interest">관심종목</a></li>
    //                 <li><a href="/notinterest">노관심종목</a></li>
    //                 <li><a href="/ban">10일벤목록</a></li>
    //             </ul>
    //             { isToken ? renderLoggedinbar() : renderNonLoginbar()}
    //         </div>
    //     </>
    // )

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <a id="htitle" href="/">insider</a>
                    <div className="hamburger">
                        <input className="menu-btn" type="checkbox"/>
                        <label className="menu-icon" for="menu-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                </div>
                <div className="menuToggle">
                    <ul className="menu-ul">
                        <a href="/onboard">담은목록</a>
                        <a href="/interest">관심종목</a>
                        <a href="/notinterest">노관심종목</a>
                        <a href="/ban">10일벤목록</a>
                        <a href="#">SignIn</a>
                        <a href="#">SignUp</a>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Header;