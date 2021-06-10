import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News2 from "../News/News.js";
import MyCheckBox from "../CheckBox/MyCheckBox.js";
import CheckBoxRef1 from "../CheckBox/CheckBoxRef1/CheckBoxRef1.js";
import Interest from "../Interest/Interest.js";

// import "./Home.css";

const Home = (props) => {
    return (
        <>
            <div className="background">
                <Layout />
                <News2 location={props.location} />
                <Interest />
                {/* <MyCheckBox /> */}
                {/* <CheckBoxRef1 /> */}
            </div>
        </>
    )
}

export default Home;