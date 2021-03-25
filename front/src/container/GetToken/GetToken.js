import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendToken } from "../../actions";

const GetToken = (props) => {
    const dispatch = useDispatch();
    const { token } = props.match.params;

    useEffect(() => {
        dispatch(sendToken(token));
        props.history.push("/");
    })
    return (
        <>
        </>
    )
}

export default GetToken