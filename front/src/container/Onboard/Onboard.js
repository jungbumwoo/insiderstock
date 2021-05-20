import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnboard } from "../../actions/onboardAction.js";
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from "../containerUtils.js";
import { Redirect, useHistory } from "react-router-dom";

import "./Onboard.css";

const Onboard = (props) => {
    const onboard = useSelector(state => state.onboard);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOnboard());
    }, []);
    console.log(onboard);

    // isLoggedIn(onboard, props, history);

    // if(onboard.error){
    //     console.log("Redirect!!");
    //    return <Redirect to='/' />
    // }
    // if(onboard.loading) {
    //     return (
    //         <>
    //             <div>
    //                 <p>loading..</p>
    //             </div>
    //         </>
    //     )
    // }

    const returnOnboards = () => {
        console.log("returnOnboards");
        let onboardList = onboard.onboards.map((item) => {
            console.log(item);
            return (
                <tr>
                    <td></td>
                    <td>{item.ticker}</td>
                    <td>{item.company}</td>
                    <td>{item.marketCap.$numberDecimal}</td>
                    <td>{item.price.$numberDecimal}</td>
                    <td>{item.shares}</td>
                    <td>{item.cost.$numberDecimal}</td>
                </tr>
            )
        })
        return onboardList;
    };

    return(
        <>
            <Layout />
            <div>
                <div>
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>MarketCap</th>
                                <th>Price</th>
                                <th>Shares</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnUtil(onboard, returnOnboards)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Onboard;