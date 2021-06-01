import React, { useEffect, useState } from 'react'
import Checkbox from './CheckBox';

/**
* @author
* @function CheckBoxRef1
**/

const CheckBoxRef1 = (props) => {
    const [ isCheckAll, setIsCheckAll] = useState(false);
    const [ isCheck, setIsCheck ] = useState([]);
    
    let initialfruits = [
        { id: "1", name: "banana"},
        { id: "2", name: "apple" },
        { id: "3", name: "mango" },
        { id: "4", name: "grap" }
    ];
    const [ fruits, setFruits ] = useState(initialfruits);
    
    useEffect(() => {
        setFruits(initialfruits);
    }, [isCheck, isCheckAll]);

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(fruits.map((item) => {
            console.log(item.id)
            return item.id
        }))
        if(isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e) => {
        const { id, checked } = e.target;
        console.log(id, checked);
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const returnfruits = fruits.map(({id, name}) => {
        console.log(isCheck);
        console.log(isCheck.includes(id));
        return (
            <>
                <Checkbox 
                    key={id}
                    type="checkbox"
                    name={name}
                    id={id}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(id)}
                />
                {name}
            </>
        )
    })
 
    return(
        <>
            <div>CheckBoxRef1</div>
            <div>
                <Checkbox 
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                />
                Select All
                {returnfruits}
            </div>
        </>
    )

 }

export default CheckBoxRef1