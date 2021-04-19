import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts/Layout/Layout.js"
import { Redirect } from "react-router-dom";
import KakaoLogin from "react-kakao-login";

require('dotenv').config();

const Signin = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    console.log(process.env.REACT_APP_KAKAO_JS_KEY);

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    const responseKakao = (res) => {
        console.log(res);
    }

    const responseFailure = (res) => {
        console.log(res);
    }
    
    return(
        <>  
            <Layout />
            <a href="http://localhost:2000/api/auth/facebook">
                <button>facebook Login</button>
            </a>

            <a href="http://localhost:2000/api/oauth">
                <button>kakao Login</button>
            </a>
            
            <KakaoLogin
                jsKey={process.env.REACT_APP_KAKAO_JS_KEY}
                buttonText="Kakao Login!"
                onSuccess={responseKakao}
                onFailure={responseFailure}
                getProfile={true}
            />
        </>
    )    
}

export default Signin;