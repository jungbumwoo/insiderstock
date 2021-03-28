import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Saved = (props) => {
    console.log(props);
    let isUserExist = localStorage.getItem('token');

    if (isUserExist) {
        return (
            <>
                <div>Saved Stock</div>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default Saved;