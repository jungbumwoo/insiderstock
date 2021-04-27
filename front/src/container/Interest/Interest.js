import React, { useEffect, useState } from "react";
import { Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddInterestAction } from "../../actions/stockAction";

const Interest = () => {
    const dispatch = useDispatch();
    const [ newArray, setNewArray ] = useState([]);
    const [ noObj, setNoObj] = useState(null);
    const stockInterest = useSelector(state => state.stock);
    let { interests } = stockInterest;
    let noObjInterests = interests.map((trs) => {
        console.log(trs.priceChangeSIT.$numberDecimal);
        trs.priceChangeSIT = trs.priceChangeSIT.$numberDecimal;
        trs.DividendYield = trs.DividendYield.$numberDecimal;
        trs.PERatio = trs.PERatio.$numberDecimal;
        trs.MarketCap = trs.MarketCap.$numberDecimal;
        return trs;
    })
    
    const checkBoxChange = (e) => {
        console.log(e.target);
        const itemToFind = newArray.find((item) => { return item == parseInt(e.target.id) })
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
    
    useEffect(() => {
        dispatch(getAddInterestAction());
    }, [])

    return(
        <>
            <div className="interestTable">
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ticker</th>
                            <th>Company</th>
                            <th>Current Price</th>
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
                            <th>Dividend Yield %</th>
                            <th>PE Ratio</th>
                            <th>Market Cap ($M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interests ? interests.map((trs) => {
                          console.log(trs);
                          return (
                              <tr>
                                <th><input type="checkbox" id={interests.indexOf(trs)} name="chk" onChange={checkBoxChange} /></th>
                                <th>{trs.ticker}</th>
                                <th>{trs.company}</th>
                                <th>{trs.currentprice}</th>
                                <th>{trs.insiderName}</th>
                                <th>{trs.insiderPosition}</th>
                                <th>{trs.date.split('T')[0]}</th>
                                <th>{trs.buyOrSell}</th>
                                <th>{trs.insiderTradingShares}</th>
                                <th>{trs.sharesChange}</th>
                                <th>{trs.purchasePrice}</th>
                                <th>{trs.cost}</th>
                                <th>{trs.finalShare}</th>
                                <th>{trs.priceChangeSIT.$numberDecimal}</th>
                                <th>{trs[14]}</th>
                                <th>{trs[15]}</th>
                                <th>{trs[16]}</th>
                              </tr>
                          )  
                        }) : undefined}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Interest;