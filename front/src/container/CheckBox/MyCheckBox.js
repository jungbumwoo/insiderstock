import React, {useState} from "react";

let initialfruits = [
    { id: 1, value: "banana", isChecked: false },
    { id: 2, value: "apple", isChecked: false },
    { id: 3, value: "mango", isChecked: false },
    { id: 4, value: "grap", isChecked: false }
];

const MyCheckbox = (props) => {
    
    const [ fruits, setFruits ] = useState(initialfruits);

    const handleSelectAll = (e) => {
        console.log(e.target.value);
        console.log("handleSelectAll");
        console.log(fruits);

        let ischecked = fruits.map((item) => {
            return item.isChecked;
        });
        console.log(ischecked);
        console.log(ischecked.indexOf(false));
        
        // is there false? then all true
        if(ischecked.indexOf(false) > -1){
            let allchk = fruits.map((item) => {
                item.isChecked = true;
                return item;
            })
            setFruits(allchk);
        } else {
            // all true? than all false
            let allFalse = fruits.map((item) => {
                item.isChecked = false;
                return item;
            })
            setFruits(allFalse);
        }
    };

    const handleChkChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.checked);

        let chkfruits = fruits.map((item) => {
            if(e.target.value == item.value){
                item.isChecked = !item.isChecked
            }
            return item;
        })

        console.log(chkfruits);
        setFruits(chkfruits);
    }

    return(
        <>
            <div>
                <input type="checkbox" onClick={handleSelectAll}/>
                <span>Select All</span>
            </div>
            {fruits.map((elements) => {
                console.log(elements)
                return(
                    <div>
                        <input type="checkbox" onChange={handleChkChange} defaultCecked={elements.isChecked} checked={elements.isChecked} value={elements.value} />
                        <span>{elements.value}</span>
                    </div>
                )
            })}
            <div className="chktable">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>fruit</th>
                            <th>ischecked?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fruits.map((item) => {
                            return (
                                <tr>
                                    <th>{item.id}</th>
                                    <th>{item.value}</th>
                                    <th>{item.isChecked.toString()}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyCheckbox;