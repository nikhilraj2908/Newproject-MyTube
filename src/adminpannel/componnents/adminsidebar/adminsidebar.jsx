import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Adminsidebar({ selectedItem, setSelectedItem }) {

    const navigate=useNavigate();

    function getItemStyle(item) {
        return item === selectedItem ? { backgroundColor: '#c70604', color: 'white' } : {};
    }

    function handleItemClick(value) {
        setSelectedItem(value); // Update selectedItem with the clicked item
        navigate(value);
    }

    return (
        <div style={{ borderRight: "1px solid gray " }} >
            <div className="admitcard-container1">
                <div>
                    {/* image  */}
                </div>
                <h1
                    className="list-heading p-3 d-flex align-items-center my-3"
                    onClick={() => handleItemClick("myprofile")} // Set selectedItem to "myprofile"
                    style={getItemStyle("myprofile")}
                >
                    <span className="bi bi-person-fill fs-5 mx-3"> My Profile</span>
                </h1>
                <h1 className="list-heading p-3 d-flex  align-items-center my-3"
                    onClick={() => handleItemClick("addvideoadmin")}
                    style={getItemStyle("addvideoadmin")}
                >
                    <span className="bi bi-person-fill fs-5 mx-3"> Add  Video</span>

                </h1>
                <h1
                    className="list-heading p-3 d-flex align-items-center my-3"
                    onClick={() => handleItemClick("allusers")} // Set selectedItem to "allusers"
                    style={getItemStyle("allusers")}
                >
                    <span className="bi bi-person-vcard-fill fs-5 mx-3"> All users</span>
                </h1>

                <h1
                    className="list-heading p-3 d-flex align-items-center my-3"
                    onClick={() => handleItemClick("allvideos")} // Set selectedItem to "allvideos"
                    style={getItemStyle("allvideos")}
                >
                    <span className="bi bi-chat-square-text-fill fs-5 mx-3"> All videos</span>
                </h1>

                <h1
                    className="list-heading p-3 d-flex align-items-center my-3"
                    onClick={() => handleItemClick("subadmin")} // Set selectedItem to "subadmin"
                    style={getItemStyle("subadmin")}
                >
                    <span className="bi bi-people-fill fs-5 mx-3"> Sub Admin</span>
                </h1>

                <h1
                    className="list-heading p-3 d-flex align-items-center my-3"
                    onClick={() => handleItemClick("logout")} // Set selectedItem to "logout"
                    style={getItemStyle("logout")}
                >
                    <span className="bi bi-people-fill fs-5 mx-3"> Log-out </span>
                </h1>
            </div>
        </div>
    );
}
