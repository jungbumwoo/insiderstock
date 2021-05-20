
export const returnUtil = (state, cb) => {
    let isToken = localStorage.getItem('token');
    console.log(state);
    if (state.loading) {
        return(
            <div>
                <span>Loading...</span>
            </div>
        )
    } else if(!isToken){
        return(
            <div>
                <span>You need to Sign In</span>
            </div>
        )
    } else if(state.error === "jwt expired"){
        console.log("jwt error");
        localStorage.removeItem('token');
        return(
            <div>
                <span>LogIn Token is expired..</span>
            </div>
        )
    } else if (state.error) {
        return (
            <div>
                <span>${state.error}</span>
            </div>
        )
    } else {
        return cb();
    }
};