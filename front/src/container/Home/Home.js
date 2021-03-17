import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";
import Table from "react-bootstrap/Table";

import "./Home.css";

const Home = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    useEffect(()=> {
        dispatch(getAllStock());
    }, [])
    if (!stock.loading) {
        return (
            // <div>{stock.stocks}</div>
            <div class="container">
                <Table responsive="xl">
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Insider Name</th>
                            <th>Insider Position</th>
                            <th>Date</th>
                            <th>Buy/sell</th>
                            <th>Insider Trading Shares</th>
                            <th>Shares Change</th>
                            <th>Price</th>
                            <th>Cost</th>
                            <th>Final Share</th>
                            <th>Price Change Since Insider Trade (%)</th>
                            <th>Dividend Yield %</th>
                            <th>PE Ratio</th>
                            <th>Market Cap ($M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.stocks.map((trs) => {
                            return (
                                <tr key={trs[0] + trs[11] + trs[12] + Math.random()}>
                                    <th>{trs[0]}</th>
                                    <th>{trs[2]}</th>
                                    <th>{trs[3]}</th>
                                    <th>{trs[4]}</th>
                                    <th>{trs[5]}</th>
                                    <th>{trs[6]}</th>
                                    <th>{trs[7]}</th>
                                    <th>{trs[8]}</th>
                                    <th>{trs[9]}</th>
                                    <th>{trs[10]}</th>
                                    <th>{trs[11]}</th>
                                    <th>{trs[12]}</th>
                                    <th>{trs[13]}</th>
                                    <th>{trs[14]}</th>
                                    <th>{trs[15]}</th>
                                    <th>{trs[16]}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    } else {
        return (
            <div>Loading..</div>
        )
    }
}

export default Home;