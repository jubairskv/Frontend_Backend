// EmployeeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get('/api/addEmployee');
        setEmployees(response.data);
      } catch (error) {
        // Handle errors
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
  <h2>Employee List</h2>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {employees.map((employee) => (
      <li key={employee.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '5px 0' }}>
        <strong>{employee.name}</strong><br />
        Email: {employee.email}<br />
        Position: {employee.position}
      </li>
    ))}
  </ul>
</div>

  );
}

export default EmployeeList;
