import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOnboardAction, getOnboard } from "../../actions/onboardAction.js";
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from "../containerUtils.js";

import "./Onboard.css";

const Onboard = (props) => {
    const onboard = useSelector(state => state.onboard);
    const { pager, pageOfItems } = onboard.pagedOnboard;
    const dispatch = useDispatch();
    const [ checkedNum, setCheckedNum] = useState([]);
    const [pageNum, setpageNum] = useState(1);

    useEffect(() => {
        dispatch(getOnboard(pageNum));
    }, [pageNum]);
    console.log(onboard);

    const checkBoxChange = (e) => {
        const { id, checked } = e.target;
        let intId = parseInt(id);
        if(checked) {
            // checked, true
            setCheckedNum([
                ...checkedNum,
                intId
            ]);
        } else {
            //unchecked, false
            let filtered = checkedNum.filter(num => (num !== intId));
            setCheckedNum(filtered);
        }
    }

    const returnOnboards = () => {
        let onboardList = pageOfItems.map((trs) => {
            return (
                <tr key={pageOfItems.indexOf(trs)}>
                    <td><input type="checkbox" onChange={checkBoxChange} id={parseInt(pageOfItems.indexOf(trs))} checked={checkedNum.includes(pageOfItems.indexOf(trs))} name="chk" /></td>
                    <td>{trs.ticker}</td>
                    <td>{trs.company}</td>
                    <td>{trs.MarketCap}</td>
                    <td>{trs.price}</td>
                    <td>{trs.shares}</td>
                    <td>{trs.cost}</td>
                </tr>
            )
        })
        return onboardList;
    };

    const handleDelete = () => {
        let checkedItems = checkedNum.map(num => {
            return pageOfItems[num];
        })
        dispatch(deleteOnboardAction(checkedItems));
        window.location.reload(true);
        setCheckedNum([]);
    };

    const handlePageChange = (e) => {
        const clickedNum = e.target.innerHTML;
        setpageNum(parseInt(clickedNum));
    }; 

    return(
        <>
            <Layout />
            <div>
                <div className="data_table">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>MarketCap</th>
                                <th>Price</th>
                                <th>Shares</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnUtil(onboard, returnOnboards)}
                        </tbody>
                    </table>
                </div>
                <div className="page_numbers">
                    <ul>
                        {pager.pages.map(num => {
                            return(
                                <li key={num} onClick={handlePageChange}>{num}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="buttons">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleAddBtn}>Add</button>
                </div>
            </div>
        </>
    )
}

export default Onboard;