import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteBanAction, getBanAction } from '../../actions/banAction';
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from '../containerUtils';

const Ban = (props) => {
    const dispatch = useDispatch();
    const ban = useSelector(state => state.ban);
    const { pager, pageOfItems } = ban.bans;
    const [pageNum, setpageNum] = useState(1);
    const [checkedNum, setcheckedNum] = useState([]);

    console.log(`ban.bans.pager`, ban.bans.pager);

    useEffect(() => {
        dispatch(getBanAction(pageNum));
    }, [pageNum]);
    
    const returnBans = () => {
        let returnBan = pageOfItems.map((item) => {
            return (
                <tr>
                    <td><input type="checkbox" id={pageOfItems.indexOf(item)} onChange={handleCheckBox} /></td>
                    <td>{item.ticker}</td>
                    <td>{item.company}</td>
                    <td>{item.MarketCap}</td>
                    <td>{item.PERatio}</td>
                    {/* <td>{item.DividendYield.$numberDecimal}</td> */}
                </tr>
            )
        })
        return returnBan;
    };

    const handleCheckBox = (e) => {
        console.log(`checkedNum`, checkedNum);
        const { id, checked } = e.target;
        const intId = parseInt(id);
        if (checked) {
            // checked true
            setcheckedNum([
                ...checkedNum,
                intId
            ])
        } else {
            // unchecked false
            let filtered = checkedNum.filter(num => (num !== intId));
            setcheckedNum(filtered);
        }
    }; 

    const handleDeleteBtn = () => {
        console.log(`checkedNum`, checkedNum);
        const deleteData = checkedNum.map(num => {
            return pageOfItems[num]
        });
        dispatch(deleteBanAction(deleteData));
        window.location.reload(true);
        // setcheckedNum([]);
    };

    const handlePageClick = (e) => {
        let clickedNum = parseInt(e.target.innerHTML);
        setpageNum(clickedNum);
    };

    return(
        <>  
            <Layout />
            <div>
                <div>
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>MarketCap</th>
                                <th>PERatio</th>
                                {/* <th>DividendYield</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {returnUtil(ban, returnBans)}
                        </tbody>
                    </table>
                </div>
                <div className="pages">
                    <ul>
                        {pager.pages.map(page => {
                            return (
                                <li key={page} onClick={handlePageClick}>{page}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="buttons">
                    <button onClick={handleDeleteBtn}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )

}

export default Ban;