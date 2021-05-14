import React, { useEffect } from "react";
import "./Modal.css";
import Icon from "../../../static/images/x-mark.svg";

const Modal = (props) => {
    let shown = props.shown;
    let onCloseRequest = props.onCloseRequest;
    let checked = props.checked;
    let onModalInputChange = props.onChangeInput;
    let modalSubmitInputValue = props.modalSubmit;
    let modalInputs = props.modalInputs;
    console.log(modalInputs);
    
    const filledModal = () => {
        let checkedList = checked.map((item) => {
            return (
                <div className="modal_container">
                    <label>Ticker :</label>
                    <input type="text" defaultValue={item[0]} name={`${checked.indexOf(item)}_ticker`} onChange={onModalInputChange} />
                    <label>Company :</label>
                    <input type="text" defaultValue={item[2]} name={`${checked.indexOf(item)}_company`} onChange={onModalInputChange} />
                    <label>Price :</label>
                    <input type="text" defaultValue={item[3].replace(/\$/g,'')} name={`${checked.indexOf(item)}_price`} onChange={onModalInputChange} />
                    <label>Shares:</label>
                    <input type="text" defaultValue={item[8]} name={`${checked.indexOf(item)}_shares`} onChange={onModalInputChange} />
                    <label>Cost: </label>
                    <input type="text" name={`${checked.indexOf(item)}_cost`} onChange={onModalInputChange} />
                    <label>MarketCap:</label>
                    <input type="text" defaultValue={item[16]} name={`${checked.indexOf(item)}_marketCap`} onChange={onModalInputChange} />
                </div>    
            )
        })
        return checkedList;
    }
        //반복문으로 체크된 숫자만큼 return
        // 개별을 배열로 묶어서 전달전달~
    

    const defaultInput = () => {
        return (
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
                <button type="button" id="modal_close_btn">
                    <img src={Icon} onClick={onCloseRequest} alt="close icon" id="close-modal-icon"/>
                </button>
            </div>
        )
    };

    if (!shown) {
        return null;
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
    
    return (
        <div className="profile_modal" onClick={() => {
            onCloseRequest();
        }}>
            <div className="modal-main" onClick={(e) => {
                e.stopPropagation();
            }}>
                <form onSubmit={handleFormSubmit}>
                    {checked.length > 0 ? filledModal() : defaultInput()}
                    <button type="button" onClick={modalSubmitInputValue}>Submit</button>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
};

export default Modal;
