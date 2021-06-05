import axiosInstance from "../helpers/axios";

export const getOnboard = () => {
    return async (dispatch) => {
        dispatch({ type: "REQUEST_GET_ONBOARD"});
        try {
            const res = await axiosInstance.get("/onboard");
            if(res.status ===200) {
                const { onboards } = res.data;
                console.log(onboards);
                dispatch({ type: "SUCCESS_GET_ONBOARD",
                            payload: { onboards }});
            };
        } catch(err) {
            console.log(err);
            console.log(err.response.data.message.message);
            let errMessage = err.response.data.message.message;
            dispatch({ type: "FAILED_GET_ONBOARD",
                        payload: { error: errMessage}});
        };
    };
};

export const addOnboard = (onboardList) => {
    return async (dispatch) => {
        dispatch({ type: "REQUEST_ADD_ONBOARD"});
        try {
            console.log("addOnboard");
            const res = await axiosInstance.post("/add/onboard", { onboardList });
            if (res.status === 201) {
                dispatch({ type: "SUCCESS_ADD_ONBOARD"});
            }
        } catch(err) {
            console.log(err.response);
            let errMessage = err.response.data.message;
            dispatch({ type: "FAILED_ADD_ONBOARD", payload: {error : errMessage}});
        }
    }
}