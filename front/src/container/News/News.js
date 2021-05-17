import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";
import { postAddInterestAction, remainAction, postNotInterestAction, addOnboard, postBanAction } from "../../actions";
import Modal from "../../components/Modals/Modal/Modal.js";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';

import "./News.css";

const News = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const [ newArray, setNewArray] = useState([]);
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ modalInputs, setModalInputs] = useState({});

    useEffect(()=> {
        if(!stock.stocks) {
            dispatch(getAllStock());
        };
        setNewArray([]);
    }, []);

    const checkBoxChange = (e) => {
        const itemToFind = newArray.find((item) => { return item == parseInt(e.target.id) })
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

    const handleSelectAll = () => {
        let ele = document.getElementsByName("chk");
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

    const handleBanBtn = () => {
        let getDataFromCheckedId = newArray.map((num) => {
            return stock.stocks[num]
        });
        dispatch(postBanAction(getDataFromCheckedId));
        handleBtnSubmit();
        console.log(getDataFromCheckedId);
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

    const checkedList = () => {
        let checkedContent = newArray.map((num) => {
            return stock.stocks[num];
        });
        return checkedContent;
    };

    const handleOnboardBtn = () => {
        let checkedContent = newArray.map((num) => {
            stock.stocks[num][3] = stock.stocks[num][3].toString().replace(/\$/g,'');
            stock.stocks[num][3] = parseFloat(stock.stocks[num][3]);
            stock.stocks[num][8] = parseFloat(stock.stocks[num][8]);
            return stock.stocks[num];
        });
        console.log(checkedContent);
        let handleModalData = checkedContent.map((item) => {
            let dataArray = {};
            let ticker = `${checkedContent.indexOf(item)}_ticker`;
            let company = `${checkedContent.indexOf(item)}_company`;
            let price = `${checkedContent.indexOf(item)}_price`;
            let shares = `${checkedContent.indexOf(item)}_shares`;
            let cost = `${checkedContent.indexOf(item)}_cost`;
            let marketCap = `${checkedContent.indexOf(item)}_marketCap`;
            dataArray[ticker] = item[0];
            dataArray[company] = item[2];
            dataArray[price] = item[3];
            dataArray[shares] = 0;
            dataArray[cost] = 0;
            dataArray[marketCap] = item[16];
            return dataArray
        });
        const conModalData = Object.assign({}, ...handleModalData);

        setModalInputs({
            ...modalInputs,
            ...conModalData
        }); 
        setToggleModal(!toggleModal);
    }

    const onModalInputChange = (e) => {
        let { name, value } = e.target;
        setModalInputs({
            ...modalInputs,
            [name] : value
        })
    }

    const onModalCloseRequest = () => {
        console.log("onModalCloseRequest");
        setToggleModal(false);
        setModalInputs({});
        setNewArray([]);
    };

    const modalSubmitInputValue = () => {
        console.log("modalSubmitInputValue");
        console.log(modalInputs);
        dispatch(addOnboard(modalInputs));
        setToggleModal(false);
        setModalInputs({});
        setNewArray([]);
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
                        <Button onClick={handleOnboardBtn} variant="success" size="sm">
                            Onboard
                        </Button>
                        <Button onClick={handleBanBtn} variant="warning" size="sm">
                            Ban for 5days
                        </Button>
                        <Button onClick={handleNotInterestBtn} variant="danger" size="sm">
                            Not Interest
                        </Button>
                        <Modal shown={toggleModal} 
                            onCloseRequest={onModalCloseRequest} 
                            checked={checkedList()} 
                            onChangeInput={onModalInputChange} 
                            modalSubmit={modalSubmitInputValue}
                            modalInputs={modalInputs} />
                    </div>
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
