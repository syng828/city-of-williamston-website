import React, {useState} from "react";

function Login () { 
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const handleSubmit = (e) => { 
        e.preventDefault(); 
    }

    return (
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
            <p>Don't have an account? <a href = '/'>Sign Up</a></p>
        </form>
    )
}

export default Login;