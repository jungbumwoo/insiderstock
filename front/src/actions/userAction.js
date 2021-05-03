import axiosInstance from "../helpers/axios";

export const sendToken = (token) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "SEND_TOKEN_REQUEST",
                payload: { token: token}
            }); 
        } catch(err) {
            console.log(err);
        }
    }
};

export const getUserData = () => {
    return async (dispatch) => {
        dispatch({ type: "COOKIE_DATA_REQUEST"});
        try {
            // const res = await axiosInstance.get('/auth/getuser');
            // const { data } = res;
            // console.log(data);
            let getCookie = () => {
                let tokenName = "userName"
                let matches = document.cookie.match(new RegExp(
                  "(?:^|; )" + tokenName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
              }
            let cookieUsername = getCookie();
            dispatch({ type: "COOKIE_DATA_SUCCESS",
                        payload: { name : cookieUsername }});
        } catch(err) {
            console.log(err);
        }
    }
}

export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: "SIGNOUT_REQUEST"});
        try {
            const res = await axiosInstance.get('auth/signout');
            if (res.status === 200) {
                const { data } = res;
                window.localStorage.removeItem("token");
                dispatch({ type: "SIGNOUT_SUCCESS"});
            }
        } catch(err) {
            console.log(err);
            dispatch({ type: "SIGNOUT_FAILURE"})
        }
    }
}


export const postKakaoUser = (id, access_token, nickname, profileImg110, provider) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "POST_KAKAO_USER_REQUEST"});
            const res = await axiosInstance.post('auth/kakao/jslogin', {
                userid : id, access_token, nickname, profileImg110, provider
            })
            if (res.status === 200) {
                const { token } = res.data;
                localStorage.setItem('token', token);
                dispatch({ type: "POST_KAKAOUSER_SUCCESS",
                        payload: {id, nickname, profileImg110, provider} });
            }
        } catch(err) {
            console.log(err);
        }
    }
}

export const postKakaoSignup = (id, access_token, nickname, profileImg110, provider) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "POST_KAKAO_SIGNUP_REQUEST"});
            const res = await axiosInstance.post('auth/kakao/signup', {
                userid : id, access_token, nickname, profileImg110, provider
            })
            if (res.status === 201) {
                dispatch({ type: "POST_KAKAO_SIGNUP_SUCCESS",
                        payload: {id, access_token, nickname, profileImg110, provider} });
            }
        } catch(err) {
            console.log(err);
        }
    }
}
