import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnboard } from "../../actions/onboardAction.js";
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from "../containerUtils.js";

import "./Onboard.css";

const Onboard = (props) => {
    const onboard = useSelector(state => state.onboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOnboard());
    }, []);
    console.log(onboard);

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
                    <table className="styled-table">
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