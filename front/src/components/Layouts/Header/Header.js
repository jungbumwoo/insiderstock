import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav} from 'react-bootstrap';


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
    
    // const signout = (e) => {
    //     e.preventDefault();
    //     console.log('signout Fnc at Header');
    //     localStorage.removeItem('token');
    //     dispatch(signout());
    // };
    // let getCookie = () => {
    //     let tokenName = "userName"
    //     let matches = document.cookie.match(new RegExp(
    //       "(?:^|; )" + tokenName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    //     ));
    //     return matches ? decodeURIComponent(matches[1]) : undefined;
    //   }

    const renderLoggedinbar = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span>{auth.user.username ? auth.user.username : undefined }</span>
                </li>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
                <li>
                    <Link to="/signout">signout</Link>
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
                <Navbar.Brand href="/">Insider</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/onboard">Onboard</Nav.Link>
                    <Nav.Link href="/interest">Interest</Nav.Link>
                    <Nav.Link href="/ban">Banned</Nav.Link>
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