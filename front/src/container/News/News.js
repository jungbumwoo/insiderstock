import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";
import { postAddInterestAction, addBanAction, postNotInterestAction, addOnboard, postBanAction } from "../../actions";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Modal from "../../components/Modals/Modal/Modal";

import "./News.css";

const News = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const { pager, pageOfItems } = stock.paginatedResult;
    const [ currentUrl, setCurrentUrl ] = useState(1);
    const [ checkedArray, setCheckedArray ] = useState([]);
    const [ selectAllTF, setSelectAllTF ] = useState(false);
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ checkedOnboard, setCheckedOnboard ] = useState({});
   
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

    const returnItemsByIndex = () => {
        const returnItems = checkedArray.map(item => {
            return pageOfItems[item]
        })
        return returnItems;
    };

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

    const getPageNum = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;

        return urlParams;
    }

    const returnLoadingSpinner = () => {
        if(stock.error == "Login Error at middlewares") {
            let getToken = localStorage.getItem('token');
            if(getToken){
                localStorage.removeItem('token');
                window.location.reload(true);
            }
            return (
                <tr>
                    {stock.error}
                </tr>
            )
        } else if (stock.error) {
            return (
                <tr>
                    {stock.error}
                </tr>
            )
        }
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
        const returnItems = checkedArray.map(item => {
            return pageOfItems[item]
        });
        let onboardObject = {};
        returnItems.forEach((el) => {
            onboardObject[`${returnItems.indexOf(el)}_onboard_ticker`] = el.ticker;
            onboardObject[`${returnItems.indexOf(el)}_onboard_company`] = el.company;
            onboardObject[`${returnItems.indexOf(el)}_onboard_MarketCap`] = el.MarketCap;
            onboardObject[`${returnItems.indexOf(el)}_onboard_price`] = el.purchasePrice;
        });
        setCheckedOnboard(onboardObject);
        setToggleModal(true);
    };

    const handleBanBtn = () => {
        let checkedStock = pageOfItems.filter(item => checkedArray.includes(pageOfItems.indexOf(item)));
        dispatch(addBanAction(checkedStock));
        setCheckedArray([]);
    };

    const onModalInputChange = (e) => {
        const { name, value} = e.target;
        console.log(name, value);
        setCheckedOnboard({
            ...checkedOnboard,
            [name]: value
        });
    };

    const handleModalClose = () => {
        setCheckedArray([]);
        setCheckedOnboard({});
        setToggleModal(false);
    };

    const handleModalSubmit = () => {
        console.log(checkedOnboard);
        dispatch(addOnboard(checkedOnboard));
        handleModalClose();
    };

    const handleTRClick = (e) => {
        console.log(e.target.parentNode.id);
        let intId = parseInt(e.target.parentNode.id);
        let isChecked = checkedArray.includes(intId);
        if(isChecked) {
            //uncheck
            let filtered = checkedArray.filter(el => el !== intId);
            setCheckedArray(filtered);
        } else {
            //check
            setCheckedArray([
                ...checkedArray,
                intId
            ])
        }
    }

    return(
        <div className="newsContainer">
            <table>
                <thead>
                    <tr>
                        <th className="checkbox-hide">#</th>
                        <th>코드</th>
                        <th>종목명</th>
                        <th>거래자</th>
                        <th>직함</th>
                        <th>일자</th>
                        <th>거래유형</th>
                        <th>Insider Trading Shares</th>
                        <th>지분변화</th>
                        <th>매수가</th>
                        <th>비용, k</th>
                        <th>Final Share</th>
                        <th>거래 후 가격변동률(%)</th>
                        <th>주가수익률</th>
                        <th>시가총액($M)</th>
                    </tr>
                </thead>
                <tbody>
                    { stock.paginatedResult.pageOfItems ? stock.paginatedResult.pageOfItems.map(trs => {
                            return (
                                <tr onClick={handleTRClick} className={checkedArray.includes(parseInt(pageOfItems.indexOf(trs))) ? 'checked-tr' : 'unchecked-tr'} id={parseInt(pageOfItems.indexOf(trs))} key={pageOfItems.indexOf(trs)}>
                                    <td className="checkbox-hide"><input type="checkbox" onChange={checkBoxChange} id={parseInt(pageOfItems.indexOf(trs))} checked={checkedArray.includes(pageOfItems.indexOf(trs))} name="chk" /></td>
                                    <td><a href={`https://www.gurufocus.com/stock/${trs.ticker}/insider`} target='_blank' rel="noreferrer">{trs.ticker}</a></td>
                                    <td><a href={`https://www.google.com/search?q=${trs.company}`} target='_blank' rel="noreferrer">{trs.company}</a></td>
                                    {/* <th>{trs.currentprice}</th> */}
                                    <td>{trs.insiderName}</td>
                                    <td>{trs.insiderPosition ? trs.insiderPosition : '-'}</td>
                                    <td>{trs.date.slice(0,10)}</td>
                                    <td>{trs.transaction}</td>
                                    <td>{trs.insiderTradingShares}</td>
                                    <td>{trs.sharesChange}</td>
                                    <td>{trs.purchasePrice}</td>
                                    <td>{trs.cost}</td>
                                    <td>{trs.finalShare}</td>
                                    <td>{trs.priceChangeSIT}</td>
                                    {/* <th>{trs.DividendYield}</th> */}
                                    <td>{trs.PERatio}</td>
                                    <td>{trs.MarketCap}</td>
                                </tr>
                            )
                        }) : returnLoadingSpinner()
                    }
                </tbody>
            </table>

            <div className="buttons">
                <button onClick={handleAllClick} className="checkbox-hide">Select All</button>
                <button onClick={addInterestBtn}>Interest</button>
                <button onClick={handleNotIntBtn}>NotInterest</button>
                <button onClick={addOnboardBtn}>Onboard</button>
                <button onClick={handleBanBtn}>7일간 제외</button>
            </div>

            <div className="pageNum">
                <ul>
                    <li className={ `${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={{search: `?page=1`}} onClick={pageChange}>&laquo;</Link>
                    </li> 
                    <li className={ `${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={{search: `?page=${pager.currentPage - 1}`}} onClick={pageChange}>&lt;</Link>
                    </li>
                    {pageOfItems ? pager.pages.map(num => {
                        return (
                            <li key={num}>
                                <Link to={{search: `?page=${num}`}} onClick={pageChange} className={(num === getPageNum() ? 'active-pagenum' : 'pagenum')}>{num}</Link>
                            </li>
                        )
                    }) : <span>Pager undefined at News</span>}
                    <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <Link to={{search: `?page=${pager.currentPage + 1}`}} onClick={pageChange}>&gt;</Link>
                    </li>
                    <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <Link to={{search: `?page=${pager.totalPages}`}} onClick={pageChange}>&raquo;</Link>
                    </li>
                </ul>
            </div>
            
            <Modal 
                shown={toggleModal}
                onCloseRequest={handleModalClose}
                checked={returnItemsByIndex()}
                onModalInputChange={onModalInputChange}
                handleModalSubmit={handleModalSubmit}
                />
    </div>
    )
}

export default News;
