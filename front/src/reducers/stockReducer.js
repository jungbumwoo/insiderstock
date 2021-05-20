const initState = {
    stocks: null,
    interests: [],
    loading: false,
    error: null
};

const stockReducer = (state = initState, action) => {
    switch (action.type) {
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
        case "GET_ALL_STOCKS_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;
        case "GET_ALL_STOCKS_SUCCESS" :
            state = {
                ...state,
                stocks: action.payload.stocks,
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
        case "REVISED_STOCKS_SUCCESS" :
            state = {
                ...state,
                err: action.payload.error,
                stocks: action.payload.stocks
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
                interests: action.payload.interested
            }
            break;
        case "GET_INTEREST_FAILED" :
            state = {
                ...state,
                loading: false,
                error: action.payload.error
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
                interests: action.payload.interestData
            }
            break;
        case "REMAIN_ARRAY" :
            state = {
                ...state,
                stocks: action.payload.remainData
            }
            break;
        case "GET_INTEREST_FAILED":
            state = {
                ...state,
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
    }
    return state;
}

export default stockReducer;