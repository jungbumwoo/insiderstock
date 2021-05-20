const initState = {
    onboards: [],
loading: false,
    error: null
};

const onboardReducer = (state = initState, action) => {
    switch (action.type){
        case "REQUEST_GET_ONBOARD":
            state = {
                ...state,
                loading: true,
            }
            break;
        case "SUCCESS_GET_ONBOARD":
            state = {
                ...state,
                loading: false,
                onboards : action.payload.onboards
            }
            break;
        case "FAILED_GET_ONBOARD":
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
    }
    return state;
}

export default onboardReducer;