import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts/Layout/Layout.js"
import { Redirect } from "react-router-dom";
import { fblogin, kakaoLogin } from "../../actions/userAction";

const Signin = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    const fbLoginBtn = () => {
        console.log("fbLoginBtn is clicked");
        dispatch(fblogin());
    };

    const kakaoLoginBtn = () => {
        console.log("KakaoLoginBtn is clicked at Signin.js");
        dispatch(kakaoLogin());
    }
    
    return(
        <>  
            <Layout />
            <a href="http://localhost:2000/api/auth/facebook">
                <button>facebook login</button>
            </a>
            <button onClick={kakaoLogin()}>Kakao Login</button>
        </>
    )    
}

export default Signin;