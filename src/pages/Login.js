import React, {useState} from "react";
import { Link } from "react-router-dom";

function Login () { 
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const handleSubmit = (e) => { 
        e.preventDefault(); 
    }

    return (
        <div>
            <Link to = '/'><header className = "backHome">Back to Home</header></Link>
            <form onSubmit = {handleSubmit}>
                <h2>Login</h2>
                <label>Email</label>
                <input 
                    type = "email"
                    required
                    value = {email}
                    onChange = {(e)=> setEmail(e.target.value)} 
                />
                <label>Password</label>
                <input 
                    type = "password" 
                    required
                    value = {password}
                    onChange = {(e)=> setPassword(e.target.value)}
                />
                <button>Login</button>
                <p>Don't have an account? <Link to = '/register'>Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login;