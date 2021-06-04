import axiosInstance from "../helpers/axios.js";

export const getAllStock = (params) => {
    return async dispatch => {
        dispatch({ type: "GET_ALL_STOCKS_REQUEST"});
        try {
            console.log("getAllStock");
            const res = await axiosInstance.get(`/stock?page=${params}`);
            if(res.status === 200) {
                const { paginatedResult } = res.data;

                // delete ._id from data 
                paginatedResult.pageOfItems.forEach(el => {
                    delete el._id;
                })

                dispatch({
                    type: "GET_ALL_STOCKS_SUCCESS",
                    // payload: { stocks: result }
                    payload: { paginatedResult }
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
            dispatch({
                type: "GET_ALL_STOCKS_FAILED",
                payload: { error: err }
            });
        }
    }
}

export const getInterestAction = (params) => {
    return async dispatch => {
        dispatch({ type: "GET_INTEREST_REQUEST"});
        try {
            console.log("ADD Interest");
            let res = await axiosInstance.get(`/interest?page=${params}`);
            if(res.status === 200) {
                const { pagedGetInt } = res.data;

                // delete _id for duplication, error, hack
                pagedGetInt.pageOfItems.forEach(el => {
                    delete el._id;
                });
                dispatch({ type: "GET_INTEREST_SUCCESS",
                            payload: {pagedGetInt} });
            }
        } catch(err) {
            console.log(err);
            dispatch({ type: "GET_INTEREST_FAILED",
                        payload: { error: err.response.data.message }});
        }
    }
}

export const postAddInterestAction = (addStock) => {
    return async dispatch => {
        dispatch({ type: "ADD_INTEREST_POST_REQUEST"});
        try {
            const res = await axiosInstance.post("/addinterest", { data: addStock });
            if(res.status === 201){
                dispatch({ type: "ADD_INTEREST_POST_SUCCESS", payload: {added: addStock}});
            } else {
                console.log("Err: at postAddInterestAction");
            };
        } catch (err) {
            console.log(err)
        }
    }
}

export const interestDeleteAct = (deleteArray, remainArray) => {
    return async dispatch => {
        dispatch({ type: "DELETE_INTEREST_REQUEST"});
        try {
            const res = await axiosInstance.post("/delete/interest", deleteArray);
            console.log(res.status);
            if(res.status === 201){
                console.log(remainArray);
                dispatch({ type: "DELETE_INTERST_SUCCESS", payload: { remainInterest : remainArray}})
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

