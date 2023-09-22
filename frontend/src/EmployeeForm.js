// EmployeeForm.js

import React, { useState } from 'react';
import axios from 'axios';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    id:'',
    name: '',
    email: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/addEmployee',employee);
      // Handle success and reset the form
    } catch (error) {
      console.log("error",error)
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
  <form onSubmit={handleSubmit} style={{ maxWidth: '400px', padding: '20px' }}action='' method='post'>
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="id" style={{ display: 'block' }}>ID:</label>
      <input type="text" name="id" id="id" value={employee.id} onChange={handleChange} />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="name" style={{ display: 'block' }}>Name:</label>
      <input type="text" name="name" id="name" value={employee.name} onChange={handleChange} />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="email" style={{ display: 'block' }}>Email:</label>
      <input type="text" name="email" id="email" value={employee.email} onChange={handleChange} />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="position" style={{ display: 'block' }}>Position:</label>
      <input type="text" name="position" id="position" value={employee.position} onChange={handleChange} />
    </div>
    <button type="submit" style={{ display: 'block', backgroundColor: '#007BFF', color: '#fff', border: 'none', padding: '10px 45px', borderRadius: '5px' }} >Add Employee</button>
  </form>
</div>

  
  
  );
}

export default EmployeeForm;
