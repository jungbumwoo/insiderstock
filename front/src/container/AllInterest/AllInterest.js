import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import Interest2 from "../../container/Interest/Interest2.js";
import NotInterest from "../../container/NotInterest/NotInterest.js";

const AllInterest = (props) => {
    console.log(props);
    return(
        <>
            <Layout />
            <Interest2 location={props.location}/>
            <NotInterest />
        </>
    )
};

export default AllInterest;