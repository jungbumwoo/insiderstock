const initialState = {
    onboards: [],
    pagedOnboard: {
        pager: { pages: [1]},
        pageOfItems: []
    },
    loading: false,
    error: null
};

const onboardReducer = (state = initialState, action) => {
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
                pagedOnboard : action.payload.pagedOnboard
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