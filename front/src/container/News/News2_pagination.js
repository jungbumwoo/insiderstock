import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";
import { postAddInterestAction, remainAction, postNotInterestAction, addOnboard, postBanAction } from "../../actions";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import "./News.css";

const News2_pagination = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const { pager, pageOfItems } = stock.paginatedResult;
    const [ newArray, setNewArray] = useState([]);
    const [ currentUrl, setCurrentUrl ] = useState(1);
   
    useEffect(()=> {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
            if(urlParams !== stock.paginatedResult.pager.currentPage){
                dispatch(getAllStock(urlParams));
            }
            // setCurrentUrl(stock.paginatedResult.pager.currentPage);
    }, [dispatch, currentUrl]);

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

    const pageChange = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        setCurrentUrl(urlParams);
    }

    const returnLoadingSpinner = () => {
        console.log("LoadingSpinner")
        return (
            <tr>
                <Spinner animation="border" variant="primary" />
            </tr>
        )
    };

    console.log(currentUrl);
    console.log(pager, pageOfItems);

    return(
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
                                }) : returnLoadingSpinner()
                            }
                        </tbody>
                    </table>
                    <div className="pageNum">
                        <li className={ `${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{search: `?page=1`}} onClick={pageChange}>First</Link>
                        </li>
                        <li className={ `${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{search: `?page=${pager.currentPage - 1}`}} onClick={pageChange}>Previous</Link>
                        </li>
                        {stock.paginatedResult.pageOfItems ? stock.paginatedResult.pager.pages.map(num => {
                            return (
                                <span>
                                    <Link to={{search: `?page=${num}`}} onClick={pageChange}>{num}</Link>
                                </span>
                            )
                        }) : <span>Pager undefined at News2_pagination</span>}
                        <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{search: `?page=${pager.currentPage + 1}`}} onClick={pageChange}>Next</Link>
                        </li>
                        <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{search: `?page=${pager.totalPages}`}} onClick={pageChange}>End</Link>
                        </li>
                    </div>
                    <div className="buttons">
                        <button>Select All</button>
                        <button>Delete</button>
                        <button>Interest</button>
                        <button>Onboard</button>
                        <button>7일간 제외</button>
                    </div>
    </div>
    )
}

export default News2_pagination;
