import React from "react";
import "./Modal.css";
import Icon from "../../../static/images/x-mark.svg";

const Modal = (props) => {
    let shown = props.shown;
    let onCloseRequest = props.onCloseRequest;
    let checked = props.checked;
    let onModalInputChange = props.onModalInputChange;
    let handleModalSubmit = props.handleModalSubmit;
    // let modalInputs = props.modalInputs;
    // console.log(modalInputs);

    // const costCalculate = (item) => {
    //     let multiple = modalInputs[`${checked.indexOf(item)}_price`] * modalInputs[`${checked.indexOf(item)}_shares`];
    //     return multiple;
    // }
    
    const filledModal = () => {
        let checkedList = checked.map((item) => {
            return (
                <div key={checked.indexOf(item)} className="modal_container">
                    <label>Ticker :</label>
                    <input type="text" defaultValue={item.ticker} name={`${checked.indexOf(item)}_onboard_ticker`} onChange={onModalInputChange} />
                    <label>Company :</label>
                    <input type="text" defaultValue={item.company} name={`${checked.indexOf(item)}_onboard_company`} onChange={onModalInputChange} />
                    <label>MarketCap:</label>
                    <input type="text" defaultValue={item.MarketCap} name={`${checked.indexOf(item)}_onboard_MarketCap`} onChange={onModalInputChange} />
                    <label>Price :</label>
                    <input type="text" defaultValue={item.purchasePrice} name={`${checked.indexOf(item)}_onboard_price`} onChange={onModalInputChange} />
                    <label>Shares:</label>
                    <input type="text" defaultValue={0} name={`${checked.indexOf(item)}_onboard_shares`} onChange={onModalInputChange} />
                    {/* <label>Cost: </label> */}
                    {/* <span defaultValue={0} name={`${checked.indexOf(item)}_cost`} onChange={onModalInputChange}>{costCalculate(item)}</span> */}
                    {/* <input type="text" value={costCalculate(item)}
                            name={`${checked.indexOf(item)}_cost`} 
                            onChange={onModalInputChange} /> */}
                </div>    
            )
        })
        return checkedList;
    }
        //??????????????? ????????? ???????????? return
        // ????????? ????????? ????????? ????????????~

    const defaultInput = () => {
        return (
            <div className="modal_container">
                <div>
                    <label>Ticker :</label>
                    <input type="text"/>
                </div>
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
                    <button type="button" onClick={handleModalSubmit}>Submit</button>
                </form>
                <button type="button" id="modal_close_btn">
                    <img src={Icon} onClick={onCloseRequest} alt="close icon" id="close-modal-icon"/>
                </button>
            </div>
        </div>
    )
};

export default Modal;
