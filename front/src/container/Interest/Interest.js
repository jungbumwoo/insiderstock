import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddInterestAction } from "../../actions/stockAction";
import { interestDeleteAct } from "../../actions";
import Button from 'react-bootstrap/Button';
import "./Interest.css";
import { returnUtil } from "../containerUtils";

const Interest = () => {
    const dispatch = useDispatch();
    const [ newArray, setNewArray ] = useState([]);
    const [ reload, setReload] = useState(null);
    const stockInterest = useSelector(state => state.stock);
    let { interests } = stockInterest;
    
    const checkBoxChange = (e) => {
        console.log(e.target);
        const itemToFind = newArray.find((item) => { return item === parseInt(e.target.id) })
        console.log(itemToFind);
        // let isexist = newArray.filter((cat) => {
        //     cat.id = e.target.id
        // });
        const idx = newArray.indexOf(itemToFind)
        if (idx > -1) {
            // delete
            newArray.splice(idx, 1)
        } else {
            // add
            newArray.push(parseInt(e.target.id));
        }
        console.log(newArray);
        setNewArray(newArray);
    }
    console.log(newArray);

    const handleDeleteBtn = () => {
        console.log(newArray);
        // reload Component if checkBox Empty
        if(newArray === []){
            console.log("reloadComponent cause newArray Empty!!")
            reloadComponent();
        }

        // remain element
        let wholearray = [];
        for( let i = 0; i < interests.length; i++ ){
            wholearray.push(i);
        };
        let remainArrayNum = wholearray.filter((num) => {
            console.log(num);
            let deleteIndex = newArray.indexOf(num);
            // 여기 값이 달라지네;;;
            //newArray. 항상그대로.
            if (deleteIndex > -1 ) {
                console.log(`num: ${num}, deleteIndx: ${deleteIndex}`)
            }
            return deleteIndex <= -1
        });
        console.log(remainArrayNum);

        let remainArray = remainArrayNum.map((num) => {
            return interests[num];
        });

        let deleteArray = newArray.map((num) => {
            return interests[num];
        });
        console.log(deleteArray);
        console.log(remainArray);
        dispatch(interestDeleteAct(deleteArray, remainArray));
    }
    
    useEffect(() => {
        dispatch(getAddInterestAction());
    }, [])

    const reloadComponent = () => {
        setReload({});
    }

    const returnInterest = () => {
        let result = interests.map((trs) => {
            return (
                    <tr key={interests.indexOf(trs)}>
                        <th><input type="checkbox" id={interests.indexOf(trs)} name="chk" onChange={checkBoxChange} /></th>
                        <th><a href={`https://www.gurufocus.com/stock/${trs.ticker}/insider`} target='_blank' rel="noreferrer">{trs.ticker}</a></th>
                        <th><a href={`https://www.google.com/search?q=${trs.company}`} target='_blank' rel="noreferrer">{trs.company}</a></th>
                        {/* <th>{trs.currentprice}</th> */}
                        <th>{trs.insiderName}</th>
                        <th>{trs.insiderPosition}</th>
                        <th>{trs.date ? trs.date.split('T')[0] : trs.date}</th>
                        <th>{trs.buyOrSell}</th>
                        <th>{trs.insiderTradingShares}</th>
                        <th>{trs.sharesChange}</th>
                        <th>{trs.purchasePrice}</th>
                        <th>{trs.cost ? trs.cost.$numberDecimal : trs.cost}</th>
                        <th>{trs.finalShare}</th>
                        <th>{trs.priceChangeSIT ? trs.priceChangeSIT.$numberDecimal : trs.priceChangeSIT}</th>
                        {/* <th>{trs.DividendYield ? trs.DividendYield.$numberDecimal : trs.DividendYield }</th> */}
                        <th>{trs.PERatio ? trs.PERatio.$numberDecimal : trs.PERatio}</th>
                        <th>{trs.MarketCap ? trs.MarketCap.$numberDecimal : trs.MarketCap}</th>
                    </tr>
                    )
                })
        return result;
    }

    return(
        <>
            <div className="interestContainster">
                <div className="interestTable">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Company</th>
                                {/* <th>Current Price</th> */}
                                <th>Insider Name</th>
                                <th>Insider Position</th>
                                <th>Date</th>
                                <th>Buy/sell</th>
                                <th>Insider Trading Shares</th>
                                <th>Shares Change</th>
                                <th>purchasePrice</th>
                                <th>Cost</th>
                                <th>Final Share</th>
                                <th>Price Change Since Insider Trade (%)</th>
                                {/* <th>Dividend Yield %</th> */}
                                <th>PE Ratio</th>
                                <th>Market Cap ($M)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnUtil(stockInterest, returnInterest)}
                        </tbody>
                    </Table>
                </div>
                <div className="interestBtns">
                    <Button onClick={handleDeleteBtn} variant="dark" size="sm">Delete</Button>
                </div>
            </div>
        </>
    )
}

export default Interest;