import axiosInstance from "../helpers/axios.js";

export const getNotInterestAction = (req, res) => {
    return async dispatch => {
        dispatch({ type: "GET_NOTINTEREST_REQUEST"});
        try {
            let res = await axiosInstance.get("/getnotinterest");
            if(res.status === 200) {
                const { notInterests } = res.data;
                console.log(notInterests);
                dispatch({ type: "GET_NOTINTEREST_SUCCESS",
                            payload: { notInterests }});
            } else {
                dispatch({ type: "GET_NOTINTEREST_FAILED",
                            payload: { error: res.data.error}});
            }
        } catch(err) {
            console.log(err);
        }
    }
}