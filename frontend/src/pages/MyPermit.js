import React from 'react'
import { useState, useContext, useEffect } from "react";
import AuthContext from '../context/AuthContext';
import Navigation from '../components/Navigation';
import './permit.css';
import jwt_decode from "jwt-decode";  //run npm install --save jwt-decode
const MyPermit = () => {

    let { user, authTokens, permitUpdated } = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [permitData, setPermitData] = useState([]);

    useEffect(() => {
        // Check if the username has changed or added permit, avoids unnecessary API calls
        if (user && user.username !== username || permitUpdated) {
            setUsername(user.username);
            fetchPermitData();
        }
    }, [user, username, permitUpdated]);

    const fetchPermitData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/permit_requests/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `JWT ${authTokens.access}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPermitData(data);
            } else {
                console.error('Error fetching permit data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Navigation />
            <h1>Permit</h1>
            <h2>My Permits </h2>
            {user ? (
                <div className="permit-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Permit Type</th>
                                <th>Date Submitted</th>
                                <th>Permit Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permitData.map((permit, index) => (
                                <tr key={index}>
                                    <td>{permit.department}</td>
                                    <td>{permit.date_submitted}</td>
                                    <td>{permit.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Please login to view your permits and send a new request!</p>
            )}

        </>
    )
}

export default MyPermit
