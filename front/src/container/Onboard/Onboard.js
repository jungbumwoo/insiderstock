import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFillInOnboardAction, deleteOnboardAction, getOnboard } from "../../actions/onboardAction.js";
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from "../containerUtils.js";
import OnboardAddModal from "../../components/Modals/OnboardAddModal/OnboardAddModal.js";
// import "./Onboard.css";

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
        setmodalShow(!modalShow);   
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
            console.log('기호, 회사명, 매수가, 수량은 필수기입 항목입니다.');
        }
        window.location.reload(true);
        modalClose();
        
    }

    return(
        <>
            <Layout />
            <div>
                <div className="data_table">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>종목코드</th>
                                <th>종목명</th>
                                <th>시가총액</th>
                                <th>Price</th>
                                <th>수량</th>
                                <th>비용</th>
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
                <OnboardAddModal 
                    modalShow={modalShow}
                    handleModalInputChange={handleModalInputChange}
                    submit={modalSubmit}
                />
            </div>
        </>
    )
}

export default Onboard;