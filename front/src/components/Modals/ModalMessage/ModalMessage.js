import React from 'react'

export const ModalMessage = (props) => {
    let shown = props.shown;
    let onCloseRequest = props.onCloseRequest;
    let modalTitle = props.modalTitle;
    let modalContent = props.modalContent;
    return (
        <div className="modal-message">
            <div className="modal-messgae-main">
                <h3>{modalTitle}</h3>
                <p>{modalContent}</p>
            </div>
        </div>
    )
}
