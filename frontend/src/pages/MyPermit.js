import React from 'react'
import { useState, useContext } from "react";
import AuthContext from '../context/AuthContext';
import Navigation from '../components/Navigation';
import './permit.css';
const MyPermit = () => { 

  let {user} = useContext(AuthContext);

  return (
    <>
    <Navigation/>
      <h1>Permit</h1>
      <h2>My Permits </h2>

     {/* {user ? (  temporarily removed condition to make it easy to develop*/}
          <div className = "permit-info">  {/*fetch data from api and possibly use a map function to get the status of all of them once returned*/}
              <table> 
              <thead>
                <th>Permit Type</th>
                <th>Date Submitted</th>
                <th>Permit Status</th>
              </thead>
              <tr>
                <td>Property Use </td>
                <td>12/31</td>
                <td>In Progress</td>
              </tr>
              </table>
          </div>
          {/*  ) : ( 
                <Link to = '/login'><p>Please login to view your permits and send a new request!</p></Link>
          )}   */}
    </>
  )
}

export default MyPermit
