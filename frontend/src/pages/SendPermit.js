import React, { useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';

const SendPermit = () => {
  const [department, setDepartment] = useState('');
  const [deptFormOption, setDeptFormOption] = useState([]);
  const [deptForm, setDeptForm] = useState('');
  const [file, setFile] = useState(null);

  let {user, authTokens} = useContext(AuthContext);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const fd = new FormData();
    fd.append('department', department);
    fd.append('form', deptForm);
    fd.append('file', file);

    try {
        const response = await fetch('/api/permit_request/', {
            method: 'POST',
            body: fd,
            headers: {
                'Authorization': `Bearer ${authTokens}`, // Add your authentication token here
            },
        });

        if (response.ok) {
            console.log('Permit request submitted successfully');
        } else {
            console.error('Error submitting permit request');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const departmentOptions = ['Building Department & Trade Permit', 'City', 'DDA', 
    'DPW/Engineering', 'License Applications', 'Planning & Zoning', 'Zoning Board of Appeals'];

  const handleFirstChange = (e) => {
    const selectedValue = e.target.value;
    
    setDepartment(selectedValue);

    if (selectedValue === 'Building Department & Trade Permit') {
      setDeptFormOption(['Building Moving Application','MI Compliance Form']);
    } else if (selectedValue === 'City') {
        setDeptFormOption(['Automatic Utility Bill Paying Form', 'Email Authorization Form', 
        'ACH, Automatic Tax Bill Paying Form', 'Fee Schedule',
        'Alcoholic Beverages in City Parks Application','Freedom of Information Act Form',
        'Bandshell/Concession Stand Application', 'Solicitor’s Permit Application',
        'Board/Commissions Application', 'Water/Sewer Connection Application',
        'Change of Address Form', 'Water/Sewer Deposit Waiver Form', 'Landlord',
        'City Property Use Application', 'Water/Sewer Deposit', 
        'Digital Message Board Application']);
    } else if (selectedValue === 'DDA') {
        setDeptFormOption(['DDA Facade Improvement Procedures & Fillable Application']);
    } else if (selectedValue === 'DPW/Engineering') {
        setDeptFormOption(['Curb Cut Permit/Driveway/Sidewalk Permit', 'Right of Way Permit', 'Water/Sewer Connection Application']);
    } else if (selectedValue === 'License Applications') {
        setDeptFormOption(['Pawnbroker License Application']);
    } else if (selectedValue === 'Planning & Zoning') {
        setDeptFormOption(['Fence Permit Application','Lot Combination Application', 'Lot Split/Land Development Application','Rezoning Application', 'Sign Permit Application','Sketch Plan Site Plan Checklist', 'Special Land Use Application', 'Submittal Deadlines for Planning Commission Public Hearings', 'Zoning Permit Application']);
    } else if (selectedValue === 'Zoning Board of Appeals') {
        setDeptFormOption(['Zoning Board of Appeals Application', 'Submittal Deadlines for Applications to Zoning Board of Appeals']);
    } else {
        setDeptFormOption([]); 
    }
  };

  return (
    <div>
      <Navigation/>
      <h1>Send a New Permit Request</h1>

      <form onSubmit = {handleSubmit}>
      <label>Department:</label>
      <select id="departmentSelect" value={department} onChange={handleFirstChange} required>
        <option disabled selected>Select an option</option>
        {departmentOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label>Form:</label>
      <select id="formSelect" onChange = {(e)=> setDeptForm(e.target.value)} required>
      <option disabled selected>Select an option</option>
        {deptFormOption.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>


      <label>Upload Form:</label>
      <input type = "file" onChange = {(e) => setFile(e.target.files[0])} required/>
      <br></br>
      <br></br>
      <button>Send Request</button>
      </form>
    </div>
  );
}

export default SendPermit;
