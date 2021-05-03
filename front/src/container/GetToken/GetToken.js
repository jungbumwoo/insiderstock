import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendToken, getUserData } from "../../actions";

const GetToken = (props) => {
    const dispatch = useDispatch();
    console.log(props.match.params);
    const { token } = props.match.params;
    
    useEffect(() => {
        localStorage.setItem('token', token);
        dispatch(getUserData());
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