import React, { useState } from 'react';
import Navigation from '../components/Navigation'; // Import the Navigation 
import styles from '../departmentPage.css';

const DepartmentPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = {
    department1: {
      title: 'Department 1',
      content: (
        <>
          <h2>Department 1</h2>
          <p>Building Department </p>
        </>
      ),
    },
    department2: {
      title: 'Department 2',
      content: (
        <>
          <h2>Department 2</h2>
          <p>Engineering Department</p>
        </>
      ),
    },
    department3: {
      title: 'Department 3',
      content: (
        <>
          <h2>Department 3</h2>
          <p>City Department</p>
        </>
      ),
    },
    department4: {
      title: 'Department 4',
      content: (
        <>
          <h2>Department 4</h2>
          <p>Planning and Zone</p>
        </>
      ),
    },
  };

  const displayDepartmentContent = (departmentKey) => {
    setSelectedDepartment(departmentKey);
  };

  return (
    <div classname = "DepartmentPage">
      <Navigation/>
      <header>
        <h1>Department</h1>
        <nav>
          <ul>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department1')}>
                Department 1
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department2')}>
                Department 2
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department3')}>
                Department 3
              </a>
            </li>
            <li>
              <a href="#" onClick={() => displayDepartmentContent('department4')}>
                Department 4
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="content">
        {/* Content from the selected department will be displayed here */}
        {selectedDepartment && departments[selectedDepartment].content}
      </main>
    </div>
  )
}

export default DepartmentPage;
