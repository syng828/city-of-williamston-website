//navbar go to different pages
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import WilliamstonLogo from "../WilliamstonLogo.jpg"

//this is the homepage
const Navigation = () => {  
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div className= "navbar">
            <img src = {WilliamstonLogo} alt = "williamston logo"></img>
            <br></br>
            <div className = "dropdown">
                <button className = "dropbtn">Departments</button>
                    <div className="dropdown-content">
                        <Link to = ''>Assessing</Link>
                        <Link to = ''>City Manager</Link>
                        <Link to = ''>City Staff</Link>
                        <Link to = ''>Clerk</Link>
                        <Link to = ''>Department of Public Works (DPW)</Link>
                        <Link to = ''>Finance/Treasurer</Link>
                        <Link to = ''>Planning & Zoning</Link>
                        <Link to = ''>Police Department</Link>
                        <Link to = ''>Water & Sewer</Link>
                    </div>
            </div>
            <div className = "dropdown">
                <button className = "dropbtn">Permits</button>
                    <div className="dropdown-content">
                        <Link to = '/permit'>View My Permits</Link>
                        <Link to = '/permitSend'>Send a New Permit Request</Link>
                    </div>
            </div>
            <Link to = '/contact'><button>Contact Us</button></Link>

              {user ? (     //move these buttons to the top right corner later, the rest just in a nav bar
                <button onClick = {logoutUser}>Logout</button>
            ) : ( 
                <Link to = '/login'><button>Login/Sign Up</button></Link>
            )} 
            
        </div>
    )
}
export default Navigation;