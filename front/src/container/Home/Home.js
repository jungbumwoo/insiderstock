import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News2 from "../News/News.js";
import Interest from "../Interest/Interest.js";

// import "./Home.css";

const Home = (props) => {
    return (
        <>
            <Layout />
            <News2 location={props.location} />
            {/* <Interest /> */}
        </>
    )
}

export default Home;