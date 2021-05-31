import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";
import { postAddInterestAction, remainAction, postNotInterestAction, addOnboard, postBanAction } from "../../actions";
import { Link } from "react-router-dom";
import Modal from "../../components/Modals/Modal/Modal.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';

import "./News.css";

const News2_pagination = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    // const { pager, pageOfItems } = stock.paginatedResult;
    const [ newArray, setNewArray] = useState([]);
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ modalInputs, setModalInputs ] = useState({});
    
    useEffect(()=> {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;

        console.log(urlParams, stock.paginatedResult.pager.currentPage);
        if(urlParams !== stock.paginatedResult.pager.currentPage){
            console.log("useEffect!!");
            dispatch(getAllStock(urlParams));
        }
    });

    useEffect(()=> {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        console.log(urlParams, stock.paginatedResult.pager.currentPage);
        if(urlParams === 1 && stock.paginatedResult.pager.currentPage === 1){
            dispatch(getAllStock(urlParams));
        }
    }, []);

    const checkBoxChange = (e) => {
        const itemToFind = newArray.find((item) => { return item === parseInt(e.target.id) })
        const idx = newArray.indexOf(itemToFind)
        if (idx > -1) {
            // delete
            newArray.splice(idx, 1) 
        } else {
            // add
            newArray.push(parseInt(e.target.id));
        }
        setNewArray(newArray);
    }
    
    if (!stock.loading) {
        return (
            <>
                <div className="newsContainer">
                    <table>
                        <thead>
                            <tr>
                            <th></th>
                                    <th>Ticker</th>
                                    <th>Company</th>
                                    <th>Insider Name</th>
                                    <th>Insider Position</th>
                                    <th>Date</th>
                                    <th>Buy/sell</th>
                                    <th>Insider Trading Shares</th>
                                    <th>Shares Change</th>
                                    <th>purchasePrice</th>
                                    <th>Cost, k</th>
                                    <th>Final Share</th>
                                    <th>Price Change Since Insider Trade (%)</th>
                                    <th>PE Ratio</th>
                                    <th>Market Cap ($M)</th>
                            </tr>
                        </thead>
                        <tbody>
                            { stock.paginatedResult.pageOfItems ? stock.paginatedResult.pageOfItems.map(trs => {
                                    return (
                                        <tr key={stock.paginatedResult.pageOfItems.indexOf(trs)}>
                                            <th><input type="checkbox" id={stock.paginatedResult.pageOfItems.indexOf(trs)} name="chk" /></th>
                                            <th><a href={`https://www.gurufocus.com/stock/${trs.ticker}/insider`} target='_blank' rel="noreferrer">{trs.ticker}</a></th>
                                            <th><a href={`https://www.google.com/search?q=${trs.company}`} target='_blank' rel="noreferrer">{trs.company}</a></th>
                                            {/* <th>{trs.currentprice}</th> */}
                                            <th>{trs.insiderName}</th>
                                            <th>{trs.insiderPosition}</th>
                                            <th>{trs.date}</th>
                                            <th>{trs.transcation}</th>
                                            <th>{trs.insiderTradingShares}</th>
                                            <th>{trs.sharesChange}</th>
                                            <th>{trs.purchasePrice}</th>
                                            <th>{trs.cost}</th>
                                            <th>{trs.finalShare}</th>
                                            <th>{trs.priceChangeSIT}</th>
                                            {/* <th>{trs.DividendYield}</th> */}
                                            <th>{trs.PERatio}</th>
                                            <th>{trs.MarketCap}</th>                                        
                                        </tr>
                                    )
                                }) : ''
                            }
                        </tbody>
                    </table>
                    <div className="pageNum">
                        {stock.paginatedResult.pageOfItems ? stock.paginatedResult.pager.pages.map(num => {
                            return (
                                <span>
                                    <Link to={{search: `?page=${num}`}}>{num}</Link>
                                </span>
                            )
                        }) : <span>Pager undefined at News2_pagination</span>}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <tr>
                <Spinner animation="border" variant="primary" />
            </tr>
        )
    }
}

export default News2_pagination;
