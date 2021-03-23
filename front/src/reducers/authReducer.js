const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

export default (state = initState, action) => {
    switch(action.type) {
        case "AUTH_LOGIN_REQUEST":
            state = {
                ...state,
                authenticating: true
            }
            break;
        case "AUTH_LOGIN_SUCCESS":
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case "AUTH_LOGIN_FIALURE":
            state = {
                ...state,
                error: action.payload.err,
                authenticate: false,
                authenticating: false
            }
            break;
    }
    return state;
}