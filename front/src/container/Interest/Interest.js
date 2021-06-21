import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterestAction } from "../../actions/stockAction";
import { getNotInterestAction, interestDeleteAct } from "../../actions";
// import "./Interest.css";
import { returnUtil } from "../containerUtils";


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
                        <th>{trs.transaction}</th>
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
    
    let isToken = localStorage.getItem('token');

    if (!isToken) {
        console.log("token not exsist");
        return (
            <>
                <div className="need-to-login">
                    <p>로그인이 필요한 서비스 입니다.</p>
                    <a href="/signin">SignIn</a>
                    <a href="/signup">SignUp</a>
                </div>
            </>
        )
    } else {
        console.log("token exsist");
        return(
            <>
                <div>
                    <span>Interest</span>
                    <div className="data_table">
                        <table>
                            <thead>
                                <tr>
                                    <th>종목코드</th>
                                    <th>종목명</th>
                                    <th>거래자</th>
                                    <th>직함</th>
                                    <th>일자</th>
                                    <th>거래유형</th>
                                    <th>Insider Trading Shares</th>
                                    <th>지분변화</th>
                                    <th>매수가</th>
                                    <th>Final Share</th>
                                    <th>매수 후 가격변동률(%)</th>
                                    <th>주가수익률</th>
                                    <th>시가총액($M)</th>
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
                </div>
            </>
        )
    }

}

export default Interest;