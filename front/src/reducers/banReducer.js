const initState = {
    loading: false,
    bans: { pager : { pages : [1]}, pageOfItems : []},
    error: null
};

const banReducer = (state = initState, action) => {
    switch(action.type) {
        case "GET_BAN_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;
        case "GET_BAN_SUCCESS" :
            state = {
                ...state,
                loading: false,
                bans: action.payload.data
            }
            break;
        case "GET_BAN_FAILED" :
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case "ADD_BAN_REQUEST" :
            state = {
                ...state,
            }
            break;
        case "ADD_BAN_SUCCESS" :
            state = {
                ...state,
            }
            break;
        case "ADD_BAN_FAILED" :
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        case "REQUEST_DELETE_BAN" :
            state = {
                ...state,
                loading: true
            }
            break;
        case "SUCCESS_DELETE_BAN" :
            state = {
                ...state,
                loading: false
            }
            break;
        case "FAILED_DELETE_BAN" :
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

export default banReducer;