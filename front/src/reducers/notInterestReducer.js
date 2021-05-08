const initState = {
    notinterests: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case "GET_NOTINTEREST_REQUEST":
            state = {
                ...state,
                loading: true,
            }
            break;
        case "GET_NOTINTEREST_SUCCESS":
            state = {
                ...state,
                loading: false.valueOf,
                notinterests: action.payload.notInterests
            }
            break;
        case "GET_NOTINTEREST_FAILED":
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case "DELETE_NOT_INTEREST_REQUEST":
            state = {
                ...state,
                loading: true,
            }
            break;
        case "DELETE_NOT_INTERST_SUCCESS":
            state = {
                ...state,
                loading: false,
                notinterests: action.payload.interestData
            }
            break;
        case "DELETE_NOT_INTERST_FAILED":
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}