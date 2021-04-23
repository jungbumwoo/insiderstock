import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { localStorageData, signout } from "../../actions";

const Signout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isToken = localStorage.getItem('token');

    useEffect(() => {
        localStorage.removeItem('token');
        dispatch(signout());
        history.push("/");
    })

    return(
        <>
            <div>Loading to SignOut.. see you later</div>
        </>
    )
}

export default Signout;