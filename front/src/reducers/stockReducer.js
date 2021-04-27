import { categoryConstants } from "../actions/constants.js";

const initState = {
    stocks: [],
    interests: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
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
        case "GET_INTERESET_FAILED" :
            state = {
                ...state,
                loading: true
            }
            break;
    }
    return state;
}



