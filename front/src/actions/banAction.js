import axiosInstance from "../helpers/axios";

export const getBanAction = () => {
    return async (dispatch) => {
        dispatch({ type: "GET_BAN_REQUEST"});
        try {
            const res = await axiosInstance.get("/ban");
            if(res.status === 200){
                const { ban } = res.data;
                console.log(ban);
                dispatch({ type: "GET_BAN_SUCCESS",
                            payload: { data: ban }});
            }
        } catch(err) { 
            console.log(err);
            dispatch({ type: "GET_BAN_FAILED"});
        }
    } 
};

export const postBanAction = (data) => {
    return async (dispatch) => {
        dispatch({ type: "ADD_BAN_REQUEST"});
        try {
            const res = await axiosInstance.post("/addban", {bandata: data});
            if (res.status ===201) {
                dispatch({ type: "ADD_BAN_SUCCESS"});
            }
        } catch(err) {
            console.log(err);
            dispatch({ type: "ADD_BAN_FAILED"});
        }
    }
}