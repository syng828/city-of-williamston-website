import React, {useState} from "react";
import { Link } from "react-router-dom";

//only created basics, will edit the confirm password later, the ability to switch to different page with the link, and the design 
function Register () { 
    const[name, setName] = useState('');
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const[confirmPassword, setConfirmPassword] = useState(''); 
    const[isError, setisError] = useState('');

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (password !== confirmPassword) { 
            setisError("Passwords do not match");
        }
        else { 
            setisError(""); 
        }
    }

    return (
        <div>
            <Link to = '/'><header className = "backHome">Back to Home</header></Link>
            <div className = "container">
                <form onSubmit = {handleSubmit}>
                    <h2>Register</h2> 
                        <input 
                            type = "text"
                            required
                            value = {name}
                            placeholder = "Name"
                            onChange = {(e)=> setName(e.target.value)} 
                        />
                        <input
                            type = "text"
                            required
                            value = {username}
                            placeholder = "Username"
                            onChange = {(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type = "email"
                            required
                            value = {email}
                            placeholder = "Email"
                            onChange = {(e)=> setEmail(e.target.value)} 
                        />
                        <input 
                            type = "password" 
                            required
                            value = {password}
                            placeholder = "Password"
                            onChange = {(e)=> setPassword(e.target.value)}
                        />
                        <input 
                            type = "password" 
                            required
                            value = {confirmPassword}
                            placeholder = "Confirm Password"
                            onChange = {(e)=> setConfirmPassword(e.target.value)}
                        />
                    <div className = "error">{isError}</div>
                    <button>Register</button>
                    <p>Already have an account? <Link to = '/login'>Log In</Link></p>
                </form>
            </div>
        </div>

    )
}

export default Register; 