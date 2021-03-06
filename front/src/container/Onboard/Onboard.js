import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFillInOnboardAction, deleteOnboardAction, getOnboard } from "../../actions/onboardAction.js";
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from "../containerUtils.js";
import OnboardAddModal from "../../components/Modals/OnboardAddModal/OnboardAddModal.js";
import { ModalMessage } from "../../components/Modals/ModalMessage/ModalMessage.js";
import { textObject } from "../../components/text/textObject.js";

import "./Onboard.css";

const Onboard = (props) => {
    const onboard = useSelector(state => state.onboard);
    const { pager, pageOfItems } = onboard.pagedOnboard;
    const dispatch = useDispatch();
    const [ checkedNum, setCheckedNum] = useState([]);
    const [pageNum, setpageNum] = useState(1);

    //about Add Modal
    const [modalShow, setmodalShow] = useState(false);
    const [mdTicker, setmdTicker] = useState('');
    const [mdCompany, setmdCompany] = useState('');
    const [mdPrice, setmdPrice] = useState('');
    const [mdShares, setmdShares] = useState('');
    const [mdMarketPrice, setmdMarketPrice] = useState('');

    // messageModal 
    const [ modalMessageShow, setModalMessageShow ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalAlert, setModalAlert ] = useState('');

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
                    <td>{trs.ticker ? trs.ticker : '-'}</td>
                    <td>{trs.company}</td>
                    <td>{trs.MarketCap ? trs.MarketCap : '-'}</td>
                    <td>{trs.price}</td> 
                    <td>{trs.shares ? trs.shares : '-'}</td>
                    <td>{trs.cost ? trs.cost : '-'}</td>
                </tr>
            )
        })
        return onboardList;
    };
    
    const handlePageChange = (e) => {
        const clickedNum = e.target.innerHTML;
        setpageNum(parseInt(clickedNum));
    }; 

    const handleDelete = () => {
        let checkedItems = checkedNum.map(num => {
            return pageOfItems[num];
        })
        dispatch(deleteOnboardAction(checkedItems));
        window.location.reload(true);
        setCheckedNum([]);
    };

    const handleAddBtn = () => {
        if (checkedNum.length === 0) {
            console.log("should select at least 1");
            setModalAlert(textObject.alret.atleastPick);
            setModalMessageShow(!modalMessageShow);
        } else {
            setmodalShow(!modalShow);   
        }
    }

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "ticker") {
            setmdTicker(value);
        } else if (name === "company") {
            setmdCompany(value);
        } else if (name === "price") {
            setmdPrice(value);
        } else if (name === "MarketCap") {
            setmdMarketPrice(value);
        } else if (name === 'shares') {
            setmdShares(value);
        } else {
            console.log('err at handleModalInputChange');
        }
    }

    const modalClose = () => {
        setmodalShow(false);
    }

    const modalSubmit = () => {
        console.log(mdTicker, mdCompany, mdPrice, mdMarketPrice, mdShares);
        // prevent Empthy
        if (mdTicker !== '' && mdCompany !== '' && mdPrice !== '' && mdShares !== '') {
            // dispatch
            let singleOnboard = {
                ticker: mdTicker,
                company: mdCompany,
                shares: mdShares,
                MarketCap: mdMarketPrice,
                price: mdPrice
            }
            dispatch(addFillInOnboardAction(singleOnboard));
            
        } else {
            console.log('??????, ?????????, ?????????, ????????? ???????????? ???????????????.');
        }
        window.location.reload(true);
        modalClose();
        
    }

    return(
        <>
            <Layout />
            <div className="onboard-container">
                <span id="onboard-title">????????????</span>
                {/* <div className="data_table"> */}
                <table className="onboard-table">
                    <thead>
                        <tr>
                            <th className="checkbox-hide">#</th>
                            <th>????????????</th>
                            <th>?????????</th>
                            <th>????????????</th>
                            <th>Price</th>
                            <th>??????</th>
                            <th>??????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnUtil(onboard, returnOnboards)}
                    </tbody>
                </table>
                {/* </div> */}
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
                <OnboardAddModal 
                    modalShow={modalShow}
                    handleModalInputChange={handleModalInputChange}
                    submit={modalSubmit}
                />
                <ModalMessage 
                    shown={modalMessageShow}
                    modalTitle={textObject.onboard.whatisOnboard}
                    modalAlert={modalAlert}
                />
            </div>
        </>
    )
}

export default Onboard;