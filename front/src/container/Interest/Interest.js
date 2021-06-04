import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInterestAction } from "../../actions/stockAction";
import { getNotInterestAction, interestDeleteAct } from "../../actions";
import "./Interest.css";
import { returnUtil } from "../containerUtils";
import axiosInstance from "../../helpers/axios";

const Interest = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const { pager, pageOfItems } = stock.pagedGetInt;
    const [ curntUrl, setCurntUrl ] = useState(1);
    const [ checkedArray, setCheckedArray ] = useState([]);
    
    useEffect(() => {
        console.log(curntUrl);
        dispatch(getInterestAction(curntUrl));
    }, [curntUrl]);

    // const loadData = async() => {
    //     if(curntUrl !== pager.currentPage){
    //         console.log("fetch!!");
    //         let res = await axiosInstance.get(`/addinterest?page=${curntUrl}`);
    //         // fetch(`http://localhost:2000/api/addinterest`, { method: 'GET', })
    //         // // fetch(`http://localhost:2000/api/addinterest?page=${page}`, { method: 'GET'})
    //         // .then(response => response.json())
    //         // .then((data) => {
    //         //     console.log(data);
    //         //     let { pager, pageOfItem } = data.paginatedResult;
    //         //     setPager(pager);
    //         //     setPageOfItems(pageOfItem);
    //         // })
    //         if(res.status === 200){
    //             let newPager = res.data.pagedResult.pager;
    //             let newPageOfItems = res.data.pagedResult.pager;
    //             if (newPager != pager || newPageOfItems != pageOfItems ) {
    //                 console.log("update pager, pageOfItems");
    //                 console.log(pager);
    //                 console.log(newPager);
    //                 setPageOfItems(newPageOfItems);
    //                 setPager(newPager);
    //             }   
    //         }
    //     }
    // }
    const handlePageClick = (e) => {
        let targetNum = e.target.innerHTML;
        setCurntUrl(parseInt(targetNum));
        setCheckedArray([]);
    }; 

    const returnPages = () => {
        let pageReturn = pager.pages.map(el => {
            return (
                <li onClick={handlePageClick}>
                    <span>{el}</span>        
                </li>
            )
        });
        return pageReturn;
    };

    const checkBoxChange = (e) => {
        let intId = parseInt(e.target.id);
        if(!e.target.checked){
            // uncheck, remove
            let filtered = checkedArray.filter(el => (el !== intId))
            setCheckedArray(filtered);
        } else {
            // check, insert 
            setCheckedArray([...checkedArray, intId]);
        }
    };

    const returnPageOfItems = () => {
        let result = pageOfItems.map(trs => {
            return (
                <tr>
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
                        <th>{trs.finalShare}</th>
                        <th>{trs.priceChangeSIT}</th>
                        {/* <th>{trs.DividendYield}</th> */}
                        <th>{trs.PERatio}</th>
                        <th>{trs.MarketCap}</th>
                </tr>
            )
        })
        return result;
    };

    const hadnleDeleteBtn = () => {
        let wholeArrayNum = [];
        for(let i = 0; i < pageOfItems.length; i++){
            wholeArrayNum.push(i);
        }

        let remainArrayNum = wholeArrayNum.filter(el => {
            return !checkedArray.includes(el);
        });

        let remainItems = pageOfItems.filter(item => remainArrayNum.includes(pageOfItems.indexOf(item)));

        let deleteItems = pageOfItems.filter(item => (checkedArray.includes(pageOfItems.indexOf(item))));
        
        dispatch(interestDeleteAct(deleteItems, remainItems));
        setCheckedArray([]);
    };

    return(
        <>
            <div>
                <span>Interest</span>
                <div className="data_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>Insider Name</th>
                                <th>Insider Position</th>
                                <th>Date</th>
                                <th>Buy/sell</th>
                                <th>Insider Trading Shares</th>
                                <th>Shares Change</th>
                                <th>purchasePrice</th>
                                <th>Final Share</th>
                                <th>Price Change Since Insider Trade (%)</th>
                                <th>PE Ratio</th>
                                <th>Market Cap ($M)</th>
                            </tr>  
                        </thead>
                        <tbody>
                            {/* {pageOfItems.length > 0 ? returnPageOfItems() : ''} */}
                            {returnUtil(stock, returnPageOfItems)}
                        </tbody>
                    </table>
                </div>

                <div className="page_buttons">
                    <ul>{returnPages()}</ul>
                </div>

                <div className="buttons">
                    <button onClick={hadnleDeleteBtn}>Delete</button>
                </div>


                {/* {pager.pages && pager.pages.length &&
                    <ul className="pagination">
                        <li className={`page-item fist-item ${pager.currentPage ===1 ? 'disabled' : ''}`}>
                            <Link to={{search: `?page=1`}}></Link>
                        </li>
                        {pager.pages.map(page =>
                            <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                <Link to={{ search: `?page=${page}`}} className="page-link">{page}</Link>
                            </li>    
                        )}
                    </ul>
                    
                } */}
            </div>
        </>
    )
}

export default Interest;