import React from 'react'
import { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthContext';

const Permit = () => { //placeholder, replace with values from crm api and removes notes
  let[notes, setNotes] = useState([])
  let {authTokens} = useContext(AuthContext)

  useEffect(()=> { 
    getNotes()
  }, [])

  let getNotes = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
        method: 'GET', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()
    if (response.status === 200) { 
      setNotes(data)
    }
  }

  return (
    <>
      <div>Permit</div>
    
      <ul> {/*for some reason does not render properly*/}
        {notes.map(note=> {
          <li key = {note.id}>{note.body}</li>
        })}
      </ul>
    </>
  )
}

export default Permit