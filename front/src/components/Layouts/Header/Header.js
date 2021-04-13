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
    const [userToken, setUserToken] = useState(null);
    const isToken = localStorage.getItem('token');
    console.log("isToken at Header");
    console.log(isToken);
    if (isToken) {
        let userInfo = [];
        userInfo.token = isToken;
        dispatch(localStorageData(userInfo));
    }

    console.log("auth state when Header");
    console.log(auth);

    useEffect(() => {
        if(auth.token) {
            setUserToken(auth.token);
        }
    })
    
    const signout = (e) => {
        e.preventDefault();
        console.log('signout Fnc at Header');
        // dispatch(signout());
    };

    const renderLoggedinbar = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span>{auth.token}</span>
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
                { auth.token ? renderLoggedinbar() : renderNonLoginbar()}
            </Navbar>
        </>
    )
};

export default Header;