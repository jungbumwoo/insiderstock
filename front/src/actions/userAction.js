import axiosInstance from "../helpers/axios";

export const sendToken = (token) => {
    return (dispatch) => {
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
                })
            }
        } catch(err) {
            console.log(err);
        }
    }
}