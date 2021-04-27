import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock, savestock } from "../../actions/stockAction";
import { postAddInterestAction } from "../../actions";
import Table from "react-bootstrap/Table";
import Layout from "../../components/Layouts/Layout/Layout.js";
import Button from 'react-bootstrap/Button';

import "./News.css";

const News = (props) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const stock = useSelector(state => state.stock);
    const [ newArray, setNewArray] = useState([]);
    console.log(newArray);
    const [ checkedArray, setCheckedArray ] = useState([]);
    let checkboxArray = [];
    let maplist = () => {
        console.log("maplist Func executed. to get the list");
        stock.stocks.map((trs) => {
            checkboxArray.push({
                id: trs[0],
                checked
            })
        })
        return checkboxArray;
    } 
    const [checkArray, setCheckArray] = useState(maplist());

    useEffect(()=> {
        dispatch(getAllStock());
    }, [])

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

    const handleSaveBtn = () => {
        console.log("Save btn clicked.");
        console.log(newArray);
        let mapedArray = newArray.map((item) => {
            return stock.stocks[item];
        })
        console.log(mapedArray);

        // if it's empty
        dispatch(savestock(mapedArray));
        handleBtnSubmit();
        setNewArray([]);
    }

    const handleSelectAll = () => {
        let ele = document.getElementsByName("chk");
        console.log(ele);
        for (let i = 0; i <ele.length; i++){
            if(ele[i].checked == false){
                ele[i].checked = true;
                if(!newArray.includes(i)){
                    newArray.push(i)
                }
            } else {
                ele[i].checked = false;
                if(newArray.includes( i)){
                    newArray.splice(newArray.indexOf(i), 1);
                }
            }
        }
        setNewArray(newArray);
    }
    
    const handleInterestBtn = () => {
        let getDataFromCheckedId = newArray.map((num) => {
            return stock.stocks[num]
        })
        dispatch(postAddInterestAction(getDataFromCheckedId));
    };

    const handleNotInterestBtn = () => {
        console.log("handlenotinterestbtn");
    }

    const handleOnboardBtn = () => {
        console.log("handleOnboard");
    }

    const handleBtnSubmit = () => {
        console.log(stock.stocks);
        let fullIndex = [];
            for(let i = 0; i< stock.stocks.length; i++){
                fullIndex.push(i);    
            }
        let toGetNewIndex = newArray.map((id) => {
            console.log(id);
            let isExist = fullIndex.indexOf(id);
            console.log(isExist);
            if (isExist > -1 ) {
                fullIndex.splice(isExist, 1);
            } 
            // return stock.stocks[id];
            // let filterd = stock.stocks.filter(item => {
            //     console.log(stock.stocks.indexOf(item));
            //     return stock.stocks.indexOf(item) !== id
            // })
            // console.log(filterd);
            // return filterd;
        });
        console.log(fullIndex);
        let revisedStocks = fullIndex.map((index) => {
            return stock.stocks[index];
        })
        console.log(revisedStocks);
        setNewArray([]);
    }

    if (!stock.loading) {
        return (
            <>
                <div className="container">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>CurrentPrice</th>
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
                        {stock.stocks.map((trs) => {
                            return (
                                <tr key={trs[0] + trs[11] + trs[12] + Math.random()}>
                                    <th><input type="checkbox" id={stock.stocks.indexOf(trs)} name="chk" onChange={checkBoxChange} /></th>
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
                    <div>
                        <Button onClick={handleSelectAll} variant="primary" size="sm">
                            Select All
                        </Button>{' '}
                        <Button onClick={handleSaveBtn} variant="success" size="sm">
                            Save
                        </Button>
                        <Button onClick={handleInterestBtn} variant="primary" size="sm">
                            Interest
                        </Button>
                        <Button onClick={handleNotInterestBtn} variant="warning" size="sm">
                            Not Interest
                        </Button>
                        <Button onClick={handleOnboardBtn} variant="success" size="sm">
                            Onboard
                        </Button>
                        </div>
                </div>
                <div>
                    Eggs
                </div>
                <div>
                    interest
                </div>
            </>
        )
    } else {
        return (
            <div>Loading..</div>
        )
    }
}

const handleSelectAll = () => {
    console.log("select All");
}

export default News;