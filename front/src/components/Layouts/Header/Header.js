import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
    const auth = useSelector(state => state.auth);
    console.log("auth state when Header");
    console.log(auth);

    const renderLoggedinbar = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span>{auth.cookieusername}</span>
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
                { auth.authenticate ? renderLoggedinbar() : renderNonLoginbar()}
            </Navbar>
        </>
    )
};

export default Header;