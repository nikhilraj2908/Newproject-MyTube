import { useEffect, useState } from "react";
import axios from "axios";
export function Myprofile(){

    const [videos, setvideos] = useState([]);
    async function loadvideos() {
        const response = await axios.get("http://127.0.0.1:1947/get-videos");
        setvideos(response.data);
    }
    useEffect(() => {
        loadvideos();
    }, [])
    async function editvideoclick(id){
        console.log(id);
        const responseedit= await axios.put(`http://127.0.0.1:1947/edit-videos/${id}`)
    }
   async function deletevideoclick(id){
        const responsedelete= await axios.delete(`http://127.0.0.1:1947/video-delete/${id}`)
        loadvideos()
    }
    return(
        <>
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
                                    <td className="btn-group">
                                        <span onClick={()=>editvideoclick(video._id)} className="bi bi-pen  btn btn-warning"></span>
                                        <span onClick={()=>deletevideoclick(video._id)} className="bi bi-trash btn btn-danger"></span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </>
    )
}