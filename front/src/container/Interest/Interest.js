import React, { useEffect, useState } from "react";
import { Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddInterestAction } from "../../actions/stockAction";
import { interestDeleteAct } from "../../actions";
import Button from 'react-bootstrap/Button';

const Interest = () => {
    const dispatch = useDispatch();
    const [ newArray, setNewArray ] = useState([]);
    const [ noObj, setNoObj] = useState(null);
    const [ reload, setReload] = useState(null);
    const stockInterest = useSelector(state => state.stock);
    let { interests } = stockInterest;
    
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
        let remainId = newArray.map((num) => {
            let deleteIndex = wholearray.indexOf(num);
            return wholearray.splice(deleteIndex, 1);
        });

        let remainArray = remainId.map((num) => {
            return interests[num];
        });

        let deleteArray = newArray.map((num) => {
            return interests[num];
        })
        dispatch(interestDeleteAct(deleteArray, remainArray));
    }
    
    useEffect(() => {
        dispatch(getAddInterestAction());
    }, [])

    const reloadComponent = () => {
        setReload({});
    }
    console.log(interests);
    if(!stockInterest.loading) {
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
                                  <tr key={interests.indexOf(trs)}>
                                    <th><input type="checkbox" id={interests.indexOf(trs)} name="chk" onChange={checkBoxChange} /></th>
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
                            }) : undefined}
                        </tbody>
                    </Table>
                    <Button onClick={handleDeleteBtn} variant="dark" size="sm">Delete</Button>{' '}
                </div>
            </>
        )
    } else {
        return(
            <div>Loading..</div>
        )
    }
}

export default Interest;