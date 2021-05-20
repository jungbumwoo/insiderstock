const initState = {
    onboards: [],
loading: false,
    error: null
};

export default (state = initState, action) => {
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
    }
    return state;
}