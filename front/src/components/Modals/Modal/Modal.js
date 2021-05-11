import React from "react";
import "./Modal.css";

const Modal = (props) => {
    console.log("Modal Props");
    console.log(props);
    let onCloseRequest = props.onCloseRequest;
    let isOpen = props.isOpen;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="profile_modal">
            <div className="modal-main">
                <h5>This is Modal</h5>
                <p>Modal content's Here</p>
                <button type="button" onClick={onCloseRequest}>Close</button>
            </div>
        </div>
    )
};

export default Modal;
