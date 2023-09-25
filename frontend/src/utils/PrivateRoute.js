{ /* import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

//removed private route currently to allow people to edit the permit page easily. will put in back when finished.
const PrivateRoute = ({children}) => { 
   let {user} = useContext(AuthContext) 

    return (
        !user ? <Navigate to = "/login"/> : children
    )
}

export default PrivateRoute;
testing 
*/ }