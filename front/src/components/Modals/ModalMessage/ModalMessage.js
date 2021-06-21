import React from 'react';
import "./ModalMessage.css";
import Icon from "../../../static/images/x-mark.svg";

export const ModalMessage = (props) => {
    let shown = props.shown;
    let onCloseRequest = props.onCloseRequest;
    let modalTitle = props.modalTitle;
    let modalContent1 = props.modalContent1;
    let modalContent2 = props.modalContent2;
    let modalAlert = props.modalAlert;
    let modalSigninLink = props.modalSigninLink;
    let modalSignupLink = props.modalSignupLink;
    
    if(!shown) {
        return null;
    }

    return (
        <div className="modal-message" onClick={() => {
            onCloseRequest();
        }}>
            <div className="modal-message-main" onClick={(e) => {
                e.stopPropagation();
            }}>
                <button type="button" id="modal_close_btn">
                    <img src={Icon} onClick={onCloseRequest} alt="close icon" id="close-modal-icon"/>
                </button>
                <div className="modal-content">
                    <h2>{modalAlert}</h2>
                    <h3>{modalTitle}</h3>
                    <p>{modalContent1}</p>
                    <p>{modalContent2}</p>
                    <div className="modal-login-link">
                        <a href="/signin">{modalSigninLink}</a>
                        <a href="/signup">{modalSignupLink}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
