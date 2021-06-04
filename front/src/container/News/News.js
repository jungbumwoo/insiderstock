import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";
import { postAddInterestAction, remainAction, postNotInterestAction, addOnboard, postBanAction } from "../../actions";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import "./News.css";

const News = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const { pager, pageOfItems } = stock.paginatedResult;
    const [ currentUrl, setCurrentUrl ] = useState('');
    const [ checkedArray, setCheckedArray ] = useState([]);
    const [ selectAllTF, setSelectAllTF ] = useState(false);
   
    useEffect(()=> {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
            // When Page Change
            if(urlParams !== stock.paginatedResult.pager.currentPage){
                console.log("urlParams !== stock.paginatedResult.pager.currentPage");
                dispatch(getAllStock(urlParams));
            } else if (urlParams === 1 && stock.paginatedResult.pager.currentPage === 1) {
                // When first page was loaded.
                console.log("urlParams === 1 && stock.paginatedResult.pager.currentPage === 1")
                dispatch(getAllStock(urlParams));    
            }
            // setCurrentUrl(stock.paginatedResult.pager.currentPage);
    }, [currentUrl]);


    const checkBoxChange = (e) => {
        let intId = parseInt(e.target.id);
        if(e.target.checked === true) {
            // true (checked)
            setCheckedArray([
                ...checkedArray, intId
            ])
        } else {
            let filtered = checkedArray.filter(num => (num !== intId))
            setCheckedArray(filtered);
        }
    }

    const handleAllClick = () => {
        if(selectAllTF) {
            // true => false
            setCheckedArray([]);
        } else {
            let allId = pageOfItems.map(item => (pageOfItems.indexOf(item)));
            setCheckedArray(allId);
        }
        setSelectAllTF(!selectAllTF);
    };

    const pageChange = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        setCurrentUrl(urlParams);
        setCheckedArray([]);
    }

    const returnLoadingSpinner = () => {
        return (
            <tr>
                <Spinner animation="border" variant="primary" />
            </tr>
        )
    };

    const addInterestBtn = () => {
        let checkedStock = pageOfItems.filter(item => checkedArray.includes(pageOfItems.indexOf(item)));
        dispatch(postAddInterestAction(checkedStock));
        setCheckedArray([]);
    };

    const handleNotIntBtn = () => {
        let checkedStock = pageOfItems.filter(item => checkedArray.includes(pageOfItems.indexOf(item)));
        dispatch(postNotInterestAction(checkedStock));
        setCheckedArray([]);
    };

    const addOnboardBtn = () => {
        let checkedStock = pageOfItems.filter(item => checkedArray.includes(pageOfItems.indexOf(item)));
        dispatch(addOnboard(checkedStock));
        setCheckedArray([]);
        // dispatch(getAllStock(pager.currentPage));
    };

    const handleAfterSumbit = () => {

    };

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
                                    <th><input type="checkbox" onChange={checkBoxChange} id={parseInt(pageOfItems.indexOf(trs))} checked={checkedArray.includes(pageOfItems.indexOf(trs))} name="chk" /></th>
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
                        <span key={num}>
                            <Link to={{search: `?page=${num}`}} onClick={pageChange}>{num}</Link>
                        </span>
                    )
                }) : <span>Pager undefined at News</span>}
                <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                    <Link to={{search: `?page=${pager.currentPage + 1}`}} onClick={pageChange}>Next</Link>
                </li>
                <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                    <Link to={{search: `?page=${pager.totalPages}`}} onClick={pageChange}>End</Link>
                </li>
            </div>
            <div className="buttons">
                <button onClick={handleAllClick}>Select All</button>
                <button onClick={addInterestBtn}>Interest</button>
                <button onClick={handleNotIntBtn}>NotInterest</button>
                <button onClick={addOnboardBtn}>Onboard</button>
                <button>7일간 제외</button>
            </div>
    </div>
    )
}

export default News;
