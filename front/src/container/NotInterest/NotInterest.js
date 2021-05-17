import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotInterestAction } from "../../actions";
import Table from "react-bootstrap/Table";
import { notInterestDeleteAct } from "../../actions";
import Button from 'react-bootstrap/Button';

const NotInterest = (props) => {
    const dispatch = useDispatch();
    const notinterest = useSelector(state => state.notinterest);
    const [ newArray, setNewArray ] = useState([]);
    
    useEffect(() => {
        dispatch(getNotInterestAction());
    }, []);
    
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
        // remain element
        let wholearray = [];
        for( let i = 0; i < notinterest.notinterests.length; i++ ){
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
            return notinterest.notinterests[num];
        });

        let deleteArray = newArray.map((num) => {
            return notinterest.notinterests[num];
        });
        console.log(deleteArray);
        console.log(remainArray);
        dispatch(notInterestDeleteAct(deleteArray, remainArray));
    }

    return (
        <>
            <div>NotInterest</div>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ticker</th>
                            <th>Company</th>
                            <th>insiderName</th>
                            <th>Date</th>
                            <th>MarketCap</th>
                        </tr>
                    </thead>
                    <tbody>
                    {notinterest.notinterests.map((item) => {
                        return (
                            <tr key={notinterest.notinterests.indexOf(item)}>
                                <th><input type="checkbox" id={notinterest.notinterests.indexOf(item)} name="chk" onChange={checkBoxChange} /></th>
                                <th>{item.ticker}</th>
                                <th>{item.company}</th>
                                <th>{item.insiderName}</th>
                                <th>{item.date}</th>
                                {/* <th>{item.MarketCap}</th> */}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <Button onClick={handleDeleteBtn} variant="dark" size="sm">Delete</Button>{' '}

            </div>
            
        </>
    );
}

export default NotInterest;