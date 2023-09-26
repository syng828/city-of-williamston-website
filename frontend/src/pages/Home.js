import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

//this is the homepage
const Home = () => {  
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div className= "home">
            <h1>City of Williamston</h1>
              {user ? ( 
                <button onClick = {logoutUser}>Logout</button>
            ) : ( 
                <Link to = '/login'><button className = "login">Login/Sign Up</button></Link>
            )} 

            {user && <p>Hello {user.username}</p>  }
        </div>
    )
}
export default Home; 