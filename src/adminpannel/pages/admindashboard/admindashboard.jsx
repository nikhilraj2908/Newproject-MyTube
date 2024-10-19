import { useEffect, useState } from "react";
import { Adminsidebar } from "../../componnents/adminsidebar/adminsidebar";
import axios from "axios";

export function Admindashboard() {
    const [selectedItem, setSelectedItem] = useState("myprofile");
    const [videos, setvideos] = useState([]);
    async function loadvideos() {
        const response = await axios.get("http://127.0.0.1:1947/get-videos");
        setvideos(response.data);
    }
    useEffect(() => {
        loadvideos();
    }, [])
    return (
        <div className="row">
            <div className="col-2 " >
                <Adminsidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
            <div className="col-9 ">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>videos</th>
                            <th>title/discription</th>
                            <th>likes </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos.map((video, index) =>
                                <tr>
                                    <td><iframe src={video.videoSrc}
                                        width={150}
                                        height={100}
                                    ></iframe></td>
                                    <td><div className="fw-bold">{video.title}</div><div>{video.discription}</div></td>
                                    <td>{video.likecount}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}
