import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let { loginUser } = useContext(AuthContext)

    return (
        <div className="login">
            <Link to='/'><header className="backHome">Back to Home</header></Link>
            <div className="container">
                <form onSubmit={loginUser}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        required
                        value={username}
                        placeholder="Username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        value={password}
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Login</button>
                    <p>Don't have an account? <Link to='/register'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;