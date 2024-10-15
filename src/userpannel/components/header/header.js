import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import './header.css'
import { Offcanvas } from 'react-bootstrap'
import logoimg from '../../../assets/images/image.png'
export function Header() {
    const [cookies, setcookie, removecookie] = useCookies(["userID"]);
    const [logo, setlogo] = useState(logoimg);
    const [userdetail, setuserdetail] = useState({ userID: "", password: "" }); // Default to empty string
    const [loading, setLoading] = useState(false); // To handle loading state
    const [error, setError] = useState(""); // To handle error messages
    const [modalstatus, setmodalstatus] = useState("")
    const [show, setShow] = useState(false);
    function handleshow() {
        setShow(false);
    }
    function showoffcanvas() {
        setShow(true)
    }

    async function loginusersubmit(e) {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await axios.get(`http://127.0.0.1:1947/users/${userdetail.userID}`);
            const userdataArray = response.data;
            // console.log('API Response:', userdataArray);


            // Check if the array has elements
            if (userdataArray.length > 0) {
                const userdata = userdataArray[0]; // Access the first element
                // console.log('Entered UserID:', userdetail.userID);
                // console.log('Entered Password:', userdetail.password);
                // console.log('Fetched UserID:', userdata.userID);
                // console.log('Fetched Password:', userd.ata.password);

                if (userdata.userID === userdetail.userID.trim()) {
                    if (userdata.password === userdetail.password.trim()) {

                        setcookie("userID", userdetail.userID);
                        setError(""); // Clear any previous errors
                        // Optionally close modal on successful login
                        //////navigate karaenge yha se waha login page pr
                        window.location.reload();

                    } else {
                        setError("Incorrect password. Please try again.");
                    }
                } else {
                    setError("User not found. Please check your userID.");
                }
            } else {
                setError("User not found. Please check your userID.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("An error occurred while logging in. Please try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    }
    function handlechange(e) {
        const { name, value } = e.target;
        setuserdetail(prevDetail => ({ ...prevDetail, [name]: value }));
    }

    return (
        <header className='top-0 bg-light'>
            <div className='row d-flex justify-content-between align-items-center'>
                <div className='col-3 d-flex'>
                    <button onClick={showoffcanvas} className="btn btn-light fw-bold fs-4 text-center px-4 py-2 bi bi-list"></button>
                    <img width={150} height={70} src={logo} alt="Logo" />
                </div>
                <div className="col-6 d-none d-md-block mt-3 mt-md-0">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" />
                        <button className="btn btn-primary bi bi-search"></button>
                    </div>
                </div>
                <div className='navicons col-3 fs-5 d-flex'>
                    <span className='bi bi-camera-reels mx-3'></span>
                    <span className='bi bi-bell mx-3'></span>
                    <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#modal-login">
                        {cookies.userID ? cookies.userID : "sign-IN"}
                    </button>
                </div>
                {
                    cookies.userID ?
                        <Offcanvas show={show} onHide={handleshow}>
                            <Offcanvas.Header closeButton>
                                <img height={80} src={logo} alt="Logo" style={{ marginLeft: "-30px" }} />
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className=" d-none d-md-block mt-3 mt-md-0">
                                    <div className="input-group offinput">
                                        <input type="text" className="form-control " placeholder="Search" />
                                        <button className="btn btn-primary bi bi-search"></button>
                                    </div>
                                </div>

                            </Offcanvas.Body>
                        </Offcanvas>
                        : <Offcanvas show={show} onHide={handleshow}>
                            <Offcanvas.Header closeButton>
                                <img height={80} src={logo} alt="Logo" style={{ marginLeft: "-30px" }} />
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <p className='text-center'>please sign in first to access the videos uploaded by admin.</p>
                                <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#modal-login">
                                    {cookies.userID ? cookies.userID : "sign-IN"}
                                </button>
                            </Offcanvas.Body>
                        </Offcanvas>
                }
                <form onSubmit={loginusersubmit}>
                    <div className='modal fade' id="modal-login">
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h1>Login User</h1>
                                    <button className='btn-close' data-bs-dismiss="modal"></button>
                                </div>
                                <div className='modal-body'>
                                    <div>
                                        <label htmlFor="userID">User ID</label>
                                        <input
                                            onChange={handlechange}
                                            required
                                            className="form-control"
                                            name="userID"
                                            value={userdetail.userID}
                                        />
                                        <div>Username is required</div>
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            onChange={handlechange}
                                            required
                                            className="form-control"
                                            name="password"
                                            type="password"
                                            value={userdetail.password}
                                        />
                                        <div>Password is required</div>
                                    </div>

                                    {error && <div className="alert alert-danger mt-2">{error}</div>}
                                </div>
                                <div className='modal-footer'>
                                    <button type="submit" className='btn btn-success w-100' disabled={loading}>
                                        {loading ? "Logging in..." : "Login"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </header>

    );
}
