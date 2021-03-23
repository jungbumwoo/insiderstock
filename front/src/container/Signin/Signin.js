import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts/Layout/Layout.js"
import Redirect from "react-router-dom";

const Signin = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }
    return(
        <>  
            <Layout />
            <button>facebook login</button>
        </>
    )    
}

export default Signin;