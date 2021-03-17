import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../../actions/stockAction";

const Home = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    console.log(stock);
    useEffect(()=> {
        dispatch(getAllStock());
    })
    return (
        <div>Hi home.</div>
    );
}

export default Home;