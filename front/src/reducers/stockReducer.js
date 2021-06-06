const initState = {
    stocks: null,
    pagedGetInt: { pager: {pages: [1]}, pageOfItems: []},
    loading: false,
    paginatedResult: { pager: {currentPage: 1}},
    error: null
};

const stockReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_ALL_STOCKS_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;
        case "GET_ALL_STOCKS_SUCCESS" :
            state = {
                ...state,
                // stocks: action.payload.stocks,
                paginatedResult: action.payload.paginatedResult,
                loading: false
            }
            break;
        case "GET_ALL_STOCKS_FAILED" :
            state = {
                ...state,
                err: action.payload.error,
                loading: false
            }
            break;
        
        case "GET_INTEREST_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;

        case "GET_INTEREST_SUCCESS" :
            state = {
                ...state,
                loading: false,
                pagedGetInt: action.payload.pagedGetInt

            }
            break;

        case "GET_INTEREST_FAILED" :
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case "ADD_INTEREST_POST_REQUEST" :
            state = {
                ...state,
                loading: true,
            }
            break;

        case "ADD_INTEREST_POST_SUCCESS" :
            state = {
                ...state,
                loading: false,
                interests: [
                    ...state.interests,
                    ...action.payload.added
                ]
            }
            break;

        case "DELETE_INTEREST_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;

        case "DELETE_INTERST_SUCCESS" :
            state = {
                ...state,
                loading: false,
                pagedGetInt: {
                    ...state.pagedGetInt,
                    pageOfItems: action.payload.remainInterest
                }
            }
            break;
            
        case "GET_INTEREST_FAILED":
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        default:
    }
    return state;
}

export default stockReducer;