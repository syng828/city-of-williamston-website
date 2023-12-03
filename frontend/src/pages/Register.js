import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

//only created basics, will edit the confirm password later, and requiring a strong password (without it, google will send an error msg)
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setisError] = useState('');

    let { registerUser } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setisError("Passwords do not match");
        }
        else {
            setisError("");
            try {
                await registerUser(e);
            } catch (error) {
                const errorData = error.message; //tried finding a way to inspect the type of errors here but it doesn't work.. so that could specify which field highlight red
                setisError(errorData);
            }
        }

    }

    return (
        <div>
            <Link to='/'><header className="backHome">Back to Home</header></Link>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="error">{isError}</div>
                    <h2>Register</h2>
                    <input
                        type="text"
                        name="firstName"
                        required
                        value={firstName}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="lastName"
                        required
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="username"
                        required
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        required
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to='/login' className='special'>Log In</Link></p>
                </form>
            </div>
        </div>

    )
}

export default Register; 