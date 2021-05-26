import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBanAction } from '../../actions/banAction';
import Layout from "../../components/Layouts/Layout/Layout.js";
import { returnUtil } from '../containerUtils';

const Ban = (props) => {
    const dispatch = useDispatch();
    const ban = useSelector(state => state.ban);

    useEffect(() => {
        dispatch(getBanAction());
    }, []);
    
    const returnBans = () => {
        let returnBan = ban.bans.map((item) => {
            return (
                <tr>
                    <td></td>
                    <td>{item.ticker}</td>
                    <td>{item.company}</td>
                    <td>{item.MarketCap.$numberDecimal}</td>
                    <td>{item.PERatio.$numberDecimal}</td>
                    {/* <td>{item.DividendYield.$numberDecimal}</td> */}
                </tr>
            )
        })
        return returnBan;
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
            </div>
        </>
    )

}

export default Ban;