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
            <div className="col-9">
                {
                    videos.map((video, index) => 
                        <div>
                            <span>
                                <iframe src={ video.videoSrc}
                                    width={90}
                                    height={50}
                                ></iframe>
                            </span>
                            <span>
                                <div>{video.title}</div>
                                <div>{video.discription}</div>
                            </span>
                            <span>{video.likecount}</span>
                            {/* <span>{video.comments.length()}</span>   */}
                        </div>
                    )
                }
            </div>
        </div>
    )

}
