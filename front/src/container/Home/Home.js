import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News from "../News/News.js";
import Interest from "../Interest/Interest.js";

import "./Home.css";

const Home = (props) => {
        // News
        // sellalret
        // Saved
        // Interest
    return (
        <>
            <Layout />
            <News />
            <Interest />
        </>
    )
}

const handleSelectAll = () => {
    console.log("select All");
}

export default Home;