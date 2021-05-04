import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotInterestAction } from "../../actions";
import Table from "react-bootstrap/Table";

const NotInterest = (props) => {
    const dispatch = useDispatch();
    const notinterest = useSelector(state => state.notinterest);
    console.log(notinterest);
    
    useEffect(() => {
        dispatch(getNotInterestAction());
    }, []);

    return (
        <>
            <div>NotInterest</div>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Company</th>
                            <th>insiderName</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {notinterest.notinterests.map((item) => {
                        return (
                            <tr>
                                <th>{item.ticker}</th>
                                <th>{item.company}</th>
                                <th>{item.insiderName}</th>
                                <th>{item.date}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
            
        </>
    );
}

export default NotInterest;