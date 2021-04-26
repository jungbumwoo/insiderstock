import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News from "../News/News.js";
import Saved from "../Saved/Saved.js";
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
            <Saved />
        </>
    )
}

const handleSelectAll = () => {
    console.log("select All");
}

export default Home;