import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBanAction } from '../../actions/banAction';
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
                    <td></td>
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

    const handleDeleteBtn = () => {
        
    }

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