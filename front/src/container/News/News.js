import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock, savestock } from "../../actions/stockAction";
import { postAddInterestAction, remainAction, postNotInterestAction } from "../../actions";
import Modal from "../../components/Modals/Modal/Modal.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../../components/Layouts/Layout/Layout.js";
import Button from 'react-bootstrap/Button';

import "./News.css";

const News = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const [checked, setChecked] = useState(false);
    const [ newArray, setNewArray] = useState([]);
    const [ checkedArray, setCheckedArray ] = useState([]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    let checkboxArray = [];

    useEffect(()=> {
        if(!stock.stocks) {
            dispatch(getAllStock());
        }
    }, []);

    const onModalCloseRequest = () => {
        console.log("onModalCloseRequest");
        setIsModalOpen(false);
    };

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
        });
        let typeChangedArray = reduceArray(getDataFromCheckedId);
        dispatch(postAddInterestAction(typeChangedArray));
        handleBtnSubmit();
    };

    const handleNotInterestBtn = () => {
        let getDataFromCheckedId = newArray.map((num) => {
            return stock.stocks[num]
        });
        let typeChangedArray = reduceArray(getDataFromCheckedId);

        dispatch(postNotInterestAction(typeChangedArray));
        handleBtnSubmit();
    }

    const handleBtnSubmit = () => {
        let fullIndex = [];
            for(let i = 0; i< stock.stocks.length; i++){
                fullIndex.push(i);    
            }
        newArray.forEach((num) => {
            let deleteIndex = fullIndex.indexOf(num);
            fullIndex.splice(deleteIndex, 1);
        });
        console.log(fullIndex);

        let remainArray = fullIndex.map((num) => {
            return stock.stocks[num];
        });
        
        dispatch(remainAction(remainArray));
        setNewArray([]);
    }

    const reduceArray = (arrayData) => {
        let reduceArrayType = arrayData.reduce((acc, item) => {
            acc.push({
                ticker: item[0],
                company: item[2],
                currentprice: parseFloat(item[3].replace(/\$/g, '')),
                insiderName: item[4],
                insiderPosition: item[5],
                date: item[6],
                buyOrSell: item[7],
                insiderTradingShares: parseFloat(item[8].replace(/\,/, '')),
                sharesChange: parseFloat(item[9].replace(/\%/g, '')),
                purchasePrice: parseFloat(item[10].replace(/\$/g, '')),
                cost: parseFloat(item[11].replace(/\$|\,/g, '')),
                finalShare: parseInt(item[12].replace(/\,/g, '')),
                priceChangeSIT: parseFloat(item[13].replace(/\%/, '')),
                DividendYield: parseFloat(item[14]),
                PERatio: parseFloat(item[15]),
                MarketCap: parseFloat(item[16])
            })
            return acc
        }, []);
        return reduceArrayType;
    }

    if (!stock.loading) {
        return (
            <>
                <div className="newsContainer">
                    <div className="newsTable">
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
                                    <th>Cost, k</th>
                                    <th>Final Share</th>
                                    <th>Price Change Since Insider Trade (%)</th>
                                    <th>Dividend Yield %</th>
                                    <th>PE Ratio</th>
                                    <th>Market Cap ($M)</th>
                                </tr>
                            </thead>
                            <tbody>
                            {stock.stocks ? stock.stocks.map((trs) => {
                                return (
                                    <tr key={trs[0] + trs[11] + trs[12] + Math.random()}>
                                        <th><input type="checkbox" id={stock.stocks.indexOf(trs)} name="chk" onChange={checkBoxChange} /></th>
                                        <th><a href={`https://www.gurufocus.com/stock/${trs[0]}/insider`} target='_blank'>{trs[0]}</a></th>
                                        <th><a href={`https://www.google.com/search?q=${trs[2]}`} target='_blank'>{trs[2]}</a></th>
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
                                }): 
                                    <>
                                        <div className="spinner">
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    </>
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className="buttons">
                        <Button onClick={handleSelectAll} variant="primary" size="sm">
                            Select All
                        </Button>
                        <Button onClick={handleInterestBtn} variant="primary" size="sm">
                            Interest
                        </Button>
                        <Button onClick={handleNotInterestBtn} variant="warning" size="sm">
                            Not Interest
                        </Button>
                        <Button onClick={setIsModalOpen} variant="success" size="sm">
                            Onboard
                        </Button>
                        <Modal isOpen={isModalOpen} onCloseRequest={onModalCloseRequest} />
                    </div>
                </div>
                <div>
                    interest
                </div>
            </>
        )
    } else {
        return (
            <>
                <Spinner animation="border" variant="primary" />
            </>
        )
    }
}

export default News;