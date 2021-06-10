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
    
    const renderLoggedinbar = () => {
        return (
            <div>
                <li className="nav-item">
                    <span>{auth.user.username ? auth.user.username : undefined }</span>
                </li>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
                <li>
                    <Link to="/signout">signout</Link>
                </li>
            </div>
        )
    }   
    const renderNonLoginbar = () => {
        return (
            <>
                <div>
                    <li>
                        <NavLink to="signin" className="nav-link">SignIn</NavLink>
                    </li>
                </div>
                <div>
                    <li>
                        <NavLink to="signup" className="nav-link">SignUp</NavLink>
                    </li>
                </div>
            </>
        )
    }
    return (
        <>
            <a href="/">Insider</a>
                <a href="/onboard">Onboard</a>
                <a href="/interest">Interest</a>
                <a href="/ban">Banned</a>
            
            {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
            </Form> */}
            { isToken ? renderLoggedinbar() : renderNonLoginbar()}
        
        </>
    )
};

export default Header;