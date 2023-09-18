import { Link } from "react-router-dom";

//this is the homepage
function Home () {  
    return (
        <div class= "home">
            <h1>City of Williamston</h1>
            <Link to = '/login'><button className = "login">Login/Sign Up</button></Link> 
        </div>
    )
}
export default Home; 