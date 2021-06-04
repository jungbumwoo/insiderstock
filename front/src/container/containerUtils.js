export const returnUtil = (state, cb) => {
    let isToken = localStorage.getItem('token');
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
    } else if(state.error === "Login Error at middlewares"){
        console.log("jwt error");
        localStorage.removeItem('token');
        return(
            <tr>
                LogIn Token is expired..
            </tr>
        )
    } else if (state.error) {
        console.log("state error!!");
        console.log(state.error);
        return (
            <tr>
                <span>${state.error.toString()}</span>
            </tr>
        )
    } else {
        return cb();
    }
};