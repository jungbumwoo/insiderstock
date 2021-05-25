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
            let stringErr = err.toString();
            dispatch({ type: "GET_NOTINTEREST_FAILED",
                            payload: { error: stringErr }});
        }
    }
}

export const notInterestDeleteAct = (deleteArray, remainArray) => {
    return async dispatch => {
        dispatch({ type: "DELETE_NOT_INTEREST_REQUEST"});
        try {
            const res = await axiosInstance.post("/delete/notinterest", {deleteArray});
            console.log(res.status);
            if(res.status === 201){
                console.log(remainArray);
                dispatch({ type: "DELETE_NOT_INTERST_SUCCESS", payload: { interestData: remainArray}})
            } else {
                console.log("ERR at interestDeleteAct");
                dispatch({ type: "DELETE_NOT_INTERST_FAILED", payload: { error: "ERR : DELETE_NOT_INTERST_FAILED"}})
            }
        } catch(err){
            console.log(err);
        }
    }
}