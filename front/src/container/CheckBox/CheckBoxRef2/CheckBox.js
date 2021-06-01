import React from 'react'

/**
* @author
* @function CheckBox
**/

const CheckBox = (props) => {
  return(
    <li>
        <input 
            key={props.id}
            onClick={props.handleCheckElement}
            type="checkbox"
            checked={props.isChecked}
            value={props.value}
        />{" "}
        {props.value}
    </li>
   );
};

export default CheckBox