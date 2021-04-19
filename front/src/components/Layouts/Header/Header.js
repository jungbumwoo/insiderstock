import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Form, FormControl, Button } from 'react-bootstrap';
import { signout, localStorageData } from "../../../actions";
import FormImpl from "react-bootstrap/esm/Form";

const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [ userToken, setUserToken ] = useState(null);
    const isToken = localStorage.getItem('token');
    let x = document.cookie;
    // console.log("isToken at Header");
    console.log("auth / Header at front");
    console.log(auth);

    if (isToken) {
        let userInfo = [];
        userInfo.token = isToken;
        dispatch(localStorageData(userInfo));
        // setUserToken(userInfo.token);
    }

    useEffect(() => {
        if(isToken) {
            console.log("useEffect executed");
            setUserToken(auth.token);
        }
    }, [])
    
    const signout = (e) => {
        e.preventDefault();
        console.log('signout Fnc at Header');
        localStorage.removeItem('token');
        // dispatch(signout());
    };
    let getCookie = () => {
        let tokenName = "userName"
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + tokenName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
    let cookieUsername = getCookie();

    const renderLoggedinbar = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span>{cookieUsername ? cookieUsername : undefined }</span>
                </li>
                <li>
                    <a href="#" onClick={signout}>
                        signout
                    </a>
                </li>
            </Nav>
        )
    }   
    const renderNonLoginbar = () => {
        return (
            <>
                <Nav>
                    <li>
                        <NavLink to="signin" className="nav-link">SignIn</NavLink>
                    </li>
                </Nav>
                <Nav>
                    <li>
                        <NavLink to="signup" className="nav-link">SignUp</NavLink>
                    </li>
                </Nav>
            </>
        )
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form> */}
                { isToken ? renderLoggedinbar() : renderNonLoginbar()}
            </Navbar>
        </>
    )
};

export default Header;