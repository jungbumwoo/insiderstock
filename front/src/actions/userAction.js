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

export const fblogin = () => {
    return async (dispatch) => {
        dispatch({ type: "FACEBOOK_LOGIN_REQUEST"});
        try {
            const res = await axiosInstance.get('auth/facebook');
            if(res.status === 200) {
                const { data } = res;
                console.log(data);
                dispatch({
                    type: "FACEBOOK_LOGIN_SUCCESS",
                });
            }
        } catch(err) {
            console.log(err);
        }
    }
}

export const kakaoLogin = () => {
    return async (dispatch) => {
        dispatch({ type: "KAKAO_LOGIN_REQUEST"});
        try {
            const res = axiosInstance.get('auth/kakao');
            if(res.status === 200){
                const { data } = res;
                console.log("kakaoLogin at userAction.js");
                console.log(data);
                dispatch({
                    type: "KAKAO_LOGIN_SUCCESS"
                })
            }
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

export const localStorageData = (userInfo) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "LOCALSTORAGE_DATA",
                    payload: {token: userInfo.token}});    
        } catch(err) {
            console.log(err);
        }
    }
}