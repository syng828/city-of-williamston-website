import React from 'react'
import { useState, useContext } from 'react'
import styles from '../contact.module.css' //will make a single css later
import Navigation from '../components/Navigation'
import AuthContext from '../context/AuthContext'
import '../contact.module.css'

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    contact(e);
  }

  let contact = async (e) => {
    console.log('clicked')
    let response = await fetch('http://127.0.0.1:8000/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'department': department, 'name': name, 'email': email, 'content': message })
    })
    let data = await response.json()

    if (response.status === 201) {
      alert('Contact us form sent!');
    } else {
      alert('Something went wrong!')
    }
  }

  return (
    <div className="contact-us">
      <Navigation />
      <div className="contactContainer">
        <center>
          <h1>Contact Us Form</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => (setName(e.target.value))}
            />
            <label htmlFor="email" >Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => (setEmail(e.target.value))}
            />
            <label htmlFor="department">Department:</label>
            <select id="department" name="department" value={department} required
              onChange={(e) => setDepartment(e.target.value)}>
              <option disabled selected>Select a Department</option>
              <option>City Hall</option>
              <option>Police Department</option>
              <option>Department of Public Works</option>
              <option>Assessing Department</option>
              <option>Building Department</option>
            </select>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={message}
              required
              onChange={(e) => (setMessage(e.target.value))}
            ></textarea>
            <button type="submit" className="centered">Submit</button>
          </form>
        </center>
      </div>
    </div>
  )
}

export default ContactUs
