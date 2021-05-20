const initState = {
    saved: [],
    interest: [],
    loading: false,
    error: null
};

const savedReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVE_STOCK_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;
        case "SAVE_STOCK_SUCCESS" :
            state = {
                ...state,
                saved: action.payload.stocks,
                loading: false
            }
            break;
        case "SAVE_STOCK_FAILED" :
            state = {
                ...state,
                err: action.payload.error,
                loading: false
            }
            break;
        default:
    }
    return state;
}

export default savedReducer;