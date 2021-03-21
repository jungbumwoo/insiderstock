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

export const savestock = (stockArray) => {
    return async dispatch => {
        dispatch({ type: "SAVE_STOCK_REQUEST"});
        try {
            console.log("saveStock Action");
            const res = await axiosInstance.post("/savestock", {stockArray});
            if(res.status === 200) {
                const { savedList } = res.data;
                console.log(savedList);
                dispatch({
                    type: "SAVE_STOCK_SUCCESS",
                    payload: savedList
                })
            } else {

            }
        } catch(err) {
            console.log(err);
        }
    }
}