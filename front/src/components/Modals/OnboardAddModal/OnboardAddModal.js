import React from 'react'
import PropTypes from 'prop-types'

const OnboardAddModal = props => {
    const shown = props.modalShow;
    const handleModalInputChange = props.handleModalInputChange;
    const submit = props.submit;

    const returnModal = () => {
        return (
            <div className="modal-outside">
            <div className="modal-inside">
                <form>
                    <label for="ticker">종목코드</label>
                    <input type="text" name="ticker" onChange={handleModalInputChange} />
                    <label for="company">종목명</label>
                    <input type="text" name="company" onChange={handleModalInputChange}/>
                    <label for="shares">수량</label>
                    <input type="text" name="shares" onChange={handleModalInputChange} />
                    <label for="price">Price</label>
                    <input type="text" name="price" onChange={handleModalInputChange} />
                    <label for="MarketCap">시가총액</label> 
                    <input type="text" name="MarketCap" onChange={handleModalInputChange}/>
                </form>
                <button onClick={submit}>
                    Submit
                </button>
            </div>
        </div>    
        );
    };

    return (
        <div>{ shown ? returnModal() : ""}</div>
    )
}

OnboardAddModal.propTypes = {
    modalShow: PropTypes.bool,
    handleModalInputChange: PropTypes.func,
    submit: PropTypes.func
}

export default OnboardAddModal;
