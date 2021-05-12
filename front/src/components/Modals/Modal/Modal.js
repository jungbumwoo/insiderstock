import React, { useEffect } from "react";
import "./Modal.css";
import Icon from "../../../static/images/x-mark.svg";

const Modal = (props) => {
    let shown = props.shown;
    let onCloseRequest = props.onCloseRequest;
    // useEffect(() => {
    //     if (shown) {
    //         const backGround = document.querySelector('.profile_modal');
    //         const modal_main = document.querySelector('.modal-main');
    //         backGround.addEventListener('click', (event) => {
    //             console.log("clicked !!!");
    //             onCloseRequest();
    //         });
    //         modal_main.addEventListener('click', (event) => {
    //             event.stopPropagation();
    //         })
    //     }
    // }, []);
    
    if (!shown) {
        return null;
    }
    
    return (
        <div className="profile_modal" onClick={() => {
            onCloseRequest();
        }}>
            <div className="modal-main" onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className="modal_container">
                    <label>Ticker :</label>
                    <input type="text"/>
                    <label>Company :</label>
                    <input type="text"/>
                    <label>Price :</label>
                    <input type="text"/>
                    <label>Shares:</label>
                    <input type="text"/>
                    <label>Cost: </label>
                    <input type="text"/>
                    <label>MarketCap:</label>
                    <input type="text"/>
                    <h5>This is Modal</h5>
                    <p>Modal content's Here</p>
                    <button type="button">
                        <img src={Icon} onClick={onCloseRequest} alt="close icon" id="close-modal-icon"/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Modal;
