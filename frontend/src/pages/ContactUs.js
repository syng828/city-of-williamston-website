import React from 'react'
import { useState } from 'react'
import styles from '../contact.module.css' //will make a single css later

const ContactUs = () => {
    const[name, setName] = useState(''); 
    const[email, setEmail] = useState(''); 
    const[department, setDepartment] = useState(''); 
    const[message, setMessage] = useState(''); 

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(e.target.department.value);
  }

  return (
    <div className = "contact-us">
        <h1>Contact Us Form</h1>
        <form onSubmit = {handleSubmit}>
            <label>Name:</label>  
            <input 
                type="text" 
                id="name" 
                name = "name"
                value = {name}
                required
                onChange = {(e) => (setName(e.target.value))}
            /> 
            <label>Email:</label>
            <input 
                type="email" 
                id= "email" 
                name = "email"
                value = {email}
                required
                onChange = {(e) => (setEmail(e.target.value))}
            />
            <label>Department:</label>
            <select id="department" name="department" value = {department} required 
            onChange = {(e)=> setDepartment(e.target.value)}>  
                    <option disabled selected>Select a Department</option>
                    <option>City Hall</option>
                    <option>Police Department</option>
                    <option>Department of Public Works</option>
                    <option>Assessing Department</option>
                    <option>Building Department</option>
            </select>
            <label>Message:</label>
            <textarea 
                id="message" 
                name="message" 
                value = {message}
                required
                onChange = {(e) => (setMessage(e.target.value))}
            ></textarea>
            <button type = "submit">Submit</button>
        </form>
    </div>
  )
}

export default ContactUs
