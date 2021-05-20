import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News from "../News/News.js";
import Interest from "../Interest/Interest.js";

import "./Home.css";

const Home = (props) => {
    return (
        <>
            <div className="background">
                <Layout />
                <News />
                <Interest />
            </div>
        </>
    )
}

export default Home;