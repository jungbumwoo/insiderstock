import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import Interest from "../../container/Interest/Interest.js";
import NotInterest from "../../container/NotInterest/NotInterest.js";

const AllInterest = (props) => {
    return(
        <>
            <Layout />
            <Interest />
            <NotInterest />
        </>
    )
};

export default AllInterest;