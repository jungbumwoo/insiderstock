const initState = {
    notinterests: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case "":
            state = {
                ...state,
            }
            break;
    }
    return state;
}