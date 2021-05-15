const initState = {
    onboards: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type){
        case "REQUEST_ADD_ONBOARD":
            state = {
                ...state
            }
            break;
        case "SUCCESS_ADD_ONBOARD":
            state = {
                ...state
            }
            break;
        case "FAILED_ADD_ONBOARD":
            state = {
                ...state
            }
            break;
    }
    return state;
}