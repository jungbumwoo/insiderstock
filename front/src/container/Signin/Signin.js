import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts/Layout/Layout.js"
import { Redirect } from "react-router-dom";
import { postKakaoUser } from "../../actions"; 

require('dotenv').config();

const Signin = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isToken = localStorage.getItem('token');

    useEffect(() => {
        // Kakao sdk import
        const kakaoScript = document.createElement('script');
        kakaoScript.async = true;
        kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
        document.head.appendChild(kakaoScript);
        
        // Kakao sdk load
        kakaoScript.onload = () => {
             // SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
            window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);

            // SDK 초기화 여부를 판단합니다.
            console.log(window.Kakao.isInitialized());

            // Login and Get access_token
            window.Kakao.Auth.createLoginButton({
                container: '#kakao-login-btn',
                success: (auth) => {
                    console.log("Kakao Login Success", auth);
                    let { access_token } = auth; 
                    // requset Api User Info
                    window.Kakao.API.request({
                        url: '/v2/user/me', // kakao docs url
                        success: (res) => {
                            console.log(res);
                            let id = res.id;
                            let nickname = res.properties.nickname;
                            let profileImg110 = res.properties.thumbnail_image;
                            let provider = 'kakao';
                            dispatch(postKakaoUser(id, access_token, nickname, profileImg110, provider));
                        },
                        fail: (err) => {
                            console.log(err)
                        }
                    });
                },
                fail: (err) => {
                    console.log(err);
                }
            })
        };
    });

    if(auth.authenticate && isToken){
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
            
            <button type="button" id="kakao-login-btn"></button>
        </>
    )    
}

export default Signin;