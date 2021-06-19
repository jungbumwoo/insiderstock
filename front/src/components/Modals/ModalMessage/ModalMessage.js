import React from 'react'

export const ModalMessage = (props) => {
    let shown = props.shown;
    let onCloseRequest = props.onCloseRequest;
    let modalTitle = props.modalTitle;
    let modalContent1 = props.modalContent1;
    let modalContent2 = props.modalContent2;
    let modalAlert = props.modalAlert;

    console.log(shown);
    console.log(modalTitle);
    
    if(!shown) {
        return null;
    }

    return (
        <div className="modal-message" onClick={() => {
            onCloseRequest();
        }}>
            <div className="modal-messgae-main" onClick={(e) => {
                e.stopPropagation();
            }}>
                <p>Muyaho</p>
                <p>{modalAlert}</p>
                <h3>{modalTitle}</h3>
                <p>{modalContent1}</p>
                <p>{modalContent2}</p>
            </div>
        </div>
    )
}
