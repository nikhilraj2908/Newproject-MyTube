import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./userpannel/components/header/header"
import { Dashboard } from "./userpannel/pages/dashboard/dashboard"
import { Signupuser } from "./userpannel/pages/signup/signup"
import { Cookies, useCookies } from "react-cookie"
import { Loginadmin } from "./adminpannel/pages/loginadmin/loginadmin"
import { Admindashboard } from "./adminpannel/pages/admindashboard/admindashboard"
import { Myprofile } from "./adminpannel/pages/myprofile/myprofile"
import { Addvideoadmin } from "./adminpannel/pages/addvideoadmin/addvideoadmin"
export function Routing() {
  const [cookies, setcookie, removecookie] = useCookies(["userID"]);
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={cookies.userID ? <Dashboard /> : <Signupuser />} />
                    <Route path="/loginadmin" element={cookies.mailID ? <Admindashboard /> : <Loginadmin />}>
                        <Route path='myprofile' element={<Myprofile/>} /> 
                        <Route path="addvideoadmin" element={<Addvideoadmin/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}