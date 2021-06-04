import axiosInstance from "../helpers/axios.js";

export const getNotInterestAction = (params) => {
    return async dispatch => {
        dispatch({ type: "GET_NOTINTEREST_REQUEST"});
        try {
            let res = await axiosInstance.get(`/getnotinterest?page=${params}`);
            if(res.status === 200) {
                const { pagedNotInt } = res.data;
                console.log(pagedNotInt);
                dispatch({ type: "GET_NOTINTEREST_SUCCESS",
                            payload: { pagedNotInt }});
            } else {
                dispatch({ type: "GET_NOTINTEREST_FAILED",
                            payload: { error: res.data.error}});
            }
        } catch(err) {
            console.log(err.response.data.message);
            dispatch({ type: "GET_NOTINTEREST_FAILED",
                            payload: { error: err.response.data.message }});
        }
    }
}


export const postNotInterestAction = (notinterestStock) => {
    return async dispatch => {
        dispatch({ type: "ADD_NOTINTEREST_POST_REQUEST"});
        try {
            const res = await axiosInstance.post("/addnotinterest", { data: notinterestStock});
            if(res.status === 201) {
                dispatch({ type: "ADD_NOTINTEREST_POST_SUCCESS"});
            } else {
                dispatch({ type: "ADD_NOTINTEREST_POST_FAILED", payload: { error: "Err at postNotInterestAction"}});
                console.log("Err at postNotInterestAction");
            }
        } catch(err) {
            console.log(err);
        };
    }
};


export const notInterestDeleteAct = (deleteArray, remainArray) => {
    return async dispatch => {
        dispatch({ type: "DELETE_NOT_INTEREST_REQUEST"});
        try {
            const res = await axiosInstance.post("/delete/notinterest", {deleteArray});
            console.log(res.status);
            if(res.status === 201){
                console.log(remainArray);
                dispatch({ type: "DELETE_NOT_INTERST_SUCCESS", payload: { remainArray}})
            } else {
                console.log("ERR at interestDeleteAct");
                dispatch({ type: "DELETE_NOT_INTERST_FAILED", payload: { error: "ERR : DELETE_NOT_INTERST_FAILED"}})
            }
        } catch(err){
            console.log(err);
        }
    }
}