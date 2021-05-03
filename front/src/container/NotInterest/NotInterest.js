import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotInterestAction } from "../../actions";

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
                {notinterest.notinterests}
            </div>
        </>
    );
}

export default NotInterest;