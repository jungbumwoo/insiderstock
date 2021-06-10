import React, { useState} from "react";
import Modal from "../../components/Modals/Modal/Modal";
import Layout from "../../components/Layouts/Layout/Layout.js";
// import "./Profile.css";


const Profile = (props) => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    console.log(isModalOpen);

    const onModalCloseRequest = () => {
        setIsModalOpen(false);
    }

    return (
        <>  
            <Layout />
            <div className="profile">
                <h4>Profile</h4>
                <Modal isOpen={isModalOpen} onCloseRequest={onModalCloseRequest} />
                <p>Profile contents</p>
                <button type="button" onClick={setIsModalOpen}>Open</button>
            </div>
            
        </>
    )
};

export default Profile;
