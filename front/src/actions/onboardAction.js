import axiosInstance from "../helpers/axios";

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
            console.log(err);
            dispatch({ type: "FAILED_ADD_ONBOARD"});
        }
    }
}