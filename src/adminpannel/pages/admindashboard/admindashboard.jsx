import {  useState } from "react";
import { Adminsidebar } from "../../componnents/adminsidebar/adminsidebar";

import { Outlet } from "react-router-dom";

export function Admindashboard() {
    const [selectedItem, setSelectedItem] = useState("myprofile");
    return (
        <div className="row">
            <div className="col-2 " >
                <Adminsidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
            <div className="col-10 ">
               <Outlet/>
            </div>
        </div>
    )

}
