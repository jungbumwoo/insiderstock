export const returnUtil = (state, cb) => {
    let isToken = localStorage.getItem('token');
    console.log(state);
    if (state.loading) {
        return(
            <tr>
                <th>Loading...</th>
            </tr>
        )
    } else if(!isToken){
        return(
            <tr>
                You need to Sign In
            </tr>
        )
    } else if(state.error === "jwt expired"){
        console.log("jwt error");
        localStorage.removeItem('token');
        return(
            <tr>
                LogIn Token is expired..
            </tr>
        )
    } else if (state.error) {
        return (
            <tr>
                <span>${state.error}</span>
            </tr>
        )
    } else {
        return cb();
    }
};