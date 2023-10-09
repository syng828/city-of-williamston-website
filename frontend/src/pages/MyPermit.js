import React from 'react'
import { useState, useContext, useEffect } from "react";
import AuthContext from '../context/AuthContext';
import Navigation from '../components/Navigation';
import './permit.css';
const MyPermit = () => { 

  let {user, authTokens} = useContext(AuthContext);
  const [permitData, setPermitData] = useState([]);

  useEffect(() => {
    const fetchPermitData = async () => {
        try {
            const response = await fetch('/api/permit_requests/', {
                headers: {
                    'Authorization': `Bearer ${authTokens}`, // Add your authentication token here
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

    if (user) {
        fetchPermitData();
    }
}, [user]);

  return (
    <>
    <Navigation/>
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
                                    <td>{permit.form}</td>
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
