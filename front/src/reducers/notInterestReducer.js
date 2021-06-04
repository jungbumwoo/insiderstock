const initState = {
    notinterests: [],
    pagedNotInt: {
        pager: {pages: [1]},
        pageOfItems: []
    },
    loading: false,
    error: null
};

const notInterestReducer = (state = initState, action) => {
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
                loading: false,
                pagedNotInt: action.payload.pagedNotInt
            }
            break;
        case "GET_NOTINTEREST_FAILED":
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case "ADD_NOTINTEREST_POST_REQUEST":
            state = {
                ...state,
                loading: true
            }
            break;
        case "ADD_NOTINTEREST_POST_SUCCESS":
            state = {
                ...state,
                loading: false
            }
            break;
        case "ADD_NOTINTEREST_POST_FAILED":
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
                pagedNotInt: {
                    ...state.pagedNotInt,
                    pageOfItems : action.payload.remainArray
                }
            }
            break;
        case "DELETE_NOT_INTERST_FAILED":
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

export default notInterestReducer;