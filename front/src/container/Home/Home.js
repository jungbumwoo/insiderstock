import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News2_pagination from "../News/News2_pagination.js";
import MyCheckBox from "../CheckBox/MyCheckBox.js";
import Interest from "../Interest/Interest.js";

import "./Home.css";

const Home = (props) => {
    return (
        <>
            <div className="background">
                <Layout />
                <News2_pagination location={props.location} />
                <MyCheckBox />
                {/* <Interest /> */}
            </div>
        </>
    )
}

export default Home;