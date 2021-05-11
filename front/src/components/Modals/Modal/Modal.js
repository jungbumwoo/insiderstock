import React from "react";

const Modal = (props) => {
    console.log("Modal Props");
    console.log(props);
    let onCloseRequest = props.onCloseRequest;
    let isOpen = props.isOpen;

    if(!isOpen) {
        return null
    }

    return (
        <div>
            <button type="button" onClick={onCloseRequest}></button>

        </div>
    )
}

export default Modal;
