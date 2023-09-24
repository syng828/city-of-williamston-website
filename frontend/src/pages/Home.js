import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

//this is the homepage
function Home () {  
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div className= "home">
            <h1>City of Williamston</h1>
            <Link to = '/login'><button className = "login">Login/Sign Up</button></Link>
            {user ? ( 
                <p onClick = {logoutUser}>Logout</p>
            ) : ( 
                <Link to = "/login">Login</Link>
            )}

            {user && <p>Hello {user.username}</p>  }
        </div>
    )
}
export default Home; 