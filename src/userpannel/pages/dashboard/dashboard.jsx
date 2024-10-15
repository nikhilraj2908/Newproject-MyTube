import axios from "axios"
import { useEffect, useRef, useState } from "react"
import './dashboard.css'
import userdp from '../../../assets/images/banner.png'
import { useCookies } from "react-cookie"

export function Dashboard() {
    const [videos, setVideos] = useState([]);
    const [newComment, setNewComment] = useState({}); 
    const [cookie, setcookie, removecookie] = useCookies()
    const commentRefs = useRef([]);
    const [userdetails, setuserdetails] = useState([])
    useEffect(() => {
        axios.get("http://127.0.0.1:1947/get-videos")
            .then(response => setVideos(response.data))
    }, [])

    function likeclicked(title) {
        axios.patch("http://127.0.0.1:1947/update-like", { title })
            .then(response => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.title === title ? { ...video, likecount: video.likecount + 1 } : video
                    )
                );
            })
            .catch(error => {
                console.error("Error updating like in the database", error);
            });
    }

    function dislikeclicked(title) {
        axios.patch("http://127.0.0.1:1947/update-like", { title })
            .then(response => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.title === title ? { ...video, likecount: video.likecount - 1 } : video
                    )
                );
            })
            .catch(error => {
                console.error("Error updating likes in the database", error);
            });
    }

    // Handle typing in comment input
    function handleCommentChange(e, title) {
        setNewComment({ ...newComment, [title]: e.target.value });
    }

    function commentclicked(title) {
        const comment = newComment[title];
        if (!comment) return; 

        axios.post("http://127.0.0.1:1947/add-comment", { title, comment })
            .then(response => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.title === title ? { ...video, comments: [...video.comments, comment] } : video
                    )
                );
                setNewComment({ ...newComment, [title]: "" });
            })
            .catch(error => {
                console.error("Error submitting comment", error);
            });
    }
    function cmtbtnclicked(index) {
        commentRefs.current[index].focus(); 
    }


    function saveclicked(videoID) {
        axios.post("http://127.0.0.1:1947/save-video", { videoID, userID: cookie.userID })
            .then(response => {
                alert("Video saved!");

            })
            .catch(error => {
                console.error("Error saving video", error);
            });
    }

   async function handleViewToggle() {
    try{
        const response=await axios.get(`http://127.0.0.1:1947/users/${cookie.userID}`);
        setuserdetails(response.data);
    }
    catch(error){
        console.log(error);
    }
    }

    return (
        <div>
            <section className="row">
                <div className="col-1 ">
                    <button className="bi bi-house-fill btn btn-light py-2"><div>Home</div></button>
                    <button className="bi bi-speedometer btn btn-light py-2"><div>Latest</div></button>
                    <button className="bi bi-save btn btn-light py-2" onClick={handleViewToggle}><div>Saved</div></button>
                    <button className="bi bi-bookmark-heart btn btn-light py-2"><div>Liked</div></button>
                    <button onClick={() => removecookie("userID")} className="bi bi-door-open-fill btn btn-light py-2"><div>Logoff</div></button>
                </div>

                <div className="col-11" style={{ textAlign: "justify" }}>
                    <section className="main my-1 d-flex flex-wrap justify-content-start" style={{ height: "700px" }}>
                        {videos.map((video, index) => (
                            <span
                                key={video.title}
                                className="my-4 me-4"
                                style={{
                                    width: "30%",
                                    minWidth: "250px",
                                }}
                            >
                                <iframe
                                    className="border-1 rounded"
                                    src={video.videoSrc}
                                    title={video.title}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                    }}
                                ></iframe>
                                <div className="d-flex mt-2">
                                    <img
                                        className="rounded-circle me-3"
                                        src={userdp}
                                        width={30}
                                        height={30}
                                    ></img>
                                    <span>
                                        <div className="fw-bold">{video.title}</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="pe-2" style={{ height: "50px", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                                {video.discription}
                                            </div>
                                        </div>
                                    </span>
                                </div>

                                <span className="w-100 btn-group">
                                    <button className="btn-primary btn bi bi-hand-thumbs-up px-3" onClick={() => likeclicked(video.title)}>
                                        {video.likecount}
                                    </button>
                                    <button className="btn-danger btn bi bi-hand-thumbs-down px-3" onClick={() => dislikeclicked(video.title)}></button>
                                    <button className="btn btn-warning bi bi-chat" onClick={() => cmtbtnclicked(index)}> Comment</button>
                                    <button className="btn btn-secondary bi bi-bookmark" onClick={() => saveclicked(video._id)}> Save</button>
                                </span>
                                <div >
                                    <div className="my-2 input-group">
                                        <input
                                            ref={(ref) => (commentRefs.current[index] = ref)} // Assign the ref to the array
                                            type="text"
                                            className="form-control "
                                            placeholder="Add a comment..."
                                            value={newComment[video.title] || ""}
                                            onChange={(e) => handleCommentChange(e, video.title)}
                                        />
                                        <button
                                            className="btn btn-primary "
                                            onClick={() => commentclicked(video.title)}
                                        >
                                            Send
                                        </button>
                                    </div>

                                    <div className="mt-2" style={{ overflow: "auto", height: "80px" }}>
                                        <h6>Comments:</h6>
                                        {video.comments && video.comments.length > 0 ? (
                                            <ul>
                                                {video.comments.map((comment, index) => (
                                                    <li key={index}>{comment}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No comments yet</p>
                                        )}
                                    </div>
                                </div>
                            </span>
                        ))}
                    </section>
                </div>
            </section>
        </div>
    );
}
