import React, {useState} from "react";

//only created basics, will edit the confirm password later, the ability to switch to different page with the link, and the design 
function Register () { 
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const[confirmPassword, setConfirmPassword] = useState(''); 

    const handleSubmit = (e) => { 
        e.preventDefault(); 
    }

    return (
        <form onSubmit = {handleSubmit}>
            <h2>Register</h2>
            <label>Name</label>
            <input 
                type = "text"
                required
                value = {name}
                onChange = {(e)=> setName(e.target.value)} 
            />
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
             <label>Confirm Password</label>
            <input 
                type = "password" 
                required
                value = {confirmPassword}
                onChange = {(e)=> setConfirmPassword(e.target.value)}
            />
            <button>Login</button>
            <p>Already have an account? <a href = '/'>Log In</a></p>
        </form>
    )
}

export default Register; 