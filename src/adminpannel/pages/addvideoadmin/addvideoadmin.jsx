import { useRef, useState } from "react"

export function Addvideoadmin() {
    const[formdata,setformdata]=useState({link:"",title:"",discription:"",thumbnil:""});
    const imgref=useRef(null);
    const  [files, setFiles] = useState(null);

    function handlechange(e){
       const name=e.target.name
       const value=e.target.value;
        setformdata({...formdata,[name]:value})
    }
    function formsubmit(e){
        e.preventDefault();
        console.log(formdata);
    }
 function imgblockclcicked(){
    imgref.current.click()
 }
    return (
        <div className="w-50 mt-3">
            <h3>Add new video</h3>
            <form onSubmit={formsubmit}>
                <dl>
                    <dt>Video link</dt>
                    <dd>
                        <input className="form-control" onChange={handlechange} name="link" placeholder="enter the link for ifream"></input>
                    </dd>
                    <dt>Title</dt>
                    <dd>
                        <input className="form-control" onChange={handlechange} name="title" placeholder="enter title of video"></input>
                    </dd>
                    <dt>discription</dt>
                    <dd>
                        <input placeholder="add discription here" onChange={handlechange} className="form-control discription" name="discription"></input>
                    </dd>
                    <dt>thumbnil</dt>
                    <dd 
                    className="bg-secondary border rounded d-flex justify-content-center align-items-center fs-6 text-light"
                    style={{width:"200px",height:"110px"}}
                    onClick={imgblockclcicked}
                    >
                         {files ? (
                        <img
                            src={files && URL.createObjectURL(files)}
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
                        name="thumbnil"
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