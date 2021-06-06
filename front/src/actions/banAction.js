import axiosInstance from "../helpers/axios";

export const getBanAction = (params) => {
    return async (dispatch) => {
        dispatch({ type: "GET_BAN_REQUEST"});
        try {
            const res = await axiosInstance.get(`/ban?page=${params}`);
            if(res.status === 200){
                const { data } = res.data;
                console.log(data);
                dispatch({ type: "GET_BAN_SUCCESS",
                            payload: { data }});
            }
        } catch(err) { 
            console.log(err);
            dispatch({ type: "GET_BAN_FAILED",
                        payload: {error: err}});
        }
    } 
};

export const addBanAction = (data) => {
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

export const deleteBanAction = (data) => {
    return async (dispatch) => {
        dispatch({ type: "REQUEST_DELETE_BAN"});
        try {
            const res = axiosInstance.post('/ban/delete', { deleteData : data});
            if(res.status === 201) {
                dispatch({ type: "SUCCESS_DELETE_BAN"});
            }
        } catch(err) {
            console.log(err);
            dispatch({ type: "FAILED_DELETE_BAN", 
                        payload: { error : err }});
        }
    }
}