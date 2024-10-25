import axios from "axios";
import { useRef, useState } from "react"

export function Addvideoadmin() {
    const [formdata, setformdata] = useState({ videoSrc: "", title: "", description: "", thumbnail: "" });
    const imgref = useRef(null);
    const [files, setFiles] = useState(null);

    function handlechange(e) {
        const { name, value, files } = e.target;

        if (name === "thumbnail" && files.length > 0) {
            setFiles(files[0]);
        } else {
            setformdata({ ...formdata, [name]: value });
        }
    }
    async function formsubmit(e) {
        e.preventDefault();

        // Creating a FormData object to handle file upload
        const data = new FormData();
        data.append("videoSrc", formdata.videoSrc);
        data.append("title", formdata.title);
        data.append("description", formdata.description);
        data.append("thumbnail", files); // append the file directly
        try {
            const response = await axios.post("http://127.0.0.1:1947/add-video", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Video added successfully:", response.data);
            setformdata({ videoSrc: "", title: "", description: "", thumbnail: "" })
            setFiles(null)
        } catch (error) {
            console.error("Error adding video:", error);
        }
    }



    function imgblockclcicked() {
        imgref.current.click()
    }
    return (
        <div className="w-50 mt-3">
            <h3>Add new video</h3>
            <form onSubmit={formsubmit}>
                <dl>
                    <dt>Video videoSrc</dt>
                    <dd>
                        <input className="form-control" value={formdata.videoSrc} onChange={handlechange} name="videoSrc" placeholder="enter the videoSrc for ifream"></input>
                    </dd>
                    <dt>Title</dt>
                    <dd>
                        <input className="form-control" value={formdata.title} onChange={handlechange} name="title" placeholder="enter title of video"></input>
                    </dd>
                    <dt>description</dt>
                    <dd>
                        <input placeholder="add description here" value={formdata.description} onChange={handlechange} className="form-control description" name="description"></input>
                    </dd>
                    <dt>thumbnail</dt>
                    <dd
                        className="bg-secondary border rounded d-flex justify-content-center align-items-center fs-6 text-light"
                        style={{ width: "200px", height: "110px" }}
                        onClick={imgblockclcicked}
                    >
                        {files ? (
                            <img
                                src={URL.createObjectURL(files)}
                                alt={files.name}
                                style={{ width: "100%", height: "100%", borderRadius: " 10px " }}
                            />
                        ) : (
                            "upload photo"
                        )}
                    </dd>
                    <dd>
                        <input
                            onChange={handlechange}
                            type="file"
                            className="d-none "
                            name="thumbnail"
                            ref={imgref}
                            accept=".jpg, .jpeg, .png"
                            required
                        ></input>
                    </dd>

                </dl>
                <button className=" btn btn-success w-100 text-center">add video</button>
            </form>
        </div>
    )
}