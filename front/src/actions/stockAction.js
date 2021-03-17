import axiosInstance from "../helpers/axios.js";

export const getAllStock = () => {
    return async dispatch => {
        dispatch({ type: "GET_ALL_STOCKS_REQUEST"});
        try {
            const res = await axiosInstance.get("/stock")
            if(res.status === 200) {
                const { finalresult } = res.data;
                dispatch({
                    type: "GET_ALL_STOCKS_SUCCESS",
                    payload: { stocks: finalresult }
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