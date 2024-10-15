import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./loginadmin.css"
export function Loginadmin() {
    const [cookies, setcookie, removecookie] = useCookies(["mailID"]);
    const [error, setError] = useState(""); // To handle error messages
    const [loading, setLoading] = useState(false); // To handle loading state
    const [admindetail, setadmindetail] = useState({ mailID: "", password: "" })
    const navigate = useNavigate()
    async function loginadminsubmit(e) {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`http://127.0.0.1:1947/admin/${admindetail.mailID}`);
            const admindataArray = response.data;
            console.log('API Response:', admindataArray);

            // Check if the array has elements
            if (admindataArray.length > 0) {
                const admindata = admindataArray[0]; // Access the first element
                console.log('Entered mailID:', admindetail.mailID);
                console.log('Entered Password:', admindetail.password);
                console.log('Fetched mailID:', admindata.mailId);
                console.log('Fetched Password:', admindata.adminPass);
                if (admindata.mailId === admindetail.mailID.trim()) {
                    if (admindata.adminPass === admindetail.password.trim()) {
                        setcookie("mailID", admindetail.mailID);
                        setError("");
                        window.location.reload();
                        
                    } else {
                        setError("Incorrect password. Please try again.");
                    }
                } else {
                    setError("mail not found. Please check your mailID.");
                }
            } else {
                setError("mail not found. Please check your mailID.");
            }
        } catch (error) {
            console.error("Error fetching mail data:", error);
            setError("An error occurred while logging in. Please try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    }
    function handlechange(e) {
        var name = e.target.name;
        var value = e.target.value;
        setadmindetail({ ...admindetail, [name]: value })
    }
    return (
        <div >
            <div className="adminbg d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
                <form onSubmit={loginadminsubmit} className="bg-dark text-light  p-3 rounded">
                    <div>
                        <h2>login as Admin</h2>
                        <div>
                            <label htmlFor="mailID">Admin mailID</label>
                            <input
                                onChange={handlechange}
                                required
                                className="form-control"
                                name="mailID"
                                value={admindetail.mailID}
                            />
                            <div>mailID is required</div>
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={handlechange}
                                required
                                className="form-control"
                                name="password"
                                type="password"
                                value={admindetail.password}
                            />
                            <div>Password is required</div>
                        </div>

                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                    <hr></hr>
                    <div >
                        <button type="submit" className='btn btn-success  mx-2 px-4' disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <button type="button" className="btn btn-danger px-4" >Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}