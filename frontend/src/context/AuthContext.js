import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [userID, setUserID] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens'))['user-id'] : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const [permitUpdated, setPermitUpdated] = useState([]);

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/') //redirect fixed
        }
        else {
            alert('Unable to login!')  //prob could find a way to make more specific (actual http msg but fine for now)
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let registerUser = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'first_name': e.target.firstName.value, 'last_name': e.target.lastName.value, 'email': e.target.email.value, 'username': e.target.username.value, 'password': e.target.password.value })
            })

            if (response.status === 201) {
                navigate('/login')
            } else if (response.status === 400) {
                const errorData = await response.json();
                let error = '';
                if (errorData.username) error = errorData.username[0];
                else if (errorData.email) error = errorData.email[0];
                else if (errorData.non_field_errors) error = errorData.non_field_errors[0];
                throw new Error(error);
            } else {
                throw new Error('Server error'); // Handle other server errors
            }
        } catch (error) {
            throw error
        }
    }


    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contact = async (e) => {
        console.log('clicked')
        let response = await fetch('http://127.0.0.1:8000/api/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'department': e.target.department.value, 'name': e.target.name.value, 'email': e.target.email.value, 'content': e.target.message.value })
        })
        let data = await response.json()

        if (response.status === 201) {
            alert('Contact us form sent!');
        } else {
            alert('Something went wrong!')
        }
    }

    let permitSubmit = async (formData) => {
        console.log('clicked')

        let response = await fetch('http://127.0.0.1:8000/api/permit_request/', {
            headers: {
                "Authorization": `JWT ${authTokens.access}`,
            },
            method: 'POST',
            body: formData,
        })
        console.log(response)
        let data = await response.json()

        if (response.status === 201) {
            alert('Permit submission sent!');
            setPermitUpdated(data);
            navigate('/permit')
        } else {
            alert('Something went wrong!')
        }
    }


    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        contact: contact,
        permitSubmit: permitSubmit
    }

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 240000) //4 minute refresh token
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}