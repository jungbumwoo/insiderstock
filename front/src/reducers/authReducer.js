const initState = {
    token: undefined,
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
        case "SEND_TOKEN_REQUEST": 
            state = {
                ...state,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                main: "muyaho"
            }
            break;
        case "FACEBOOK_LOGIN_REQUEST":
            state = {
                ...state,
                authenticating: true
            }
            break;
        case "FACEBOOK_LOGIN_SUCCESS":
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case "FACEBOOK_LOGIN_FAILURE":
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