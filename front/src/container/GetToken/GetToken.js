import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendToken } from "../../actions";

const GetToken = (props) => {
    console.log("GetToken at frontend container executed")
    const dispatch = useDispatch();
    const { token } = props.match.params;

    useEffect(() => {
        console.log("GetToken useEffect at frontend container executed")
        dispatch(sendToken(token));
        props.history.push("/");
    })
    return (
        <>
            <div>
                Welcome
            </div>
        </>
    )
}

export default GetToken