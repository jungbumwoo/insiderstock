import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotInterestAction } from "../../actions";
import { notInterestDeleteAct } from "../../actions";
import { returnUtil } from "../containerUtils.js";

const NotInterest = (props) => {
    const dispatch = useDispatch();
    const notinterest = useSelector(state => state.notinterest);
    const { pager, pageOfItems } = notinterest.pagedNotInt;
    const [ checkedArray, setCheckedArray ] = useState([]);
    const [ curntUrl, setCurntUrl ] = useState(1);
    
    useEffect(() => {
        dispatch(getNotInterestAction(curntUrl));
    }, [curntUrl]);
    
    const checkBoxChange = (e) => {
        let intId = parseInt(e.target.id);
        if(e.target.checked){
            //checked, true
            setCheckedArray([
                ...checkedArray,
                intId
            ]);
        } else {
            // unchecked
            let deletedUnchecked = checkedArray.filter(element => element !== intId);
            setCheckedArray(deletedUnchecked);
        }
    };

    const handlePageBtn = (e) => {
        setCurntUrl(e.target.innerHTML);
    };

    const handleDeleteBtn = () => {
        // remain element
        let wholearray = [];
        for( let i = 0; i < pageOfItems.length; i++ ){
            wholearray.push(i);
        };
        let remainArrayNum = wholearray.filter((num) => {
            console.log(num);
            let deleteIndex = checkedArray.indexOf(num);
            // 여기 값이 달라지네;;;
            //checkedArray. 항상그대로.
            if (deleteIndex > -1 ) {
                console.log(`num: ${num}, deleteIndx: ${deleteIndex}`);
            }
            return deleteIndex <= -1
        });
        console.log(remainArrayNum);

        let remainArray = remainArrayNum.map((num) => {
            return pageOfItems[num];
        });

        let deleteArray = checkedArray.map((num) => {
            return pageOfItems[num];
        });
        dispatch(notInterestDeleteAct(deleteArray, remainArray));
    }

    const returnNotInt = () => {
        let result = pageOfItems.map((item) => {
            return (
                <tr key={pageOfItems.indexOf(item)}>
                    <th><input type="checkbox" id={pageOfItems.indexOf(item)} name="chk" onChange={checkBoxChange} /></th>
                    <th>{item.ticker}</th>
                    <th>{item.company}</th>
                    <th>{item.insiderName}</th>
                    <th>{item.date}</th>
                    <th>{item.MarketCap}</th>
                </tr>
            )
        })
        return result;
    }

    return (
        <>
            <div>NotInterest</div>
            <div>
                <div className="data_tables">
                    <table>
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
                            {returnUtil(notinterest, returnNotInt)}
                        </tbody>
                    </table>
                </div>
                <div className="pages_buttons">
                    <ul>
                        {pager.pages.map(element => {
                           return (
                           <li onClick={handlePageBtn}>
                            <span>{element}</span>
                           </li>
                           )
                        })}
                    </ul>
                </div>
                <button onClick={handleDeleteBtn} variant="dark" size="sm">Delete</button>
            </div>
            
        </>
    );
}

export default NotInterest;