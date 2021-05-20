import axiosInstance from "../helpers/axios.js";

export const getAllStock = () => {
    return async dispatch => {
        dispatch({ type: "GET_ALL_STOCKS_REQUEST"});
        try {
            const res = await axiosInstance.get("/stock");
            if(res.status === 200) {
                const { buyresult } = res.data;
                dispatch({
                    type: "GET_ALL_STOCKS_SUCCESS",
                    payload: { stocks: buyresult }
                });
            } else {
                dispatch({
                    type: "GET_ALL_STOCKS_FAILED",
                    payload: { error: res.data.error }
                })
            }
        } catch(err) {
            console.log("Err at stockAction");
            console.log(err)
            
        }
    }
}

export const getAddInterestAction = () => {
    return async dispatch => {
        dispatch({ type: "GET_INTEREST_REQUEST"});
        try {
            console.log("ADD Interest");
            let res = await axiosInstance.get('/addinterest');
            if(res.status === 200) {
                const { interested } = res.data;
                dispatch({ type: "GET_INTEREST_SUCCESS",
                            payload: {interested} });
            }
        } catch(err) {
            console.log(err.response);
            console.log(err.response.data.error);
            dispatch({ type: "GET_INTEREST_FAILED",
                        payload: {error: err.response.data.error}});
        }
    }
}

export const postAddInterestAction = (addStock) => {
    return async dispatch => {
        dispatch({ type: "ADD_INTEREST_POST_REQUEST"});
        try {
            const res = await axiosInstance.post("/addinterest", { data: addStock});
            if(res.status == 201){
                const { interested } = res.data;
                dispatch({ type: "ADD_INTEREST_POST_SUCCESS", payload: {added: addStock}});
            } else {
                console.log("Err: at postAddInterestAction");
            };
        } catch (err) {
            console.log(err)
        }
    }
}

export const postNotInterestAction = (notinterestStock) => {
    return async dispatch => {
        dispatch({ type: "ADD_NOTINTEREST_POST_REQUEST"});
        try {
            const res = await axiosInstance.post("/addnotinterest", { data: notinterestStock});
            if(res.status == 201) {
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

export const interestDeleteAct = (deleteArray, remainArray) => {
    return async dispatch => {
        dispatch({ type: "DELETE_INTEREST_REQUEST"});
        try {
            const res = await axiosInstance.post("/delete/interest", deleteArray);
            console.log(res.status);
            if(res.status === 201){
                console.log(remainArray);
                dispatch({ type: "DELETE_INTERST_SUCCESS", payload: { interestData: remainArray}})
            } else {
                console.log("ERR at interestDeleteAct");
            }
        } catch(err){
            console.log(err);
        }
    }
}

export const remainAction = (remainArray) => {
    return async dispatch => {
        dispatch({ type: "REMAIN_ARRAY", payload: { remainData : remainArray }})
    }
}

