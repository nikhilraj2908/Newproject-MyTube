import { useEffect, useState } from "react"
// import { Header } from "../header/header"
import { Link } from "react-router-dom";
import './signup.css'
import axios from "axios";
// import { Loginadmin } from "../login_admin/login_admin";
export function Signupuser() {
    const [user, setuser] = useState({ userID: "", userName: "", password: "", emailID: "" });
    function onsubmitvalue(e) {
        let name = e.target.name;
        let value = e.target.value;
        setuser({ ...user, [name]: value })
    }
    function signupclick(e) {
        e.preventDefault()
        axios.post("http://127.0.0.1:1947/register", user)
        alert("user sign up succefully")
    }
    return (
        <div>
            <div className="login-bg d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
                <button className="btn btn-success mx-3 " data-bs-toggle="modal" data-bs-target="#modal_signin">SignUP as user</button>
                <Link to='/loginadmin'><button className="btn btn-primary">Login Admin</button></Link>
                <form onSubmit={signupclick}>
                    <div className="modal fade" id="modal_signin">
                        <div className="modal-dialog ">
                            <div className="modal-content bg-dark text-light rounded ">
                                <div className="modal-header">
                                    <h3>login-to-MyTube</h3>
                                    <span className="btn btn-close" data-bs-dismiss="modal"></span>
                                </div>
                                <div className="modal-body">

                                    <div>
                                        <label htmlFor="userID">userID</label>
                                        <input onChange={onsubmitvalue} required className="form-control" name="userID"></input>
                                        <div>userID required</div>
                                    </div>

                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input onChange={onsubmitvalue} required className="form-control" name="userName"></input>
                                        <div>username required</div>
                                    </div>

                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input onChange={onsubmitvalue} required className="form-control" name="password" type="password"></input>
                                        <div>password is required</div>
                                    </div>

                                    <div>
                                        <label htmlFor="emailID">emailID</label>
                                        <input onChange={onsubmitvalue} required className="form-control" type="gmail" name="emailID"></input>
                                        <div>mail id is required</div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button data-bs-dismiss="modal" className="btn btn-warning w-100">sign-up</button>
                                    <div className="d-flex justify-content-center mt-2 w-100">
                                        <div>already have a account? <Link to='/'> log-in </Link> to your account</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}