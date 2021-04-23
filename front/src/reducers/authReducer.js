const initState = {
    token: undefined,
    // What is the difference between localStorage and Reducer store token ?
    user: {
        username: null,
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
                authenticating: true,
                loading: true
            }
            break;
        case "FACEBOOK_LOGIN_SUCCESS":
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                loading: false
            }
            break;
        case "FACEBOOK_LOGIN_FAILURE":
            state = {
                ...state,
                error: action.payload.err,
                authenticate: false,
                authenticating: false,
                loading: false
            }
            break;
        case "COOKIE_DATA_SUCCESS":
            state = {
                ...state,
                cookieusername: action.payload.name,
                authenticating: true,
                authenticate: false
            }
            break;
        case "SIGNOUT_REQUEST":
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case "SIGNOUT_SUCCESS": 
            state = {
                token: undefined,
                user: {
                    username: '',
                    email: '',
                    picture: ''
                },
                authenticate: false,
                authenticating: false,
                loading: false,
                error: null,
                message: ''
            }
            break;
        case "SIGNOUT_FAILURE":
            state = {
                ...state,
                authenticating: false,
                loading: false
            }
            break;
        case "LOCALSTOREAGE_DATA":
            state = {
                ...state,
                authenticating: false,
                authenticate: true,
                loading: false,
                token: action.payload.token
            }
            break;
        case "POST_KAKAO_USER_REQUEST":
            state = {
                ...state,
                authenticating: true,
                authenticate: false,
                loading: true,
            }
            break;
        case "POST_KAKAOUSER_SUCCESS":
            state = {
                ...state,
                authenticate: true,
                authenticating: false,
                loading: false,
                user: {
                    username: action.payload.nickname,
                    picture: action.payload.profileImg110
                }
            }
            break;
        case "POST_KAKAO_SIGNUP_REQUEST":
            state = {
                ...state,
                authenticate: false,
                authenticating: true,
                loading: true,
            }
            break;
        case "POST_KAKAO_SIGNUP_SUCCESS":
            state = {
                ...state,
                authenticate: true,
                authenticating: false,
                loading: false,
                token: action.payload.access_token,
                user: {
                    username: action.payload.nickname,
                    picture: action.payload.profileImg110
                }
            }
            break;
        }
    return state;
}