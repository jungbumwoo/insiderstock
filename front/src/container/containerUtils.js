import './containerUtils.css';

export const returnUtil = (state, cb) => {
    let isToken = localStorage.getItem('token');
    if (state.loading) {
        return(
            <tr className="loading">
                <th>Loading...</th>
            </tr>
        )
    } else if(!isToken){
        return(
            <tr className="signin">
                로그인이 필요한 항목입니다.
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