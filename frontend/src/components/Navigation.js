//navbar go to different pages
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import newLogo from "../newLogo.png" 


import './Navigation.css';
//this is the homepage
const Navigation = () => { 
  
   let {user, logoutUser} = useContext(AuthContext)
   return (


       <div className= "navbar">
          
           <Link to = '/'><img src = {newLogo} alt = "williamston logo" class = "sized"></img></Link>
         <div class = "links"> 
           <Link to ='/department' class = "underline first"><button>Departments</button></Link>
   
        
           <div className = "dropdown">
             <button className = "dropbtn">Permits


                   <div className="dropdown-content">
                       <Link to = '/permit'>View My Permits</Link>
                       <Link to = '/permitSend'>Send a New Permit Request</Link>
                   </div>
            
              </button> 
          
           </div>
        
        
         <Link to = '/contact' class = "underline sec"><button>Contact Us</button></Link>


             {user ? (     //move these buttons to the top right corner later, the rest just in a nav bar
               <button onClick = {logoutUser}>Logout</button>
           ) : (
          
               <Link to = '/login' class = "underline third "><button>Login/Sign Up</button></Link>
           )}
           
       </div>
       <hr></hr>
    </div>
   )
}
export default Navigation;
