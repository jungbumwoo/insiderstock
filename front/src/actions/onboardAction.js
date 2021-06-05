import axiosInstance from "../helpers/axios";

export const getOnboard = () => {
    return async (dispatch) => {
        dispatch({ type: "REQUEST_GET_ONBOARD"});
        try {
            const res = await axiosInstance.get("/onboard");
            if(res.status ===200) {
                const { pagedOnboard } = res.data;
                console.log(pagedOnboard);
                dispatch({ type: "SUCCESS_GET_ONBOARD",
                            payload: { pagedOnboard }});
            };
        } catch(err) {
            console.log(err);
            dispatch({ type: "FAILED_GET_ONBOARD",
                        payload: { err }});
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
            dispatch({ type: "FAILED_ADD_ONBOARD", payload: {err}});
        }
    }
}

export const deleteOnboardAction = (onboards) => {
    console.log(onboards);
    return async (dispatch) => {
        dispatch({ type: "REQUEST_DELETE_ONBOARD"});
        try {
            const res = axiosInstance.post("/delete/onboard", { onboards });
            if(res.status === 201) {
                dispatch({ type: "SUCCESS_DELETE_ONBOARD"});
            }
        } catch(err) {
            console.log(err);
            dispatch({ type: "FAILED_DELETE_ONBOARD", payload: { err } });
            
        };
    }
} 